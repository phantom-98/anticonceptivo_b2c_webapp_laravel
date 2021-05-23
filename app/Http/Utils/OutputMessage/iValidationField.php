<?php

namespace App\Http\Utils\OutputMessage;

interface iValidationField
{
    const FIELD_PASSWORD_REQUIRED = 'La contraseña es obligatoria.';
    const FIELD_NEW_PASSWORD_REQUIRED = 'La nueva contraseña es obligatoria.';
    const FIELD_PASSWORD_CONFIRMATION_REQUIRED = 'El campo repetir contraseña es obligatorio.';
    const FIELD_RUT_REQUIRED = 'El rut es obligatorio.';
    const FIELD_FIRST_NAME_REQUIRED = 'Los nombres son obligatorios.';
    const FIELD_LAST_NAME_REQUIRED = 'Los apellidos son obligatorios.';
    const FIELD_PHONE_REQUIRED = 'El teléfono es obligatorio.';
    const FIELD_PHONE_CODE_REQUIRED = 'El código teléfonico es obligatorio.';
    const FIELD_EMAIL_REQUIRED = 'El email es obligatorio.';
    const FIELD_ID_NUMBER_REQUIRED = 'El identificador es obligatorio.';
    const FIELD_ID_TYPE_REQUIRED ='El tipo de identificador es obligatorio.';
    
    const FIELD_ADDRESS_NAME_REQUIRED = 'El nombre de la dirección es obligatorio.';
    const FIELD_ADDRESS_REQUIRED = 'La dirección es obligatoria.';
    const FIELD_COMMUNE_ID_REQUIRED = 'La comuna es obligatoria.';
    const FIELD_REGION_ID_REQUIRED = 'La región es obligatoria.';
    const FIELD_EXTRA_INFO_REQUIRED = 'El número de casa / depto es obligatorio.';

    const FIELD_ID_NUMBER_UNIQUE = 'El identificador ya ha sido registrado.';
    const FIELD_EMAIL_UNIQUE = 'El correo ya ha sido registrado.';
    const FIELD_PHONE_UNIQUE = 'El teléfono ya ha sido registrado.';

    const FIELD_PASSWORD_MIN = 'La contraseña debe tener un largo de 8 caracteres.';
    const FIELD_PASSWORD_INVALID = 'Su contraseña actual no es correcta.';
    const FIELD_PASSWORD_CONFIRMATION_MIN = 'La confirmación de la contraseña debe tener un largo de 8 caracteres.';

    const FIELD_PASSWORD_CONFIRMATION = 'Las contraseñas ingresadas no coinciden.';

    const FIELD_AVATAR_REQUIRED = 'El avatar es obligatorio.';
    const FIELD_AVATAR_IMAGE = 'El avatar debe ser una imagen.';
    const FIELD_AVATAR_EXTENSION = "El tipo de imagen debe ser png, jpg o jpeg.";
    const FIELD_AVATAR_SIZE = 'La imagen debe ser inferior a 5MB.';
}
