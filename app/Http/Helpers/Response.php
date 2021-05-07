<?php


namespace App\Http\Helpers;

class Response implements ICode
{

    public static function ResponseInfo($message, $title = null, $object = null)
    {
        return self::processData(self::TITLE_INFO, $title, $message, $object);
    }

    public static function ResponseSuccess($message, $title = null, $object = null)
    {
        return self::processData(self::TITLE_SUCCESS, $title, $message, $object);
    }

    public static function ResponseWarning($message, $title = null, $object = null)
    {
        return self::processData(self::TITLE_WARNING, $title, $message, $object);
    }

    public static function ResponseError($message, $title = null, $object = null)
    {
        return self::processData(self::TITLE_ERROR, $title, $message, $object);
    }

    public static function Options($options)
    {
        return is_string($options) ? func_get_args() : $options;
    }

    private static function processData($status, $title, $message, $object)
    {

        return [
            'status' => $status,
            'title' => $title ?? self::setDefaultTitle($status),
            'message' => $message,
            'data' => $object
        ];
    }

    private static function setDefaultTitle($class)
    {
        if ($class == self::TITLE_INFO) {
            return 'Información';
        }
        if ($class == self::TITLE_SUCCESS) {
            return 'Operación Exitosa';
        }
        if ($class == self::TITLE_WARNING) {
            return 'Advertencia';
        }
        if ($class == self::TITLE_ERROR) {
            return 'Ha ocurrido un error';
        }
    }


    public static function ResponseJsonInfo($object = null, $message = null, $title = null)
    {
        return response()->json(self::processData(self::TITLE_INFO, $title, $message, $object), 200);
    }

    public static function ResponseJsonSuccess($object = null, $message = null, $title = null)
    {
        return response()->json(self::processData(self::TITLE_SUCCESS, $title, $message, $object), 200);
    }

    public static function ResponseJsonWarning($object = null, $message = null, $title = null)
    {
        return response()->json(self::processData(self::TITLE_WARNING, $title, $message, $object), 200);
    }

    public static function ResponseJsonError($object = null, $message = null, $title = null)
    {
        return response()->json(self::processData(self::TITLE_ERROR, $title, $message, $object), 200);
    }



    public static function ResponseApiJsonSuccess($data = null, $message = null)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message ?? self::CODE_200,
            'data' => $data ?? null
        ], 200);
    }

    public static function ResponseApiJsonError($data = null, $message = null)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message ?? self::CODE_503,
            'data' => $data ?? null
        ], 503);
    }


    public static function ResponseApiJsonErrorNotFound($data = null, $message = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message ?? self::CODE_404,
            'data' => $data ?? null
        ], 404);
    }

    public static function ResponseApiJsonErrorBadRequest($data = null, $message = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message ?? '',
            'data' => $data ?? self::CODE_400
        ], 400);
    }

    public static function ResponseApiJsonErrorForbidden($data = null, $message = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message ?? '',
            'data' => $data ?? self::CODE_403
        ], 403);
    }

}

