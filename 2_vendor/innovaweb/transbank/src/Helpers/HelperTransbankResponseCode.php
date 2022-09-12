<?php


namespace Innovaweb\Transbank\Helpers;


use Exception;

class HelperTransbankResponseCode
{

    /**
     * VCI
     *
     * @param string $code vic.
     * @return string retorna el significado del código, Este campo es información adicional suplementaria al responseCode pero el comercio no debe validar este campo. Porque constantemente se agregan nuevos mecanismos de autenticación que se traducen en nuevos valores para este campo que no están necesariamente documentados.
     *
     */
    public static function VCI($code)
    {
        $code = strtoupper(strval($code));
        try {

            $codes = [
                'TSY' => 'Autenticación Exitosa.',
                'TSN' => 'Autenticación Rechazada.',
                'NP' => 'No Participa, probablemente por ser una tarjeta extranjera que no participa en el programa 3DSecure, sin autenticación.',
                'U3' => 'Falla conexión, Autenticación Rechazada.',
                'INV' => 'Datos Inválidos.',
                'A' => 'Intentó.',
                'CNP1' => 'Comercio no participa.',
                'EOP' => 'Error operacional.',
                'BNA' => 'BIN no adherido.',
                'ENA' => 'Emisor no adherido.',
                'TO' => 'Tiempo máximo excedido para autenticación.',
                'ABO' => 'Autenticación abortada por tarjeta habiente.',
                'ACS2' => 'Autenticación fallida extranjera.',
                // Para venta extranjera, estos son algunos de los códigos:

                'TSYS' => 'Autenticación exitosa Sin fricción. Resultado autenticación: Autenticación Exitosa.',
                'TSAS' => 'Intento, tarjeta no enrolada / emisor no disponible. Resultado autenticación: Autenticación Exitosa.',
                'TSNS' => 'Fallido, no autenticado, denegado / no permite intentos. Resultado autenticación: Autenticación denegada.',
                'TSRS' => 'Autenticación rechazada - sin fricción. Resultado autenticación: Autenticación rechazada.',
                'TSUS' => 'Autenticación no se pudo realizar por problema técnico u otro motivo. Resultado autenticación: Autenticación fallida.',
                'TSCF' => 'Autenticación con fricción (No aceptada por el comercio). Resultado autenticación: Autenticación incompleta.',
                'TSYF' => 'Autenticación exitosa con fricción. Resultado autenticación: Autenticación exitosa.',
                'TSNF' => 'No autenticado. Transacción denegada con fricción. Resultado autenticación: Autenticación denegada.',
                'TSUF' => 'Autenticación con fricción no se pudo realizar por problema técnico u otro. Resultado autenticación: Autenticación fallida.',
                'NPC' => 'Comercio no Participa. Resultado autenticación: Comercio/BIN no participa.',
                'NPB' => 'BIN no participa. Resultado autenticación: Comercio/BIN no participa.',
                'NPCB' => 'Comercio y BIN no participan. Resultado autenticación: Comercio/BIN no participa.',
                'SPCB' => 'Comercio y BIN sí participan. Resultado autenticación: Autorización incompleta.',

            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    /**
     * ResponseCode
     *
     * @param string $code response_code.
     * @return string retorna el significado del código, Código de respuesta de la autorización.
     *
     */
    public static function ResponseCode($code)
    {
        $code = strval($code);
        try {
            $codes = [
                '0' => 'Transacción aprobada.',
                '-1' => 'Rechazo - Posible error en el ingreso de datos de la transacción.',
                '-2' => 'Rechazo - Se produjo fallo al procesar la transacción, este mensaje de rechazo se encuentra relacionado.',
                '-3' => 'Rechazo - Interno Transbank.',
                '-4' => 'Rechazo - Rechazada por parte del emisor.',
                '-5' => 'Rechazo - Transacción con riesgo de posible fraude.',
            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    /**
     * ResponseCommerceCode
     *
     * @param string $code response_commerce_code.
     * @return string retorna el significado del código, Código de respuesta de la transacción al comercio.
     *
     */
    public static function ResponseCommerceCode($code)
    {
        $code = strval($code);
        try {
            $codes = [
                '-1' => 'Tarjeta inválida.',
                '-2' => 'Error de conexión.',
                '-3' => 'Excede monto máximo.',
                '-4' => 'Fecha de expiración inválida.',
                '-5' => 'Problema en autenticación.',
                '-6' => 'Rechazo general.',
                '-7' => 'Tarjeta bloqueada.',
                '-8' => 'Tarjeta vencida.',
                '-9' => 'Transacción no soportada.',
                '-10' => 'Problema en la transacción.',
                '-11' => 'Excede límite de reintentos de rechazos (Próximamente).',
            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    /**
     * Status
     *
     * @param string $code status.
     * @return string retorna el significado del código, Estado de la transacción, Largo máximo: 64
     *
     */
    public static function Status($code)
    {
        $code = strtoupper(strval($code));
        try {
            $codes = [
                'INITIALIZED' => 'Transacción inicializada.',
                'AUTHORIZED' => 'Transacción autorizada.',
                'REVERSED' => 'Transacción revertida.',
                'FAILED' => 'Transacción fallida.',
                'NULLIFIED' => 'Transacción anulada.',
                'PARTIALLY_NULLIFIED' => 'Transacción parcialmente anulada.',
                'CAPTURED' => 'Transacción capturada.',
            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    /**
     * PaymentTypeCode
     *
     * @param string $code payment_type_code.
     * @return string retorna el significado del código, Tipo de pago de la transacción.
     *
     */
    public static function PaymentTypeCode($code)
    {
        $code = strtoupper(strval($code));
        try {
            $codes = [
                'VD' => 'Venta Débito.',
                'VN' => 'Venta Normal.',
                'VC' => 'Venta en cuotas.',
                'SI' => '3 cuotas sin interés.',
                'S2' => '2 cuotas sin interés.',
                'NC' => 'N Cuotas sin interés.',
                'VP' => 'Venta Prepago.',
            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    /**
     * RefundCode
     *
     * @param string $code refund_code.
     * @return string retorna el significado del código, Reembolso de la transacción.
     *
     */
    public static function RefundCode($code)
    {
        $code = strtoupper(strval($code));
        try {
            $codes = [
                '304' => 'Validación de campos de entrada nulos.',
                '245' => 'Código de comercio no existe.',
                '22' => 'El comercio no se encuentra activo.',
                '316' => 'El comercio indicado no corresponde al certificado o no es hijo del comercio MALL en caso de transacciones MALL.',
                '308' => 'Operación no permitida.',
                '274' => 'Transacción no encontrada.',
                '16' => 'La transacción no permite anulación.',
                '292' => 'La transacción no está autorizada.',
                '284' => 'Periodo de anulación excedido.',
                '310' => 'Transacción anulada previamente.',
                '311' => 'Monto a anular excede el saldo disponible para anular.',
                '312' => 'Error genérico para anulaciones.',
                '315' => 'Error del autorizador.',
                '53' => 'La transacción no permite anulación parcial de transacciones con cuotas.',
            ];
            return $codes[$code];
        } catch (Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

}
