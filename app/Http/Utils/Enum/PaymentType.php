<?php


namespace App\Http\Utils\Enum;

/**
 * Este clase representa tipos de pagos según integración.
 * Class PaymentType
 * @package App\Http\Controllers\Globals\Enum
 * @author Alejandro Isla <aisla@innovaweb.cl>
 */
abstract class PaymentType
{
    const WEBPAY_PLUS = 'WEBPAY_PLUS';
    const WEBPAY_ONE_CLICK = 'WEBPAY_ONE_CLICK';
    const KHIPU = 'KHIPU';
    const TRANSFER = 'TRANSFER';
}
