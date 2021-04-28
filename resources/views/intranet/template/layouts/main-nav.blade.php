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

                        <li class="treeview {{ is_parent_menu_active(['intranet/idiomas', 'intranet/areas' , 'intranet/habilidades', 'intranet/paginas',
                                                                    'intranet/categorias-paso-a-paso', 'intranet/paso-a-paso']) }}">
                            <a href="#">
                                <i class="ti-settings"></i>
                                <span class="menu-title">Configuraciones</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                @can('intranet.languages.index')
                                    <li class="{{ is_menu_active('intranet/idiomas') }}">
                                        <a href="{{ route('intranet.languages.index') }}">
                                            <span class="menu-title">Idiomas</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.areas.index')
                                    <li class="{{ is_menu_active('intranet/areas') }}">
                                        <a href="{{ route('intranet.areas.index') }}">
                                            <span class="menu-title">Areas</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.skills.index')
                                <li class="{{ is_menu_active('intranet/habilidades') }}">
                                    <a href="{{ route('intranet.skills.index') }}">
                                        <span class="menu-title">Habilidades</span>
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
                                @can('intranet.frontcomponentcategories.index')
                                <li class="{{ is_menu_active('intranet/categorias-paso-a-paso') }}">
                                    <a href="{{ route('intranet.frontcomponentcategories.index') }}">
                                        <span class="menu-title">Categorías Paso a Paso</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.frontcomponents.index')
                                <li class="{{ is_menu_active('intranet/paso-a-paso') }}">
                                    <a href="{{ route('intranet.frontcomponents.index') }}">
                                        <span class="menu-title">Paso a Paso</span>
                                    </a>
                                </li>
                                @endcan
                                @can('intranet.companies.getTopFiveCompanies')
                                <li class="{{ is_menu_active('intranet/companias/top-five-companies') }}">
                                    <a href="{{ route('intranet.companies.getTopFiveCompanies') }}">
                                        <span class="menu-title">Top 5 Compañías</span>
                                    </a>
                                </li>
                                @endcan
                            </ul>
                        </li>

                        <li class="treeview {{ is_parent_menu_active(['intranet/companias', 'intranet/profesionales', 'intranet/solicitudes-de-trabajo', 'intranet/solicitudes-de-pagos-pendientes', 'intranet/solicitudes-de-pagos', 'intranet/facturas', 'intranet/facturas-pendientes']) }}">
                            <a href="#">
                                <i class="ti-eye"></i>
                                <span class="menu-title">Gestión</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                @can('intranet.companies.index')
                                    <li class="{{ is_menu_active('intranet/companias') }}">
                                        <a href="{{ route('intranet.companies.index') }}">
                                            <span class="menu-title">Compañías</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.professionals.index')
                                    <li class="{{ is_menu_active('intranet/profesionales') }}">
                                        <a href="{{ route('intranet.professionals.index') }}">
                                            <span class="menu-title">Profesionales</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.orders.index')
                                    <li class="{{ is_menu_active('intranet/solicitudes-de-trabajo') }}">
                                        <a href="{{ route('intranet.orders.index') }}">
                                            <span class="menu-title">Solicitudes de trabajo</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.liquidations_pending.index')
                                    <li class="{{ is_menu_active('intranet/solicitudes-de-pagos-pendientes') }}">
                                        <a href="{{ route('intranet.liquidations_pending.index') }}">
                                            <span class="menu-title">Solicitudes de Pago Pendientes</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.liquidations.index')
                                    <li class="{{ is_menu_active('intranet/solicitudes-de-pagos') }}">
                                        <a href="{{ route('intranet.liquidations.index') }}">
                                            <span class="menu-title">Solicitudes de Pago Realizadas</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.bills.index')
                                    <li class="{{ is_menu_active('intranet/facturas-pendientes') }}">
                                        <a href="{{ route('intranet.bills.index') }}">
                                            <span class="menu-title">Facturas Pendientes</span>
                                        </a>
                                    </li>
                                @endcan
                                @can('intranet.bills.isBill')
                                <li class="{{ is_menu_active('intranet/facturas') }}">
                                    <a href="{{ route('intranet.bills.isBill') }}">
                                        <span class="menu-title">Facturas Realizadas</span>
                                    </a>
                                </li>
                            @endcan

                            </ul>
                        </li>

                       
                        @can('intranet.listado.companies')
                        <li class="{{ is_menu_active('intranet/email') }}">
                            <a href="{{ route('intranet.listado') }}" target="_blank">
                                <i class="ti-email"></i>
                                <span class="menu-title">Newsletter Compañías</span>
                            </a>
                        </li>
                        @endcan

                        @can('intranet.listado.professional')
                        <li class="{{ is_menu_active('intranet/email-professional') }}">
                            <a href="{{ route('intranet.listado-professional') }}" target="_blank">
                                <i class="ti-email"></i>
                                <span class="menu-title">Newsletter Profesionales</span>
                            </a>
                        </li>
                        @endcan
                       

                        @can('intranet.settings.index')
                        <li class="{{ is_menu_active('intranet/configuraciones') }}">
                            <a href="{{ route('intranet.settings.index') }}">
                                <i class="ti-settings"></i>
                                <span class="menu-title">Configuraciones Generales</span>
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
