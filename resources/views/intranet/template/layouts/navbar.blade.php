<header id="navbar">
    <div id="navbar-container" class="boxed">

        <!--Brand logo & name-->
        <!--================================-->
        <div class="navbar-header">
            <a href="{{ route('intranet.dashboard') }}" class="navbar-brand" style="background-color:white; display:flex">
                <img src="/images/logo-full.svg?b3b8df2099e0585f16d824394e200f52" alt="Anticonceptivo" class="brand-icon" style="margin:auto; padding-top: 3px; max-width: 75%">
            </a>
        </div>
        <!--================================-->
        <!--End brand logo & name-->


        <!--Navbar Dropdown-->
        <!--================================-->
        <div class="navbar-content">
            <ul class="nav navbar-top-links">

                <!--Navigation toggle button-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <li class="tgl-menu-btn">
                    <a class="mainnav-toggle" href="#">
                        <i class="demo-pli-list-view"></i>
                    </a>
                </li>
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--End Navigation toggle button-->


                <!--Search-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--End Search-->

            </ul>
            <ul class="nav navbar-top-links">

                @if(count(get_suscriptions_tomorrow()) > 0)
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                        <i class="demo-pli-bell"></i>
                        <span class="badge badge-header badge-danger">{{ count(get_suscriptions_tomorrow()) }}</span>
                    </a>


                    <!--Notification dropdown menu-->
                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">
                        <div class="nano scrollable has-scrollbar" style="height: 0px;">
                            <div class="nano-content" tabindex="0" style="right: -17px;">
                                <ul class="head-list">
                                    @foreach(get_suscriptions_tomorrow() as $subscriptions)
                                    <li>
                                        <a class="media" href="{{ route('intranet.subscriptions.index_filter',[$subscriptions->subscription_id] ) }}">
                                            <div class="media-left">
                                                <i class="ti-flag icon-2x"></i>
                                            </div>
                                            <div class="media-body">
                                                <p class="mar-no text-nowrap text-main text-semibold">Suscripción #{{ $subscriptions->subscription_id }} F. PAGO {{ date('d-m', strtotime($subscriptions->pay_date)) }}</p>
                                                @forelse ($subscriptions->order_parent->order_items as $item)
                                                    @if($item->product->stock >= 2)
                                                    <small style="color:#8bc34a">
                                                        {{ $item->quantity }}x{{ $item->product->name }}
                                                    </small>
                                                    <br/>
                                                    @else 
                                                    <small style="color:#f44336">
                                                        {{ $item->quantity }}x{{ $item->product->name }}
                                                    </small>
                                                    <br/>
                                                    @endif
                                                @empty
                                                    -
                                                @endforelse
                                            </div>
                                        </a>
                                    </li>
                                    @endforeach
                                </ul>
                            </div>
                            <div class="nano-pane" style="display: none;">
                                <div class="nano-slider" style="height: 20px; transform: translate(0px, 0px);">
                                </div>
                            </div>
                        </div>

                        <!--Dropdown footer-->
                        <div class="pad-all bord-top">
                            <a href="{{ route('intranet.subscriptions.index')}}" class="btn-link text-main box-block">
                                <i class="pci-chevron chevron-right pull-right"></i>Ver todas las suscripciones
                            </a>
                        </div>
                    </div>
                </li>
                @endif

                <li id="dropdown-user" class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
                                <span class="ic-user pull-right">
                                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                                    <!--You can use an image instead of an icon.-->
                                    <!--<img class="img-circle img-user media-object" src="img/profile-photos/1.png" alt="Profile Picture">-->
                                    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                                    <i class="demo-pli-male"></i>
                                </span>
                        <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                        <!--You can also display a user name in the navbar.-->
                        <!--<div class="username hidden-xs">Aaron Chavez</div>-->
                        <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                    </a>


                    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                        <ul class="head-list">
                            <li>
                                {{-- <a href="{{ route('intranet.profile.editProfile') }}"><i class="demo-pli-male icon-lg icon-fw"></i> Perfil</a> --}}
                            </li>
                            {{--<li>--}}
                            {{--<a href="#"><span class="badge badge-danger pull-right">9</span><i class="demo-pli-mail icon-lg icon-fw"></i> Messages</a>--}}
                            {{--</li>--}}
                            {{--<li>--}}
                            {{--<a href="#"><span class="label label-success pull-right">New</span><i class="demo-pli-gear icon-lg icon-fw"></i> Settings</a>--}}
                            {{--</li>--}}
                            {{--<li>--}}
                            {{--<a href="#"><i class="demo-pli-computer-secure icon-lg icon-fw"></i> Lock screen</a>--}}
                            {{--</li>--}}
                            <li>
                                <a href="{{ route('intranet.auth.logout') }}"><i
                                        class="demo-pli-unlock icon-lg icon-fw"></i> Salir</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--End user dropdown-->

            </ul>
        </div>

    </div>
</header>
