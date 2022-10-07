<?php


namespace App\Http\Helpers;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


final class AWSS3Helper
{
    private $bucket;
    private $region;
    private $key;
    private $secret;
    private $version;
    private $url;

    public function __construct(){
        $this->bucket = env('AWS_BUCKET');
        $this->region = env('AWS_DEFAULT_REGION');
        $this->key = env('AWS_ACCESS_KEY_ID');
        $this->secret = env('AWS_SECRET_ACCESS_KEY');
        $this->version = env('AWS_VERSION');
        $this->url = env('AWS_URL');
    }

    public function delete($path){
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

            Log::info('AWS S3 Delete Object: ',[
                'result' => $result,
                'operation' => $result['@metadata']['statusCode'] == 204 ? 'success' : 'error',
            ]);

            if ($result['@metadata']['statusCode'] == 204) {
                return true;
            }

            return false;
        }catch (S3Exception $e) {
            Log::error('Error deleting file from S3: ' . $path, [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    public function store($aws_path, $webp_path, $object){
        try {
            // get webp file from local storage and upload to s3
            $webp_file = Storage::get($webp_path['file_path']);
            Storage::disk('s3')->put($aws_path, $webp_file, 'public');

            // then delete local file
            Storage::delete($webp_path['file_path']);

            // update object with new path to s3
            $object->file = Storage::disk('s3')->url($aws_path);
            $object->save();
        }catch (S3Exception $e) {
            Log::error('Error store file from S3: ' . $aws_path, [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
