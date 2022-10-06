<?php


namespace App\Http\Helpers;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Illuminate\Support\Facades\Log;

class AWSS3Helper
{
    static function delete($path){

        $key = env('AWS_ACCESS_KEY_ID');
        $secret = env('AWS_SECRET_ACCESS_KEY');
        $bucket = env('AWS_BUCKET');
        $region = env('AWS_DEFAULT_REGION');

        $s3 = new S3Client([
            'version' => 'latest',
            'region'  => $region,
            'credentials' => [
                'key'    => $key,
                'secret' => $secret,
            ],
        ]);

        $path = str_replace(env('AWS_URL'), '', urldecode($path));

        try {
            $result = $s3->deleteObject(['Bucket' => $bucket, 'Key' => $path]);

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
}
