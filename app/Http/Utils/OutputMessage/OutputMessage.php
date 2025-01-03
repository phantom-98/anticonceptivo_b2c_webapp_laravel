<?php

namespace App\Http\Utils\OutputMessage;

class OutputMessage implements iValidationField, iException, iAuth
{

    // CUSTOM

    const SUCCESS = 'Se ha realizado la petición con éxito.';
    const ONE_FIELD_AT_LEAST_REQUIRED = 'Para guardar se debe cambiar un campo al menos.';
    const HEALTH_AGREEMENT_ERROR = 'No ha sido posible actualizar los convenios de salud, por favor inténtelo de nuevo más tarde.';
    const NOT_ENOUGH_PARAMETERS = 'Faltan parámetros.';
    const TOKEN_EXPIRED = 'El token ha caducado, por favor solicita un nuevo token.';
    const TOKEN_ERROR = 'El token no ha sido envíado.';
    const NOTIFY_VIEWED_ERROR = 'No se ha podido cambiar el estado, por favor inténtelo de nuevo más tarde.';
    const NOTIFY_NOT_FOUND = 'Notificación no encontrada.';
    const STEP_SUCCESS = 'Paso completado correctamente.';

    const CUSTOMER_REGISTER = 'Cliente registrado correctamente.';
    const CUSTOMER_REGISTER_ERROR = 'No se ha podido registrar el cliente.';
    const CUSTOMER_NOT_FOUND = 'No se ha podido encontrar al cliente.';

    const CUSTOMER_NEW_PASSWORD = 'Se ha cambiado la contraseña exitosamente.';
    const CUSTOMER_NEW_PASSWORD_ERROR = 'No se ha podido cambiar la contrasea, por favor intélo de nuevo más tarde.';

    const CUSTOMER_PROFILE_UPDATE = 'Se ha actualizado el perfil exitosamente.';
    const CUSTOMER_PROFILE_UPDATE_ERROR = 'No se ha podido actualizar el perfil.';

    const CUSTOMER_ADDRESSES_CREATE = 'Se ha creado la dirección exitosamente.';
    const CUSTOMER_ADDRESSES_UPDATE = 'Se ha actualizado la dirección exitosamente.';
    const CUSTOMER_ADDRESSES_UPDATE_ERROR = 'No se ha podido actualizar la dirección.';

    const CUSTOMER_ADDRESS_NOT_FOUND = 'No se ha podido encontrar la dirección.';
    const CUSTOMER_ADDRESS_UPDATE_DEFAULT_ERROR = 'No se ha podido actualizar la dirección.';
    const CUSTOMER_ADDRESS_DELETED = "Se ha eliminado la dirección exitosamente.";

    const CUSTOMER_PRESCRIPTION_DELETED = 'Se ha eliminado la receta exitosamente.';
    const CUSTOMER_PRESCRIPTION_DELETED_ERROR = 'No se ha podido eliminar la receta.';
    const CUSTOMER_PRESCRIPTION_NOT_FOUND = 'No se ha podido encontrar la receta.';

    const PRODUCT_SLUG_NOT_FOUND = 'No se ha podido encontrar el producto.';
    const PRODUCT_NOT_FOUND = 'No se ha podido encontrar el producto.';

    const COMMUNE_NOT_FOUND = 'No se ha podido encontrar la comuna.';

    const RECOVERY_PASSWORD_ERROR = 'No hemos podido generar un link de recuperación de contraseña, por favor re intentalo más tarde.';
    const RECOVERY_PASSWORD = 'Se ha envíado un correo para recuperar la contraseña.';

    const CUSTOMER_SUBSCRIPTIONS_CREATE = 'Se ha creado la suscripción exitosamente.';
    const CUSTOMER_SUBSCRIPTION_CARD_DELETE = 'Se ha eliminado la tarjeta exitosamente.';
    const CUSTOMER_SUBSCRIPTIONS_UPDATE_ERROR = 'No se ha podido actualizar la suscripción.';
    const CUSTOMER_SUBSCRIPTION_NOT_FOUND = 'No se ha podido encontrar la suscripción.';
    const CUSTOMER_SUBSCRIPTION_CREATE_DEFAULT_ERROR = 'No se ha podido crear la suscripción.';
    const CUSTOMER_SUBSCRIPTION_UPDATE_DEFAULT_ERROR = 'No se ha podido actualizar la suscripción.';
    const CLAIM_SUBMIT_SUCCESS = 'Su reclamo se ha envíado de manera exitosa.';

    const DISCOUNT_CODE_NOT_FOUND = 'Código no valido.';
    const DISCOUNT_CODE_NOT_VALID = 'Este código no esta activo o ya ha expirado.';
    const DISCOUNT_CODE_VALID = 'Código valido.';

}
