<?php

use App\Exports\EmailsExport;
use App\Exports\EmailsProfessionalExport;

if(!function_exists('getResourceRoutesForNameHelper')){

    function getResourceRoutesForNameHelper($name)
    {
        return [
            'index' => $name . ".index",
            'create' => $name . ".create",
            'store' => $name . ".store",
            'show' => $name . ".show",
            'edit' => $name . ".edit",
            'update' => $name . ".update",
            'destroy' => $name . ".destroy",
        ];
    }
}


if (env('SHOW_INTRANET', 'TRUE') == 'TRUE') {

    Route::namespace('Intranet')
//        ->domain('intranet.localhost')
        ->name('intranet.')
        ->prefix('intranet')
        ->group(function () {

            Route::resourceVerbs([
                'create' => 'crear',
                'edit' => 'editar',
                'change-status' => 'cambiar-estado',
            ]);

            Route::get('/login', 'AuthController@show')->name('auth.show');
            Route::post('/login', 'AuthController@login')->name('auth.login');
            Route::any('/logout', 'AuthController@logout')->name('auth.logout');
//            Route::post('/logout', 'AuthController@logout')->name('auth.logout');
            Route::get('/login/send-password', 'AuthController@showSendPassword')->name('auth.show-send-password');
            Route::post('/login/send-password', 'AuthController@sendPassword')->name('auth.send-password');
            Route::get('/login/recovery-password', 'AuthController@showRecoveryPassword')->name('auth.show-recovery-password');
            Route::post('/login/recovery-password', 'AuthController@recoveryPassword')->name('auth.recovery-password');

            Route::group(['middleware' => ['auth:intranet']], function () {

                Route::get('/', function () {
                    return redirect()->route('intranet.dashboard');
                });

                Route::get('/inicio', 'DashboardController@index')->name('dashboard');

                Route::get('listado', function () {
                    return Excel::download(new EmailsExport, 'newsletter-companias.xlsx');
                })->name('listado');

                Route::get('listado-professional', function () {
                    return Excel::download(new EmailsProfessionalExport, 'newsletter-profesionales.xlsx');
                })->name('listado-professional');

                Route::post('roles/active', 'RoleController@active')->name('roles.active');
                Route::post('roles/change-status', 'RoleController@changeStatus')->name('roles.changeStatus');
                Route::resource('roles', 'RoleController', ['names' => getResourceRoutesForNameHelper('roles')]);

                Route::post('usuarios/active', 'UserController@active')->name('users.active');
                Route::get('usuarios/{user}/permissions', 'UserController@permissionsEdit')->name('users.permissionsEdit');
                Route::put('usuarios/{user}/permissions', 'UserController@permissionsUpdate')->name('users.permissionsUpdate');
                Route::post('usuarios/change-status', 'UserController@changeStatus')->name('users.changeStatus');
                Route::post('usuarios/all-change', 'UserController@all_change')->name('users.all_change');
                Route::resource('usuarios', 'UserController', ['names' => getResourceRoutesForNameHelper('users')]);

                Route::get('solicitudes-de-trabajo/search-company', 'OrderController@search_company')->name('orders.search_company');
                Route::get('solicitudes-de-trabajo/search-professional', 'OrderController@search_professional')->name('orders.search_professional');
                Route::get('solicitudes-de-trabajo/detalle', 'OrderController@detail')->name('orders.detail');
                Route::get('solicitudes-de-trabajo/export', 'OrderController@export')->name('orders.export');
                Route::resource('solicitudes-de-trabajo', 'OrderController', ['names' => getResourceRoutesForNameHelper('orders')]);

                Route::post('facturas/active', 'BillingController@active')->name('bills.active');
                Route::get('facturas/wsbill/{id}', 'BillingController@wsBill')->name('bills.wsBill');
                Route::get('facturas/', 'BillingController@isBill')->name('bills.isBill');
                Route::get('facturas/search-company', 'BillingController@search_company')->name('bills.search_company');


                Route::resource('facturas-pendientes', 'BillingController', ['names' => getResourceRoutesForNameHelper('bills')]);
                Route::get('solicitudes-de-pagos/search-professional', 'LiquidationController@searchProfessional')->name('liquidations.searchProfessional');
                Route::post('solicitudes-de-pagos-pendientes/pagar', 'LiquidationPendingController@pay')->name('liquidations_pending.pay');
                Route::resource('solicitudes-de-pagos-pendientes', 'LiquidationPendingController', ['names' => getResourceRoutesForNameHelper('liquidations_pending')]);
                Route::resource('solicitudes-de-pagos', 'LiquidationController', ['names' => getResourceRoutesForNameHelper('liquidations')]);

                Route::get('exportaciones', 'ExportController@index')->name('exports.index');
                Route::get('exportaciones/export-companias', 'ExportController@export_companies')->name('exports.export_companies');
                Route::get('exportaciones/export-profesionales', 'ExportController@export_professionals')->name('exports.export_professionals');
                Route::get('exportaciones/export-profesionales-eval', 'ExportController@export_professionals_eval')->name('exports.export_professionals_eval');
                Route::get('exportaciones/export-profesionales-nivel', 'ExportController@export_professionals_nivel')->name('exports.export_professionals_nivel');

                Route::get('editar-perfil', [
                    'as' => 'profile.editProfile', 'uses' => 'ProfileController@editProfile'
                ]);

                Route::post('editar-perfil', [
                    'as' => 'profile.updateProfile', 'uses' => 'ProfileController@updateProfile'
                ]);

                //NEW ROUTES CONFIGURATIONS
                Route::post('idiomas/active', 'LanguageController@active')->name('languages.active');
                Route::resource('idiomas', 'LanguageController', ['names' => getResourceRoutesForNameHelper('languages')]);

                Route::post('areas/active', 'AreaController@active')->name('areas.active');
                Route::resource('areas', 'AreaController', ['names' => getResourceRoutesForNameHelper('areas')]);

                Route::post('habilidades/active', 'SkillController@active')->name('skills.active');
                Route::resource('habilidades', 'SkillController', ['names' => getResourceRoutesForNameHelper('skills')]);

                Route::post('paginas/active', 'PageController@active')->name('pages.active');
                Route::resource('paginas', 'PageController', ['names' => getResourceRoutesForNameHelper('pages')]);

                Route::resource('configuraciones', 'SettingController', ['names' => getResourceRoutesForNameHelper('settings')]);

                Route::post('categorias-paso-a-paso/active', 'FrontComponentCategoryController@active')->name('frontcomponentcategories.active');
                Route::resource('categorias-paso-a-paso', 'FrontComponentCategoryController', ['names' => getResourceRoutesForNameHelper('frontcomponentcategories')]);

                Route::post('paso-a-paso/active', 'FrontComponentController@active')->name('frontcomponents.active');
                Route::resource('paso-a-paso', 'FrontComponentController', ['names' => getResourceRoutesForNameHelper('frontcomponents')]);

                Route::post('companias/active', 'CompanyController@active')->name('companies.active');
                Route::post('companias/banned', 'CompanyController@banned')->name('companies.banned');
                Route::get('companias/export', 'CompanyController@export')->name('companies.export');
                Route::get('companias/search_area', 'CompanyController@search_area')->name('companies.search_area');
                Route::get('companias/top-five-companies', 'CompanyController@getTopFiveCompanies')->name('companies.getTopFiveCompanies');
                Route::post('companias/register-top-companies', 'CompanyController@registerTopCompanies')->name('companies.registerTopCompanies');
                Route::resource('companias', 'CompanyController', ['names' => getResourceRoutesForNameHelper('companies'), 'except' => ['store', 'edit', 'update', 'destroy']]);

                Route::post('profesionales/active', 'ProfessionalController@active')->name('professionals.active');
                Route::post('profesionales/banned', 'ProfessionalController@banned')->name('professionals.banned');
                Route::get('profesionales/export', 'ProfessionalController@export')->name('professionals.export');
                Route::get('profesionales/search_area', 'ProfessionalController@search_area')->name('professionals.search_area');
                Route::resource('profesionales', 'ProfessionalController', ['names' => getResourceRoutesForNameHelper('professionals'), 'except' => ['store', 'edit', 'update', 'destroy']]);


                Route::get('test', function () {

                    $start_date = \App\Models\Setting::where('key', 'LAST_PAYMENT_DATE')->first()->value;
                    $pay_date = \Carbon\Carbon::parse($start_date)->addDays(\App\Models\Setting::where('key', 'PAYMENT_RANGE')->first()->value);
                    $liquidations = \App\Models\Liquidation::where('is_paid', 0)->where('period_end', '<', $pay_date)->get();
                    return $liquidations;
                });

            });

        });

}
