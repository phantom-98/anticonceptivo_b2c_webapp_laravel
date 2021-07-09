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

            Route::get('/acceder', 'AuthController@show')->name('auth.show');
            Route::post('/acceder', 'AuthController@login')->name('auth.login');
            Route::any('/logout', 'AuthController@logout')->name('auth.logout');
//            Route::post('/logout', 'AuthController@logout')->name('auth.logout');
            Route::get('/acceder/enviar-contrasena', 'AuthController@showSendPassword')->name('auth.show-send-password');
            Route::post('/acceder/enviar-contrasena', 'AuthController@sendPassword')->name('auth.send-password');
            Route::get('/acceder/recuperar-contrasena', 'AuthController@showRecoveryPassword')->name('auth.show-recovery-password');
            Route::post('/acceder/recuperar-contrasena', 'AuthController@recoveryPassword')->name('auth.recovery-password');

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

                Route::post('categorias/position', 'CategoryController@position')->name('categories.position');
                Route::post('categorias/active', 'CategoryController@active')->name('categories.active');
                Route::resource('categorias', 'CategoryController', ['names' => getResourceRoutesForNameHelper('categories')]);

                Route::post('subcategorias/position', 'SubcategoryController@position')->name('subcategories.position');
                Route::post('subcategorias/active', 'SubcategoryController@active')->name('subcategories.active');
                Route::resource('subcategorias', 'SubcategoryController', ['names' => getResourceRoutesForNameHelper('subcategories')]);

                Route::post('marcas/active', 'BrandController@active')->name('brands.active');
                Route::post('marcas/position', 'BrandController@position')->name('brands.position');
                Route::resource('marcas', 'BrandController', ['names' => getResourceRoutesForNameHelper('brands')]);

                Route::delete('banners/delete-item/{id}', 'BannerController@delete_item')->name('banners.delete_item');
                Route::put('banners/edit-item/{id}', 'BannerController@edit_item')->name('banners.edit_item');
                Route::post('banners/position', 'BannerController@position')->name('banners.position');
                Route::resource('banners', 'BannerController', ['names' => getResourceRoutesForNameHelper('banners')]);

                Route::post('tipos-post-blog/active', 'PostTypeController@active')->name('post-types.active');
                Route::resource('tipos-post-blog', 'PostTypeController', ['names' => getResourceRoutesForNameHelper('post-types')]);

                Route::post('post-blog/active', 'PostController@active')->name('posts.active');
                Route::post('post-blog/position', 'PostController@position')->name('posts.position');
                Route::resource('post-blog', 'PostController', ['names' => getResourceRoutesForNameHelper('posts')]);

                Route::post('faq/active', 'FaqController@active')->name('faqs.active');
                Route::post('faq/position', 'FaqController@position')->name('faqs.position');
                Route::resource('faq', 'FaqController', ['names' => getResourceRoutesForNameHelper('faqs')]);

                Route::post('categorias-faq/active', 'CategoryFaqController@active')->name('category_faqs.active');
                Route::post('categorias-faq/position', 'CategoryFaqController@position')->name('category_faqs.position');
                Route::resource('categorias-faq', 'CategoryFaqController', ['names' => getResourceRoutesForNameHelper('category_faqs')]);

                Route::post('consumo-responsable/active', 'ResponsibleConsumptionController@active')->name('responsible_consumptions.active');
                Route::resource('consumo-responsable', 'ResponsibleConsumptionController', ['names' => getResourceRoutesForNameHelper('responsible_consumptions')]);

                Route::resource('clientes', 'CustomerController', ['names' => getResourceRoutesForNameHelper('customers')]);
                Route::resource('dia-pago', 'DayPaymentController', ['names' => getResourceRoutesForNameHelper('day_payment')]);

                Route::get('pedidos/search-client', 'OrderController@search_client')->name('orders.search_client');
                Route::get('pedidos/detalle', 'OrderController@detail')->name('orders.detail');
                Route::get('pedidos/export', 'OrderController@export')->name('orders.export');
                Route::post('pedidos/prescription-validate', 'OrderController@prescription_validate')->name('orders.prescription_validate');
                Route::post('pedidos/pedidos/change-order-status', 'OrderController@changeOrderStatus')->name('orders.changeOrderStatus');
                Route::resource('pedidos', 'OrderController', ['names' => getResourceRoutesForNameHelper('orders')]);

                Route::resource('quienes-somos', 'AboutController', ['names' => getResourceRoutesForNameHelper('abouts')]);

                Route::resource('aviso-legal-productos', 'LegalWarningController', ['names' => getResourceRoutesForNameHelper('legal_warnings')]);

                Route::post('valores/active', 'ValueController@active')->name('values.active');
                Route::resource('valores', 'ValueController', ['names' => getResourceRoutesForNameHelper('values')]);

                Route::post('campanas/active', 'CampaignController@active')->name('campaigns.active');
                Route::resource('campanas', 'CampaignController', ['names' => getResourceRoutesForNameHelper('campaigns')]);

                Route::post('linea-tiempo/active', 'TimelineController@active')->name('timelines.active');
                Route::post('linea-tiempo/position', 'TimelineController@position')->name('timelines.position');
                Route::resource('linea-tiempo', 'TimelineController', ['names' => getResourceRoutesForNameHelper('timelines')]);

                Route::post('alianzas/active', 'AllianceController@active')->name('alliances.active');
                Route::resource('alianzas', 'AllianceController', ['names' => getResourceRoutesForNameHelper('alliances')]);

                Route::post('planes-suscripcion/active', 'SubscriptionPlanController@active')->name('subscription_plans.active');
                Route::resource('planes-suscripcion', 'SubscriptionPlanController', ['names' => getResourceRoutesForNameHelper('subscription_plans')]);

                Route::resource('valor-suscripcion', 'SubscriptionValueController', ['names' => getResourceRoutesForNameHelper('subscription_values')]);

                Route::post('tipos-contacto/active', 'ContactIssueController@active')->name('contact_issues.active');
                Route::resource('tipos-contacto', 'ContactIssueController', ['names' => getResourceRoutesForNameHelper('contact_issues')]);

                Route::post('contactos/reply', 'ContactController@reply')->name('contacts.reply');
                Route::get('contactos/export', 'ContactController@export')->name('contacts.export');
                Route::resource('contactos', 'ContactController', ['names' => getResourceRoutesForNameHelper('contacts')]);

                Route::post('reclamos/reply', 'ClaimController@reply')->name('claims.reply');
                Route::get('reclamos/export', 'ClaimController@export')->name('claims.export');
                Route::resource('reclamos', 'ClaimController', ['names' => getResourceRoutesForNameHelper('claims')]);

                Route::get('precios-productos/export', 'PriceController@export')->name('prices.export');
                Route::resource('precios-productos', 'PriceController', ['names' => getResourceRoutesForNameHelper('prices')]);

                Route::post('alianzas/active', 'AllianceController@active')->name('alliances.active');
                Route::resource('alianzas', 'AllianceController', ['names' => getResourceRoutesForNameHelper('alliances')]);

                Route::get('productos/{id}/imagenes', 'ProductController@show_images')->name('products.show_images');
                Route::post('productos/position', 'ProductController@position')->name('products.position');
                Route::get('productos/export', 'ProductController@export')->name('products.export');
                Route::post('productos/active', 'ProductController@active')->name('products.active');
                Route::post('productos/import', 'ProductController@import')->name('products.import');
                Route::resource('productos', 'ProductController', ['names' => getResourceRoutesForNameHelper('products')]);

                Route::post('paginas/active', 'PageController@active')->name('pages.active');
                Route::resource('paginas', 'PageController', ['names' => getResourceRoutesForNameHelper('pages')]);
                Route::post('paginas/position', 'PageController@position')->name('pages.position');

                Route::post('laboratorios/active', 'LaboratoryController@active')->name('laboratories.active');
                Route::resource('laboratorios', 'LaboratoryController', ['names' => getResourceRoutesForNameHelper('laboratories')]);

                Route::post('bases-legales/active', 'LegalBaseController@active')->name('legal_bases.active');
                Route::resource('bases-legales', 'LegalBaseController', ['names' => getResourceRoutesForNameHelper('legal_bases')]);

                Route::post('costos-despachos/active', 'DeliveryCostController@active')->name('delivery_costs.active');
                Route::resource('costos-despachos', 'DeliveryCostController', ['names' => getResourceRoutesForNameHelper('delivery_costs')]);

                Route::get('codigo-descuento/search-cliente', 'DiscountCodeController@search_customer')->name('discount_code.search_customer');

                Route::post('codigo-descuento/active', 'DiscountCodeController@active')->name('discount_code.active');
                Route::resource('codigo-descuento', 'DiscountCodeController', ['names' => getResourceRoutesForNameHelper('discount_code')])->except(['show']);

                Route::post('comision-pagos/active', 'PaymentCommissionController@active')->name('payment_commissions.active');
                Route::resource('comision-pagos', 'PaymentCommissionController', ['names' => getResourceRoutesForNameHelper('payment_commissions')])->except(['show']);

            });

        });

}
