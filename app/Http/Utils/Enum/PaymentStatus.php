<?php


namespace App\Http\Utils\Enum;

/**
 * Este clase representa un estado real para el proceso de pago no modificar sin validación.
 * Class PaymentStatus
 * @package App\Http\Controllers\Globals\Enum
 * @author Alejandro Isla <aisla@innovaweb.cl>
 */
abstract class PaymentStatus
{
    const PAID = 'PAID';
    const PROCESSING = 'PROCESSING';
    const CREATED = 'CREATED';
    const CANCELED = 'CANCELED';
    const REJECTED = 'REJECTED';
    const WAITING = 'WAITING';
}
