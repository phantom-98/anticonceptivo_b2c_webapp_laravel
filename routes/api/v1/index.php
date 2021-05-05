<?php


Route::prefix('v1')
    ->name('v1.')
//    ->middleware('auth:intranet')
    ->group(function () {

        include 'application/index.php';

//        include 'intranet/index.php';

    });


