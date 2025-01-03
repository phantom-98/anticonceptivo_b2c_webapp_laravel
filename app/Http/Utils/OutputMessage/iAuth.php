<?php

namespace App\Http\Utils\OutputMessage;

interface iAuth {
    const AUTH_GRANTED = 'Acceso autorizado';
    const LOGOUT_GRANTED = 'Adios!';
    const USER_OR_PASSWORD_INCORRECT = 'El usuario o contraseña no coinciden con nuestros registros, intente de nuevo.';
    const EMAIL_OR_PASSWORD_INCORRECT = 'El correo o contraseña no coinciden con nuestros registros, intente de nuevo.';
    const RECOVERY_PASSWORD_EMAIL_NOT_FOUND = 'El correo que ha ingresado no coincide con nuestros registros.';
    const LOCKED_ACCOUNT = 'Su cuenta esta bloqueada, por favor comuníquese con un administrador.!';
}
