<?php


namespace App\Http\Helpers;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use Exception;


final class S3Helper
{
    private $bucket;
    private $region;
    private $key;
    private $secret;
    private $version;
    private $url;
    private $aws_dir;
    private $path;

    const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    /**
     * Remove the specified resource from storage.
     *
     * @param string $aws_dir
     * @param string $path
     */
    public function __construct($aws_dir = '/', $path = '/')
    {
        $this->aws_dir = $aws_dir;
        $this->path = $path;

        $this->bucket = env('AWS_BUCKET');
        $this->region = env('AWS_DEFAULT_REGION');
        $this->key = env('AWS_ACCESS_KEY_ID');
        $this->secret = env('AWS_SECRET_ACCESS_KEY');
        $this->version = env('AWS_VERSION');
        $this->url = env('AWS_URL');
    }

    public function delete($path): bool
    {
        try {
            $path = str_replace($this->url, '', urldecode($path));

            $s3 = new S3Client([
                'version' => $this->version,
                'region'  => $this->region,
                'credentials' => [
                    'key'    => $this->key,
                    'secret' => $this->secret,
                ],
            ]);

            $result = $s3->deleteObject(['Bucket' => $this->bucket, 'Key' => $path]);

            if ($result['@metadata']['statusCode'] == 204) {
                return true;
            }

            return false;
        } catch (S3Exception $e) {
            Log::error('Error deleting file from S3: ' . $path, [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    public function store($file): string
    {
        try{
            $entry_path = $this->saveOnLocal($file, $this->path);
            $webp_path = $this->convertToWebp($entry_path);
            $s3_path = $this->saveOnS3($this->aws_dir . $this->path . '/' . $this->getFileNameWithExt($webp_path), $webp_path);

            $this->deleteLocals($entry_path, $webp_path);

            return $s3_path;
        }catch(Exception $e){
            Log::error('Error storing file on S3: ' . $this->path, [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function saveOnLocal($file, $path): string
    {
        try{
            $ext = $file->getClientOriginalExtension();

            if (!in_array($ext, self::VALID_EXTENSIONS)) {
                return false;
            }

            $name = uniqid() . time();

            $file_name = $name . '.' . $ext;

            $file->storeAs($path, $file_name, 'local');

            return $path . '/' . $file_name;
        }catch(\Exception $e){
            Log::error('Error saving file on local storage: ', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function convertToWebp($entry_path): string
    {
        try{
            if ($this->exists('local', $entry_path)) {
                $old_file = Storage::get($entry_path);
                $path = str_replace('public', 'storage', $this->getDirectory($entry_path)) .'/' . $this->getFileName($entry_path) . '.webp';

                $public_path = $this->getDirectory($entry_path) .'/' . $this->getFileName($entry_path) . '.webp';

                if (Image::make($old_file)->encode('webp', 90)->save($path)) {
                    return $public_path;
                }
            }
            throw new Exception('Error converting to webp file on local storage path: ' . $entry_path);
        }catch(\Exception $e){
            Log::error('Error converting image to webp: ', [
                'error' => $e->getMessage(),
            ]);
            return '';
        }
    }

    public function saveOnS3($aws_path, $webp_path): string
    {
        try {
            if (!$this->exists('s3', $aws_path)) {
                $webp_file = Storage::get($webp_path);
                Storage::disk('s3')->put($aws_path, $webp_file, 'public');
                return Storage::disk('s3')->url($aws_path);
            }
            throw new Exception('Error saving on S3, the file already exists on S3 storage: ' . $aws_path);
        } catch (S3Exception $e) {
            Log::error('Error store file from S3: ' . $aws_path, [
                'error' => $e->getMessage(),
            ]);

            return $e->getMessage();
        }
    }

    public function deleteLocals($entry_path = null, $webp_path = null): bool
    {
        try{
            if ($entry_path) {
                Storage::delete($entry_path);
            }

            if ($webp_path) {
                Storage::delete($webp_path);
            }
            return true;
        }catch(\Exception $e){
            Log::error('Error deleting file from local storage: ', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    public function migrate($model, $column)
    {
        // $files = $this->getValidFilesForMigrate();

        // foreach ($files as $key => $file) {
        //     $webp_path = $this->convertToWebp($file);
        //     $name = $this->getFileNameWithExt($webp_path);
        //     $this->saveOnS3('laravel/anticonceptivo/' . pathinfo($file, PATHINFO_DIRNAME) . '/' . $name, $webp_path);
        // }

        return response()->json([
            'status' => 200
        ]);
    }

    public function getValidFilesForMigrate(){
        $directories = Storage::directories('public');

        function getFiles($directories, $files = [])
        {
            foreach ($directories as $directory) {
                $filesInDirectory = Storage::files($directory);
                foreach ($filesInDirectory as $file) {
                    $files[] = $file;
                }
                $directoriesInDirectory = Storage::directories($directory);
                if (count($directoriesInDirectory) > 0) {
                    $files = getFiles($directoriesInDirectory, $files);
                }
            }
            return $files;
        }

        $images = array_filter(getFiles($directories), function ($file) {
            return preg_match('/\.(jpg|jpeg|png|gif|webp)$/', $file);
        });

        return $images;
    }

    public function exists($where, $path): bool
    {
        // exist on storage or s3
        if (Storage::disk($where)->exists($path)) {
            return true;
        }

        return false;
    }

    public function getURL($where, $path): string
    {
        // get url from storage or s3
        if ($where == 's3') {
            return $this->url . $path;
        }

        return Storage::disk($where)->url($path);
    }

    public function getExtension($path): string
    {
        return pathinfo($path, PATHINFO_EXTENSION);
    }

    public function getMimeType($where, $path): string
    {
        // get mime type from storage or s3
        if ($where == 's3') {
            return Storage::disk($where)->mimeType($path);
        }

        return Storage::disk($where)->mimeType($path);
    }

    public function getFileName($path): string
    {
        return pathinfo($path, PATHINFO_FILENAME);
    }

    public function getFileNameWithExt($path): string
    {
        return pathinfo($path, PATHINFO_BASENAME);
    }

    public function getDirectory($path): string
    {
        return pathinfo($path, PATHINFO_DIRNAME);
    }

    public function getFilePath($where, $path): string
    {
        // get file path from storage or s3
        if ($where == 's3') {
            return $path;
        }

        return Storage::disk($where)->path($path);
    }

}
