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

                        <li class="treeview {{ is_parent_menu_active(['intranet/categorias', 'intranet/subcategorias', 'intranet/marcas']) }}">
                            <a href="#">
                                <i class="ti-shopping-cart"></i>
                                <span class="menu-title">Pedidos</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                <li class="{{ is_menu_active('intranet/categorias') }}">
                                    <a href="{{ route('intranet.categories.index') }}">
                                        <span class="menu-title">Categorías</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/subcategorias') }}">
                                    <a href="{{ route('intranet.subcategories.index') }}">
                                        <span class="menu-title">Sub Categorías</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/marcas') }}">
                                    <a href="{{ route('intranet.brands.index') }}">
                                        <span class="menu-title">Marcas</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        
                        <li class="treeview {{ is_parent_menu_active(['intranet/banners', 'intranet/tipos-post-blog', 'intranet/post-blog', 'intranet/faq', 'intranet/configuraciones']) }}">
                            <a href="#">
                                <i class="ti-settings"></i>
                                <span class="menu-title">Conf. Sitio web</span>
                                <i class="arrow"></i>
                            </a>
                            <!--Submenu-->
                            <ul class="collapse">
                                <li class="{{ is_menu_active('intranet/banners') }}">
                                    <a href="{{ route('intranet.banners.index') }}">
                                        <span class="menu-title">Banners</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/tipos-post-blog') }}">
                                    <a href="{{ route('intranet.post_types.index') }}">
                                        <span class="menu-title">Tipos de Post Blog</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/post-blog') }}">
                                    <a href="{{ route('intranet.posts.index') }}">
                                        <span class="menu-title">Post Blog</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/faq') }}">
                                    <a href="{{ route('intranet.faqs.index') }}">
                                        <span class="menu-title">FAQ</span>
                                    </a>
                                </li>
                                <li class="{{ is_menu_active('intranet/configuraciones') }}">
                                    <a href="{{ route('intranet.settings.index') }}">
                                        <span class="menu-title">Configuraciones Generales</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="{{ is_menu_active('intranet/email') }}">
                            <a href="{{ route('intranet.listado') }}" target="_blank">
                                <i class="ti-email"></i>
                                <span class="menu-title">Newsletter Clientes</span>
                            </a>
                        </li>

                        <li class="{{ is_menu_active('intranet/clientes') }}">
                            <a href="{{ route('intranet.listado') }}" target="_blank">
                                <i class="ti-user"></i>
                                <span class="menu-title">Listado Clientes</span>
                            </a>
                        </li>

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
