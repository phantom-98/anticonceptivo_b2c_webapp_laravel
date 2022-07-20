<?php

namespace Willywes\ApiResponse;

class Format implements ICode
{
    public static function Response($status, $title = null, $message = null, $data = null): array
    {
        return [
            'status' => $status,
            'title' => $title ?? self::SetDefaultTitle($status),
            'message' => $message,
            'data' => $data,
        ];
    }

    private static function SetDefaultTitle($class): string
    {
        switch ($class) {
            case self::STATUS_INFO:
                return 'Info';
            case self::STATUS_SUCCESS:
                return 'Success';
            case self::STATUS_WARNING:
                return 'Warning';
            case self::STATUS_ERROR:
                return 'Error';
            case self::STATUS_REDIRECTION:
                return 'Redirection';
            case self::STATUS_FIELDS_VALIDATION:
                return 'Error Fields';
            default:
                return '';
        }
    }
}
