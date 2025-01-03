<nav id="mainnav-container">
    <div id="mainnav">


        <!--OPTIONAL : ADD YOUR LOGO TO THE NAVIGATION-->
        <!--It will only appear on small screen devices.-->
        <!--================================
        <div class="mainnav-brand">
            <a href="index.html" class="brand">
                <img src="img/logo.png" alt="Nifty Logo" class="brand-icon">
                <span class="brand-text">Nifty</span>
            </a>
            <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
        </div>
        -->


        <!--Menu-->
        <!--================================-->
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">

                    <!--Profile Widget-->
                    <!--================================-->
                    <div id="mainnav-profile" class="mainnav-profile">
                        <div class="profile-wrap text-center">
                            <div class="pad-btm">
                                @if(file_exists(storage_path('app/public/perfil/'.auth()->user()->id.'.jpg')) || file_exists(storage_path('app/public/perfil/'.auth()->user()->id.'.png')))
                                    @if(file_exists(storage_path('app/public/perfil/'.auth()->user()->id.'.jpg')))
                                        <img class="img-circle img-md" id="image-product" src="{{ Storage::url('public/perfil/'.auth()->user()->id.'.jpg') }}">
                                    @else
                                        <img class="img-circle img-md" id="image-product" src="{{ Storage::url('public/perfil/'.auth()->user()->id.'.png') }}">
                                    @endif
                                @else
                                    <img class="img-circle img-md" src="/themes/intranet/img/user-default.png"
                                     alt="Profile Picture">
                                @endif
                            </div>
                            <a href="#profile-nav" class="box-block" data-toggle="collapse" aria-expanded="false">
                                            <span class="pull-right dropdown-toggle">
                                                <i class="dropdown-caret"></i>
                                            </span>
                                <p class="mnp-name">{{ auth()->guard('intranet')->user()->full_name }}</p>
                                <span class="mnp-desc">{{ auth()->guard('intranet')->user()->email }}</span>
                            </a>
                        </div>
                        <div id="profile-nav" class="collapse list-group bg-trans">
                            <a href="{{ route('intranet.profile.editProfile') }}" class="list-group-item">
                                <i class="demo-pli-male icon-lg icon-fw"></i> Ver Perfil
                            </a>
                            <a href="{{ route('intranet.auth.logout') }}" class="list-group-item">
                                <i class="demo-pli-unlock icon-lg icon-fw"></i> Salir
                            </a>
                        </div>
                    </div>

                    <ul id="mainnav-menu" class="list-group" style="margin-bottom: 120px;">
                        <li class="list-header">MENÚ</li>
                        <li class="{{ is_menu_active('intranet/inicio') }}">
                            <a href="{{ route('intranet.dashboard') }}">
                                <i class="ti-home"></i>
                                <span class="menu-title">Inicio</span>
                            </a>
                        </li>

                        <li class="treeview {{ is_parent_menu_active(['intranet/categorias', 'intranet/subcategorias', 'intranet/marcas', 'intranet/productos', 'intranet/calendario-de-productos', 'intranet/suscripciones',
                            'intranet/pedidos', 'intranet/laboratorios', 'intranet/aviso-legal-productos','intranet/precios-productos', 'intranet/planes-suscripcion', 'intranet/limite-productos-por-dia', 'intranet/suscripciones-activas']) }}">
                            <a href="#">
                                <i class="ti-shopping-cart"></i>
                                <span class="menu-title">Tienda</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                
                                @can('intranet.categories.index')
                                <li class="{{ is_menu_active('intranet/categorias') }}">
                                    <a href="{{ route('intranet.categories.index') }}">
                                        <span class="menu-title">Categorías</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.subcategories.index')
                                <li class="{{ is_menu_active('intranet/subcategorias') }}">
                                    <a href="{{ route('intranet.subcategories.index') }}">
                                        <span class="menu-title">Sub Categorías</span>
                                    </a>
                                </li>
                                @endcan
                                <li class="">
                                    <a href="/intranet/home">
                                        <span class="menu-title">Tag Home</span>
                                    </a>
                                </li>
                                @can('intranet.brands.index')
                                <li class="{{ is_menu_active('intranet/marcas') }}">
                                    <a href="{{ route('intranet.brands.index') }}">
                                        <span class="menu-title">Marcas</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.laboratories.index')
                                <li class="{{ is_menu_active('intranet/laboratorios') }}">
                                    <a href="{{ route('intranet.laboratories.index') }}">
                                        <span class="menu-title">Laboratorios</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.legal_warnings.index')
                                <li class="{{ is_menu_active('intranet/aviso-legal-productos') }}">
                                    <a href="{{ route('intranet.legal_warnings.index') }}">
                                        <span class="menu-title">Aviso Legal Productos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.subscription_plans.index')
                                <li class="{{ is_menu_active('intranet/planes-suscripcion') }}">
                                    <a href="{{ route('intranet.subscription_plans.index') }}">
                                        <span class="menu-title">Planes suscripción producto</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.product-schedules.index')
                                    <li class="{{ is_menu_active('intranet/calendario-de-productos') }}">
                                        <a href="{{ route('intranet.product-schedules.index') }}">
                                            <span class="menu-title">Calendario de Productos</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('limit-order-by-day.index')
                                    <li class="{{ is_menu_active('intranet/limite-productos-por-dia') }}">
                                        <a href="{{ route('intranet.limit-order-by-day.index') }}">
                                            <span class="menu-title">Limite de pedidos diarios</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.products.index')
                                <li class="{{ is_menu_active('intranet/productos') }}">
                                    <a href="{{ route('intranet.products.index') }}">
                                        <span class="menu-title">Productos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.prices.index')
                                <li class="{{ is_menu_active('intranet/precios-productos') }}">
                                    <a href="{{ route('intranet.prices.index') }}">
                                        <span class="menu-title">Precios Planes Productos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.orders.index')
                                <li class="{{ is_menu_active('intranet/pedidos') }}">
                                    <a href="{{ route('intranet.orders.index') }}">
                                        <span class="menu-title">Pedidos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.subscriptions.index')
                                <li class="{{ is_menu_active('intranet/suscripciones') }}">
                                    <a href="{{ route('intranet.subscriptions.index') }}">
                                        <span class="menu-title">Suscripciones</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.subscriptions.active')
                                <li class="{{ is_menu_active('intranet/suscripciones-activas') }}">
                                    <a href="{{ route('intranet.subscriptions.active') }}">
                                        <span class="menu-title">Suscripciones Activas</span>
                                    </a>
                                </li>
                                @endcan
                            </ul>
                        </li>

                        <li class="treeview {{ is_parent_menu_active(['intranet/banners', 'intranet/tipos-post-blog', 'intranet/post-blog', 'intranet/faq', 'intranet/configuraciones', 'intranet/paginas', 'intranet/linea-tiempo', 'intranet/categorias-faq',
                            'intranet/quienes-somos', 'intranet/telefono-contacto','intranet/valores', 'intranet/alianzas', 'intranet/bases-legales', 'intranet/costos-despachos', 'intranet/consumo-responsable', 'intranet/parametros-rango-entrega']) }}">
                            <a href="#">
                                <i class="ti-settings"></i>
                                <span class="menu-title">Conf. Sitio web</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                @can('intranet.banners.edit')
                                <li class="{{ is_menu_active('intranet/banners') }}">
                                    <a href="{{ route('intranet.banners.edit', 'slider-principal') }}">
                                        <span class="menu-title">Banners</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.post-types.index')
                                <li class="{{ is_menu_active('intranet/tipos-post-blog') }}">
                                    <a href="{{ route('intranet.post-types.index') }}">
                                        <span class="menu-title">Tipos de Post Blog</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.posts.index')
                                <li class="{{ is_menu_active('intranet/post-blog') }}">
                                    <a href="{{ route('intranet.posts.index') }}">
                                        <span class="menu-title">Post Blog</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.category_faqs.index')
                                <li class="{{ is_menu_active('intranet/categorias-faq') }}">
                                    <a href="{{ route('intranet.category_faqs.index') }}">
                                        <span class="menu-title">Categoría FAQ</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.faqs.index')
                                <li class="{{ is_menu_active('intranet/faq') }}">
                                    <a href="{{ route('intranet.faqs.index') }}">
                                        <span class="menu-title">FAQ</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.pages.index')
                                <li class="{{ is_menu_active('intranet/paginas') }}">
                                    <a href="{{ route('intranet.pages.index') }}">
                                        <span class="menu-title">Páginas</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.timelines.index')
                                <li class="{{ is_menu_active('intranet/linea-tiempo') }}">
                                    <a href="{{ route('intranet.timelines.index') }}">
                                        <span class="menu-title">Línea de Tiempo</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.abouts.index')
                                <li class="{{ is_menu_active('intranet/quienes-somos') }}">
                                    <a href="{{ route('intranet.abouts.index') }}">
                                        <span class="menu-title">Quienes Somos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.values.index')
                                <li class="{{ is_menu_active('intranet/valores') }}">
                                    <a href="{{ route('intranet.values.index') }}">
                                        <span class="menu-title">Valores Empresa</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.text_header.index')
                                <li class="{{ is_menu_active('intranet/texto-superior') }}">
                                    <a href="{{ route('intranet.text_header.index') }}">
                                        <span class="menu-title">Texto Superior</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.alliances.index')
                                <li class="{{ is_menu_active('intranet/alianzas') }}">
                                    <a href="{{ route('intranet.alliances.index') }}">
                                        <span class="menu-title">Alianzas</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.delivery_labels.index')
                                    <li class="{{ is_menu_active('intranet/textos-despacho') }}">
                                        <a href="{{ route('intranet.delivery_labels.index') }}">
                                            <span class="menu-title">Textos despacho</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.legal_bases.index')
                                <li class="{{ is_menu_active('intranet/bases-legales') }}">
                                    <a href="{{ route('intranet.legal_bases.index') }}">
                                        <span class="menu-title">Bases Legales</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.delivery_costs.index')
                                <li class="{{ is_menu_active('intranet/costos-despachos') }}">
                                    <a href="{{ route('intranet.delivery_costs.index') }}">
                                        <span class="menu-title">Costos Delivery</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.responsible_consumptions.index')
                                <li class="{{ is_menu_active('intranet/consumo-responsable') }}">
                                    <a href="{{ route('intranet.responsible_consumptions.index') }}">
                                        <span class="menu-title">Consumo Responsable</span>
                                    </a>
                                </li>
                                @endcan
                                @can('phone-contact.index')
                                    <li class="{{ is_menu_active('intranet/telefono-contacto') }}">
                                        <a href="{{ route('intranet.phone-contact.index') }}">
                                            <span class="menu-title">Numero de teléfono</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('product_schedule_settings.index')
                                    <li class="{{ is_menu_active('intranet/parametros-rango-entrega') }}">
                                        <a href="{{ route('intranet.product_schedule_settings.index') }}">
                                            <span class="menu-title">Parámetros rango entrega</span>
                                        </a>
                                    </li>
                                @endcan
                                <!--<li class="{{ is_menu_active('intranet/configuraciones') }}">
                                    <a href="{{ route('intranet.settings.index') }}">
                                        <span class="menu-title">Configuraciones Generales</span>
                                    </a>
                                </li>-->
                            </ul>
                        </li>

                    @can('intranet.day_payment.index')
                    <li class="treeview {{ is_parent_menu_active(['intranet/comision-pagos', 'intranet/dia-pago']) }}">
                        <a href="#">
                            <i class="ti-settings"></i>
                            <span class="menu-title">Facturación</span>
                            <i class="arrow"></i>
                        </a>
                        <!--Submenu-->
                        <ul class="collapse">
                            @can('intranet.payment_commissions.index')
                            <li class="{{ is_menu_active('intranet/comision-pagos') }}">
                                <a href="{{ route('intranet.payment_commissions.index') }}">
                                    <span class="menu-title">Porcentajes a Facturar</span>
                                </a>
                            </li>
                            @endcan
                            @can('intranet.day_payment.index')
                            <li class="{{ is_menu_active('intranet/dia-pago') }}">
                                <a href="{{ route('intranet.day_payment.index') }}">
                                    <span class="menu-title">Facturas Realizadas</span>
                                </a>
                            </li>
                            @endcan
                        </ul>
                    </li>
                    @endcan

                        @can('intranet.listado')
                        <li class="{{ is_menu_active('intranet/email') }}">
                            <a href="{{ route('intranet.listado') }}" target="_blank">
                                <i class="ti-email"></i>
                                <span class="menu-title">Newsletter Clientes</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.customers.index')
                        <li class="{{ is_menu_active('intranet/clientes') }}">
                            <a href="{{ route('intranet.customers.index') }}">
                                <i class="ti-user"></i>
                                <span class="menu-title">Listado Clientes</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.claims.index')
                        <li class="treeview {{ is_parent_menu_active(['intranet/tipos-contacto', 'intranet/contactos', 'intranet/campanas', 'intranet/reclamos', 'intranet/campos-anidados']) }}">
                            <a href="#">
                                <i class="ti-help"></i>
                                <span class="menu-title">Contacto / Reclamo</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                @can('intranet.campaigns.index')
                                <li class="{{ is_menu_active('intranet/campanas') }}">
                                    <a href="{{ route('intranet.campaigns.index') }}">
                                        <span class="menu-title">Campañas</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.contact_issues.index')
                                <li class="{{ is_menu_active('intranet/tipos-contacto') }}">
                                    <a href="{{ route('intranet.contact_issues.index') }}">
                                        <span class="menu-title">Tipos de Contacto</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.contacts.index')
                                <li class="{{ is_menu_active('intranet/contactos') }}">
                                    <a href="{{ route('intranet.contacts.index') }}">
                                        <span class="menu-title">Registro Contactos</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.claims.index')
                                <li class="{{ is_menu_active('intranet/reclamos') }}">
                                    <a href="{{ route('intranet.claims.index') }}">
                                        <span class="menu-title">Registro Reclamos</span>
                                    </a>
                                </li>

                                <li class="{{ is_menu_active('intranet/campos-anidados') }}">
                                    <a href="{{ route('intranet.nested-fields.index', ['section' => 'contacto']) }}">
                                        <span class="menu-title">Campos Anidados</span>
                                    </a>
                                </li>

                                @endcan
                            </ul>
                        </li>
                        @endcan

                        @can('intranet.discount_code.index')
                        <li class="{{ is_menu_active('intranet/codigo-descuento') }}">
                            <a href="{{ route('intranet.discount_code.index') }}">
                                <i class="fa fa-cart-plus"></i>
                                <span class="menu-title">Códigos de descuento</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.free_dispatch_products.index')
                        <li class="{{ is_menu_active('intranet/productos-despacho-gratuito') }}">
                            <a href="{{ route('intranet.free_dispatch_products.index') }}">
                                <i class="fa fa-cart-plus"></i>
                                <span class="menu-title">Productos Despacho Gratuito</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.roles.index')
                        <li class="{{ is_menu_active('intranet/roles') }}">
                            <a href="{{ route('intranet.roles.index') }}">
                                <i class="ti-key"></i>
                                <span class="menu-title">Roles de Usuario</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.users.index')
                        <li class="{{ is_menu_active('intranet/usuarios') }}">
                            <a href="{{ route('intranet.users.index') }}">
                                <i class="ti-user"></i>
                                <span class="menu-title">Usuarios</span>
                            </a>
                        </li>
                        @endcan

                    </ul>

                </div>
            </div>
        </div>
        <!--================================-->
        <!--End menu-->

    </div>
</nav>
