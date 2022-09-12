<?php

namespace Willywes\ApiResponse;

class ApiResponse implements ICode
{
    public static function JsonInfo($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_INFO, $title, $message, $data), 200);
    }

    public static function JsonWarning($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_WARNING, $title, $message, $data), 200);
    }

    public static function JsonSuccess($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, $title, $message, $data), 200);
    }

    public static function JsonError($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, $title, $message, $data), 200);
    }

    public static function JsonFieldValidation($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_FIELDS_VALIDATION, $title, $message, $data), 200);
    }

    public static function JsonFieldValidationError($data = null, $message = null, $title = null)
    {
        return self::responseJson(Format::Response(self::STATUS_FIELDS_VALIDATION, $title, $message, $data), 422);
    }

    // HTTPS RESPONSE

    //INFO 10*
    public static function Http100($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_INFO, self::CODE_100, $message, $data), 100);
    }

    public static function Http101($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_INFO, self::CODE_101, $message, $data), 101);
    }

    public static function Http102($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_INFO, self::CODE_102, $message, $data), 102);
    }

    public static function Http103($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_INFO, self::CODE_103, $message, $data), 103);
    }

    public static function Continue($data = null, $message = null)
    {
        return self::Http100($data, $message);
    }

    public static function SwitchingProtocols($data = null, $message = null)
    {
        return self::Http101($data, $message);
    }

    public static function Processing($data = null, $message = null)
    {
        return self::Http102($data, $message);
    }

    public static function EarlyHints($data = null, $message = null)
    {
        return self::Http103($data, $message);
    }

    // ACCEPTS 20*
    public static function Http200($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_200, $message, $data), 200);
    }

    public static function Http201($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_201, $message, $data), 201);
    }

    public static function Http202($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_202, $message, $data), 202);
    }

    public static function Http203($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_203, $message, $data), 203);
    }

    public static function Http204($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_204, $message, $data), 204);
    }

    public static function Http205($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_205, $message, $data), 205);
    }

    public static function Http206($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_SUCCESS, self::CODE_206, $message, $data), 206);
    }

    public static function Ok($data = null, $message = null)
    {
        return self::Http200($data, $message);
    }

    public static function Created($data = null, $message = null)
    {
        return self::Http201($data, $message);
    }

    public static function Accepted($data = null, $message = null)
    {
        return self::Http202($data, $message);
    }

    public static function NonAuthoritativeInformation($data = null, $message = null)
    {
        return self::Http203($data, $message);
    }

    public static function NoContent($data = null, $message = null)
    {
        return self::Http204($data, $message);
    }

    public static function ResetContent($data = null, $message = null)
    {
        return self::Http205($data, $message);
    }

    public static function PartialContent($data = null, $message = null)
    {
        return self::Http206($data, $message);
    }

    //REDIRECTION 30*
    public static function Http300($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_300, $message, $data), 300);
    }

    public static function Http301($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_301, $message, $data), 301);
    }

    public static function Http302($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_302, $message, $data), 302);
    }

    public static function Http303($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_303, $message, $data), 303);
    }

    public static function Http304($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_304, $message, $data), 304);
    }

    public static function Http305($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_305, $message, $data), 305);
    }

    public static function Http307($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_307, $message, $data), 307);
    }

    public static function Http308($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_REDIRECTION, self::CODE_308, $message, $data), 308);
    }

    public static function MultipleChoices($data = null, $message = null)
    {
        return self::Http300($data, $message);
    }

    public static function MovedPermanently($data = null, $message = null)
    {
        return self::Http301($data, $message);
    }

    public static function MovedTemporarily($data = null, $message = null)
    {
        return self::Http302($data, $message);
    }

    public static function SeeOther($data = null, $message = null)
    {
        return self::Http303($data, $message);
    }

    public static function NotModified($data = null, $message = null)
    {
        return self::Http304($data, $message);
    }

    public static function UseProxy($data = null, $message = null)
    {
        return self::Http305($data, $message);
    }

    public static function TemporaryRedirect($data = null, $message = null)
    {
        return self::Http307($data, $message);
    }

    public static function PermanentRedirect($data = null, $message = null)
    {
        return self::Http308($data, $message);
    }

    // ERRORS 40*

    public static function Http400($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_400, $message, $data), 400);
    }

    public static function Http401($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_401, $message, $data), 401);
    }

    public static function Http402($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_402, $message, $data), 402);
    }

    public static function Http403($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_403, $message, $data), 403);
    }

    public static function Http404($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_404, $message, $data), 404);
    }

    public static function Http405($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_405, $message, $data), 405);
    }

    public static function Http406($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_406, $message, $data), 406);
    }

    public static function Http407($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_407, $message, $data), 407);
    }

    public static function Http408($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_408, $message, $data), 408);
    }

    public static function Http409($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_409, $message, $data), 409);
    }

    public static function Http410($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_410, $message, $data), 410);
    }

    public static function Http411($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_411, $message, $data), 411);
    }

    public static function Http412($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_412, $message, $data), 412);
    }

    public static function Http413($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_413, $message, $data), 413);
    }

    public static function Http414($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_414, $message, $data), 414);
    }

    public static function Http415($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_415, $message, $data), 415);
    }

    public static function Http416($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_416, $message, $data), 416);
    }

    public static function Http417($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_417, $message, $data), 417);
    }

    public static function Http421($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_421, $message, $data), 421);
    }

    public static function Http422($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_422, $message, $data), 422);
    }

    public static function Http423($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_423, $message, $data), 423);
    }

    public static function Http424($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_424, $message, $data), 424);
    }

    public static function Http426($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_426, $message, $data), 426);
    }

    public static function Http428($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_428, $message, $data), 428);
    }

    public static function Http429($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_429, $message, $data), 429);
    }

    public static function Http431($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_431, $message, $data), 431);
    }

    public static function Http451($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_451, $message, $data), 451);
    }

    public static function BadRequest($data = null, $message = null)
    {
        return self::Http400($data, $message);
    }

    public static function Unauthorized($data = null, $message = null)
    {
        return self::Http401($data, $message);
    }

    public static function PaymentRequired($data = null, $message = null)
    {
        return self::Http402($data, $message);
    }

    public static function Forbidden($data = null, $message = null)
    {
        return self::Http403($data, $message);
    }

    public static function NotFound($data = null, $message = null)
    {
        return self::Http404($data, $message);
    }

    public static function MethodNotAllowed($data = null, $message = null)
    {
        return self::Http405($data, $message);
    }

    public static function NotAcceptable($data = null, $message = null)
    {
        return self::Http406($data, $message);
    }

    public static function ProxyAuthenticationRequired($data = null, $message = null)
    {
        return self::Http407($data, $message);
    }

    public static function RequestTimeout($data = null, $message = null)
    {
        return self::Http408($data, $message);
    }

    public static function Conflict($data = null, $message = null)
    {
        return self::Http409($data, $message);
    }

    public static function Gone($data = null, $message = null)
    {
        return self::Http410($data, $message);
    }

    public static function LengthRequired($data = null, $message = null)
    {
        return self::Http411($data, $message);
    }

    public static function PreconditionFailed($data = null, $message = null)
    {
        return self::Http412($data, $message);
    }

    public static function RequestEntityTooLarge($data = null, $message = null)
    {
        return self::Http413($data, $message);
    }

    public static function RequestUriTooLarge($data = null, $message = null)
    {
        return self::Http414($data, $message);
    }

    public static function UnsupportedMediaType($data = null, $message = null)
    {
        return self::Http415($data, $message);
    }

    public static function RequestedRangeNotSatisfiable($data = null, $message = null)
    {
        return self::Http416($data, $message);
    }

    public static function ExpectationFailed($data = null, $message = null)
    {
        return self::Http417($data, $message);
    }

    public static function MissDirectedRequest($data = null, $message = null)
    {
        return self::Http421($data, $message);
    }

    public static function UnprocessableEntity($data = null, $message = null)
    {
        return self::Http422($data, $message);
    }

    public static function Locked($data = null, $message = null)
    {
        return self::Http423($data, $message);
    }

    public static function FailedDependency($data = null, $message = null)
    {
        return self::Http424($data, $message);
    }

    public static function UpgradeRequired($data = null, $message = null)
    {
        return self::Http426($data, $message);
    }

    public static function PreconditionRequired($data = null, $message = null)
    {
        return self::Http428($data, $message);
    }

    public static function TooManyRequests($data = null, $message = null)
    {
        return self::Http429($data, $message);
    }

    public static function RequestHeaderFieldsTooLarge($data = null, $message = null)
    {
        return self::Http431($data, $message);
    }

    public static function UnavailableForLegalReasons($data = null, $message = null)
    {
        return self::Http451($data, $message);
    }

    // ERRORS SERVER 50*

    public static function Http500($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_500, $message, $data), 500);
    }

    public static function Http501($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_501, $message, $data), 501);
    }

    public static function Http502($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_502, $message, $data), 502);
    }

    public static function Http503($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_503, $message, $data), 503);
    }

    public static function Http504($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_504, $message, $data), 504);
    }

    public static function Http505($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_505, $message, $data), 505);
    }

    public static function Http506($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_506, $message, $data), 506);
    }

    public static function Http507($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_507, $message, $data), 507);
    }

    public static function Http508($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_508, $message, $data), 508);
    }

    public static function Http510($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_510, $message, $data), 510);
    }

    public static function Http511($data = null, $message = null)
    {
        return self::responseJson(Format::Response(self::STATUS_ERROR, self::CODE_511, $message, $data), 511);
    }

    public static function InternalServerError($data = null, $message = null)
    {
        return self::Http500($data, $message);
    }

    public static function NotImplemented($data = null, $message = null)
    {
        return self::Http501($data, $message);
    }

    public static function BadGateway($data = null, $message = null)
    {
        return self::Http502($data, $message);
    }

    public static function ServiceUnavailable($data = null, $message = null)
    {
        return self::Http503($data, $message);
    }

    public static function GatewayTimeout($data = null, $message = null)
    {
        return self::Http504($data, $message);
    }

    public static function HTTPVersionNotSupported($data = null, $message = null)
    {
        return self::Http505($data, $message);
    }

    public static function VariantAlsoNegotiates($data = null, $message = null)
    {
        return self::Http506($data, $message);
    }

    public static function InsufficientStorage($data = null, $message = null)
    {
        return self::Http507($data, $message);
    }

    public static function LoopDetected($data = null, $message = null)
    {
        return self::Http508($data, $message);
    }

    public static function NotExtended($data = null, $message = null)
    {
        return self::Http510($data, $message);
    }

    public static function NetworkAuthenticationRequired($data = null, $message = null)
    {
        return self::Http511($data, $message);
    }

    private static function responseJson($response, $httpCode)
    {
        return response()->json($response, $httpCode);
    }
}
