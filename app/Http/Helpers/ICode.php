<?php


namespace App\Http\Helpers;


interface ICode
{

    // HTML CODES
    CONST CODE_100 = 'Continue';
    CONST CODE_101 = 'Switching Protocols';
    CONST CODE_200 = 'OK';
    CONST CODE_201 = 'Created';
    CONST CODE_202 = 'Accepted';
    CONST CODE_203 = 'Non-Authoritative Information';
    CONST CODE_204 = 'No Content';
    CONST CODE_205 = 'Reset Content';
    CONST CODE_206 = 'Partial Content';
    CONST CODE_300 = 'Multiple Choices';
    CONST CODE_301 = 'Moved Permanently';
    CONST CODE_302 = 'Moved Temporarily';
    CONST CODE_303 = 'See Other';
    CONST CODE_304 = 'Not Modified';
    CONST CODE_305 = 'Use Proxy';
    CONST CODE_400 = 'Bad Request';
    CONST CODE_401 = 'Unauthorized';
    CONST CODE_402 = 'Payment Required';
    CONST CODE_403 = 'Forbidden';
    CONST CODE_404 = 'Not Found';
    CONST CODE_405 = 'Method Not Allowed';
    CONST CODE_406 = 'Not Acceptable';
    CONST CODE_407 = 'Proxy Authentication Required';
    CONST CODE_408 = 'Request Time-out';
    CONST CODE_409 = 'Conflict';
    CONST CODE_410 = 'Gone';
    CONST CODE_411 = 'Length Required';
    CONST CODE_412 = 'Precondition Failed';
    CONST CODE_413 = 'Request Entity Too Large';
    CONST CODE_414 = 'Request-URI Too Large';
    CONST CODE_415 = 'Unsupported Media Type';
    CONST CODE_500 = 'Internal Server Error';
    CONST CODE_501 = 'Not Implemented';
    CONST CODE_502 = 'Bad Gateway';
    CONST CODE_503 = 'Service Unavailable';
    CONST CODE_504 = 'Gateway Time-out';
    CONST CODE_505 = 'HTTP Version not supported';

    // RESPONSES

    CONST TITLE_INFO = 'info';
    CONST TITLE_SUCCESS = 'success';
    CONST TITLE_WARNING = 'warning';
    CONST TITLE_ERROR = 'error';

    // AUTH CODES

    CONST CUSTOMER_AUTH_DISABLED = 'Su cuenta no se encuentra activa, por favor comuniquese con un administrador.';


    //SHOP

    CONST CACHE_SHOP_SETTINGS = 'shop_settings';

    //CART

    CONST CART_PRODUCT_NOT_FOUND = 'Producto no encontrado.';
    CONST CART_PRODUCT_NO_STOCK = 'No hay stock suficiente del producto.';

    CONST CART_PRODUCT_ADD_SUCCESS = 'Producto agregado correctamente.';
    CONST CART_PRODUCT_ADD_ERROR = 'Producto agregado correctamente.';

    CONST CART_PRODUCT_REMOVE_SUCCESS = 'Producto eliminado correctamente.';
    CONST CART_PRODUCT_REMOVE_ERROR = 'Producto eliminado correctamente.';

    CONST CART_PRODUCT_UPDATED_SUCCESS = 'Producto actualizado correctamente.';
    CONST CART_PRODUCT_UPDATED_ERROR = 'El Carrito no ha podido ser actualizado correctamente.';

    CONST CART_REMOVE_SUCCESS = 'Carrito eliminado correctamente.';
    CONST CART_REMOVE_ERROR = 'El Carrito no ha podido eliminar correctamente.';

    CONST CART_UPDATED_SUCCESS = 'Carrito actualizado correctamente.';
    CONST CART_UPDATED_ERROR = 'El Carrito no ha podido ser actualizado correctamente.';


}
