# ApiResponse

[![Latest Version on Packagist][ico-version]][link-packagist]
[![Total Downloads][ico-downloads]][link-downloads]
[![StyleCI][ico-styleci]][link-styleci]

[comment]: <> ([![Build Status][ico-travis]][link-travis])


Class to generate a standard structure for api json responses.

## Installation

Via Composer

``` bash
$ composer require willywes/apiresponse
```

## Usage

#### Imports

``` php
use Willywes\ApiResponse\ApiResponse;
```

### Functions of Control (HTTP/200 OK)

Default functions that always return a http 200 code, but have a control state.

#### Params

|Param          |Description                            |
|---------------|---------------------------------------|
|**data**      |array of data for response (allow null)|
|**message**   |custom message to response (optional)  |
|**title**     |custom title to response (optional)    |

#### Functions

|Function                        |Description                                      |
|--------------------------------|-------------------------------------------------|
|**JsonSuccess**               | Response status "success" with HTTP 200          |
|**JsonError**                 | Response status "error" with HTTP 200            |
|**JsonWarning**               | Response status "warning" with HTTP 200          |
|**JsonInfo**                  | Response status "info" with HTTP 200             |
|**JsonFieldValidation**       | Response status "field_validation" with HTTP 200|
|**JsonFieldValidationError**  | Response status "field_validation" with HTTP 422|

#### Examples

##### Success example

``` php
//Execution in php
return ApiResponse::JsonSuccess([
        'user' => User::first(),
        'roles' => Role::all(),
    ]);
```

``` json
//Response
{
    "status":"success",
    "title":"Operación Exitosa.",
    "message": null,
    "data":{
        "user":{
            "id":1,
            "full_name":"John Smith",
            "email":"jsmith@test.cl",
            "role_id":1
        },
        "roles":[
            {
                "id":1,
                "name":"God Admin"
            },
            {
                "id":2,
                "name":"Administrator"
            }
        ]
    }
}
```

``` json5
//HTTP Response 
Status Code: 200 OK
```

##### Error example

``` php
//Execution in php
return ApiResponse::JsonError(null, 'something has gone wrong!', 'oops');
```

``` json
//Response
{
    "status":"error",
    "title":"oops",
    "message":"something has gone wrong!",
    "data": null
}
```

``` json5
//HTTP Response 
Status Code: 200 OK
```

### Functions with specific HTTP Code

Default functions that returns a specific http code, but in the same way the body responds

#### Params

|Param          |Description                            |
|---------------|---------------------------------------|
|**data**|array of data for response (allow null)|
|**message**|custom message to response (optional)|

#### Functions Code HTTP 1XX

|Http Code|Function Name|Description|
|---|---|---|
|**100**|**Http100 or Continue**|Response status "info" with HTTP 100|
|**101**|**Http101 or SwitchingProtocols**|Response status "info" with HTTP 101|
|**102**|**Http102 or Processing**|Response status "info" with HTTP 102|
|**103**|**Http103 or EarlyHints**|Response status "info" with HTTP 103|

#### Functions Code HTTP 2XX

|Http Code|Function Name|Description|
|---|---|---|
|**200**|**Http200 or Ok**|Response status "success" with HTTP 200|
|**201**|**Http201 or Created**|Response status "success" with HTTP 201|
|**202**|**Http202 or Accepted**|Response status "success" with HTTP 202|
|**203**|**Http203 or NonAuthoritativeInformation**|Response status "success" with HTTP 203|
|**204**|**Http204 or NoContent**|Response status "success" with HTTP 204|
|**205**|**Http205 or ResetContent**|Response status "success" with HTTP 205|
|**206**|**Http206 or PartialContent**|Response status "success" with HTTP 206|

#### Functions Code HTTP 3XX

|Http Code|Function Name|Description|
|---|---|---|
|**300**|**Http300 or MultipleChoices**|Response status "redirection" with HTTP 300|
|**301**|**Http301 or MovedPermanently**|Response status "redirection" with HTTP 301|
|**302**|**Http302 or MovedTemporarily**|Response status "redirection" with HTTP 302|
|**303**|**Http303 or SeeOther**|Response status "redirection" with HTTP 303|
|**304**|**Http304 or NotModified**|Response status "redirection" with HTTP 304|
|**305**|**Http305 or UseProxy**|Response status "redirection" with HTTP 305|
|**307**|**Http307 or TemporaryRedirect**|Response status "redirection" with HTTP 307|
|**308**|**Http308 or PermanentRedirect**|Response status "redirection" with HTTP 308|

#### Functions Code HTTP 4XX

|Http Code|Function Name|Description|
|---|---|---|
|**400**|**Http400 or BadRequest**|Response status "error" with HTTP 400|
|**401**|**Http401 or Unauthorized**|Response status "error" with HTTP 401|
|**402**|**Http402 or PaymentRequired**|Response status "error" with HTTP 402|
|**403**|**Http403 or Forbidden**|Response status "error" with HTTP 403|
|**404**|**Http404 or NotFound**|Response status "error" with HTTP 404|
|**405**|**Http405 or MethodNotAllowed**|Response status "error" with HTTP 405|
|**406**|**Http406 or NotAcceptable**|Response status "error" with HTTP 406|
|**407**|**Http407 or ProxyAuthenticationRequired**|Response status "error" with HTTP 407|
|**408**|**Http408 or RequestTimeout**|Response status "error" with HTTP 408|
|**409**|**Http409 or Conflict**|Response status "error" with HTTP 409|
|**410**|**Http410 or Gone**|Response status "error" with HTTP 410|
|**411**|**Http411 or LengthRequired**|Response status "error" with HTTP 411|
|**412**|**Http412 or PreconditionFailed**|Response status "error" with HTTP 412|
|**413**|**Http413 or RequestEntityTooLarge**|Response status "error" with HTTP 413|
|**414**|**Http414 or RequestUriTooLarge**|Response status "error" with HTTP 414|
|**415**|**Http415 or UnsupportedMediaType**|Response status "error" with HTTP 415|
|**416**|**Http416 or RequestedRangeNotSatisfiable**|Response status "error" with HTTP 416|
|**417**|**Http417 or ExpectationFailed**|Response status "error" with HTTP 417|
|**421**|**Http421 or MissDirectedRequest**|Response status "error" with HTTP 421|
|**422**|**Http422 or UnprocessableEntity**|Response status "error" with HTTP 422|
|**423**|**Http423 or Locked**|Response status "error" with HTTP 423|
|**424**|**Http424 or FailedDependency**|Response status "error" with HTTP 424|
|**426**|**Http426 or UpgradeRequired**|Response status "error" with HTTP 426|
|**428**|**Http428 or PreconditionRequired**|Response status "error" with HTTP 428|
|**429**|**Http429 or TooManyRequests**|Response status "error" with HTTP 429|
|**431**|**Http431 or RequestHeaderFieldsTooLarge**|Response status "error" with HTTP 431|
|**451**|**Http451 or UnavailableForLegalReasons**|Response status "error" with HTTP 451|

#### Functions Code HTTP 5XX

|Http Code|Function Name|Description|
|---|---|---|
|**500**|**Http500 or InternalServerError**|Response status "error" with HTTP 500|
|**501**|**Http501 or NotImplemented**|Response status "error" with HTTP 501|
|**502**|**Http502 or BadGateway**|Response status "error" with HTTP 502|
|**503**|**Http503 or ServiceUnavailable**|Response status "error" with HTTP 503|
|**504**|**Http504 or GatewayTimeout**|Response status "error" with HTTP 504|
|**505**|**Http505 or HTTPVersionNotSupported**|Response status "error" with HTTP 505|
|**506**|**Http506 or VariantAlsoNegotiates**|Response status "error" with HTTP 506|
|**507**|**Http507 or InsufficientStorage**|Response status "error" with HTTP 507|
|**508**|**Http508 or LoopDetected**|Response status "error" with HTTP 508|
|**510**|**Http510 or NotExtended**|Response status "error" with HTTP 510|
|**511**|**Http511 or NetworkAuthenticationRequired**|Response status "error" with HTTP 511|

#### Examples

##### 404 Error example

``` php
//Execution in php
return ApiResponse::NotFound(null, 'object not found!');
// or
//Execution in php without params
return ApiResponse::NotFound();
// or
return ApiResponse::Http404();
```

``` json
//Response
{
   "status": "error",
   "message": "Not Found",
   "data": null
}
```

``` json5
//HTTP Response 
Status Code: 404 Not Found
```

##### 401 Error example

``` php
//Execution in php
return ApiResponse::Unauthorized();
// or
return ApiResponse::Http401();
```

``` json
//Response
{
   "status": "error",
   "message": "Unauthorized",
   "data": null
}
```

``` json5
//HTTP Response 
Status Code: 401 Unauthorized
```

##### 403 Error example

``` php
//Execution in php
return ApiResponse::Forbidden();
// or
return ApiResponse::Http403();
```

``` json
//Response
{
   "status": "error",
   "message": "Forbidden",
   "data": null
}
```

``` json5
//HTTP Response 
Status Code: 403 Forbidden
```

## Credits

- [Alejandro Isla][link-author]

## License

license. Please see the [license file](license.md) for more information.

[ico-version]: https://img.shields.io/packagist/v/willywes/apiresponse.svg?style=flat-square

[ico-downloads]: https://img.shields.io/packagist/dt/willywes/apiresponse.svg?style=flat-square

[ico-travis]: https://img.shields.io/travis/willywes/apiresponse/master.svg?style=flat-square

[ico-styleci]: https://styleci.io/repos/306464936/shield

[link-packagist]: https://packagist.org/packages/willywes/apiresponse

[link-downloads]: https://packagist.org/packages/willywes/apiresponse

[link-travis]: https://travis-ci.org/willywes/apiresponse

[link-styleci]: https://styleci.io/repos/306464936

[link-author]: https://github.com/willywes
