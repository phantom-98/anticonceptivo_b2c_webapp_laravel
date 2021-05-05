<?php

use App\Exports\EmailsExport;

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
                    return Excel::download(new EmailsExport, 'newsletter-clientes.xlsx');
                })->name('listado');

                Route::post('roles/active', 'RoleController@active')->name('roles.active');
                Route::post('roles/change-status', 'RoleController@changeStatus')->name('roles.changeStatus');
                Route::resource('roles', 'RoleController', ['names' => getResourceRoutesForNameHelper('roles')]);

                Route::post('usuarios/active', 'UserController@active')->name('users.active');
                Route::get('usuarios/{user}/permissions', 'UserController@permissionsEdit')->name('users.permissionsEdit');
                Route::put('usuarios/{user}/permissions', 'UserController@permissionsUpdate')->name('users.permissionsUpdate');
                Route::post('usuarios/change-status', 'UserController@changeStatus')->name('users.changeStatus');
                Route::post('usuarios/all-change', 'UserController@all_change')->name('users.all_change');
                Route::resource('usuarios', 'UserController', ['names' => getResourceRoutesForNameHelper('users')]);

                Route::get('editar-perfil', [
                    'as' => 'profile.editProfile', 'uses' => 'ProfileController@editProfile'
                ]);

                Route::post('editar-perfil', [
                    'as' => 'profile.updateProfile', 'uses' => 'ProfileController@updateProfile'
                ]);

                Route::resource('configuraciones', 'SettingController', ['names' => getResourceRoutesForNameHelper('settings')]);

                Route::post('categorias/active', 'CategoryController@active')->name('categories.active');
                Route::resource('categorias', 'CategoryController', ['names' => getResourceRoutesForNameHelper('categories')]);

                Route::post('subcategorias/active', 'SubCategoryController@active')->name('subcategories.active');
                Route::resource('subcategorias', 'SubCategoryController', ['names' => getResourceRoutesForNameHelper('subcategories')]);

                Route::post('marcas/active', 'BrandController@active')->name('brands.active');
                Route::resource('marcas', 'BrandController', ['names' => getResourceRoutesForNameHelper('brands')]);

                Route::delete('banners/delete-item/{id}', 'BannerController@delete_item')->name('banners.delete_item');
                Route::put('banners/edit-item/{id}', 'BannerController@edit_item')->name('banners.edit_item');
                Route::post('banners/position', 'BannerController@position')->name('banners.position');
                Route::resource('banners', 'BannerController', ['names' => getResourceRoutesForNameHelper('banners')]);

                Route::post('tipos-post-blog/active', 'PostTypeController@active')->name('post_types.active');
                Route::resource('tipos-post-blog', 'PostTypeController', ['names' => getResourceRoutesForNameHelper('post_types')]);

                Route::post('post-blog/active', 'PostController@active')->name('posts.active');
                Route::resource('post-blog', 'PostController', ['names' => getResourceRoutesForNameHelper('posts')]);

                Route::post('faq/active', 'FaqController@active')->name('faqs.active');
                Route::resource('faq', 'FaqController', ['names' => getResourceRoutesForNameHelper('faqs')]);

                Route::post('clientes/active', 'ClientController@active')->name('clients.active');
                Route::resource('clientes', 'ClientController', ['names' => getResourceRoutesForNameHelper('clients')]);

                Route::get('pedidos/search-client', 'OrderController@search_client')->name('orders.search_client');
                Route::get('pedidos/detalle', 'OrderController@detail')->name('orders.detail');
                Route::get('pedidos/export', 'OrderController@export')->name('orders.export');
                Route::post('pedidos/pedidos/change-order-status', 'OrderController@changeOrderStatus')->name('orders.changeOrderStatus');
                Route::resource('pedidos', 'OrderController', ['names' => getResourceRoutesForNameHelper('orders')]);

            });

        });

}
