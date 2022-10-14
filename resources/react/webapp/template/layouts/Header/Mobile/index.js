import React, {useState, useEffect, useContext} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ModalAuthMode } from "../../../../Globals";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import { AppContext } from "../../../../context/AppProvider";

import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import PRIVATE_ROUTES from "../../../../routes/privateRoutes";

import CategoryMenuMobile from "./CategoryMenuMobile";
import SearchModal from "./SearchModal";

import * as Services from "../../../../Services";
import 'react-lazy-load-image-component/src/effects/blur.css';

import OffCanvas from "../../../../components/OffCanvas";
import TotalCartItems from "../../../../components/shopping/TotalCartItems";

import menu from "../../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../../assets/images/logo_responsive.png";
import cartBlue from "../../../../assets/images/icons/header/cart-blue.svg";
import userBlue from "../../../../assets/images/icons/header/user-blue.svg";
import search from "../../../../assets/images/icons/header/search-blue.svg";

const Mobile = () => {
    const { auth } = useContext(AuthContext)
    const { showModalAuth } = useContext(AppContext);

    const [showingMenu, setShowingMenu] = useState(null);
    const showMenu = () => setShowingMenu(true);
    const hideMenu = () => setShowingMenu(false);

    const [showingSearch, setShowingSearch] = useState(false);
    const showSearch = () => setShowingSearch(true);
    const hideSearch = () => setShowingSearch(false);

    const [textHeader, setTextHeader] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER;
        Services.DoGet(url,{}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTextHeader(response.data.tex_header);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    let url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(':section', 'informacion-personal')

    return(
        <>
            <div className="d-block">
                <div className="menu-mobile">
                    <div className="row first-row">
                        <div className="col-auto font-poppins font-12 text-center">
                            <div className="row no-gutters" style={{marginTop: '10px', height: '28px'}}>
                                {
                                    textHeader && textHeader.link ?

                                        <a href={textHeader.link } target="_blank" className="text-white">
                                            {textHeader ? textHeader.text : ''}
                                        </a>
                                        :
                                        textHeader ? textHeader.text : ''

                                }
                            </div>
                        </div>
                    </div>

                    <div className="row mx-2" style={{height: '70px'}}>
                        <div className="col d-flex" style={{justifyContent: 'center'}}>
                            <div className="my-auto text-center" onClick={showMenu}>
                                <LazyLoadImage
                                    alt="anticonceptivo.cl"
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={menu}
                                    height={'25px'}
                                    width={'25px'}
                                />
                                <div className="text-icon-navbar-mobile">
                                    PRODUCTOS
                                </div>
                            </div>
                        </div>

                        <div className="col d-flex" style={{justifyContent: 'center'}}>
                            <div className="my-auto text-center" onClick={showSearch}>
                                <LazyLoadImage
                                    alt="anticonceptivo.cl"
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={search}
                                    height={'25px'}
                                    width={'25px'}
                                />
                                <div className="text-icon-navbar-mobile">
                                    BUSCAR
                                </div>
                            </div>
                        </div>

                        <div className="col d-flex" style={{justifyContent: 'center', padding: '0 30px'}}>
                            <div className="m-auto">
                                <Link to="/">
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        src={anticonceptivo}
                                        height={'100%'}
                                        width={'auto'}
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="col d-flex" style={{justifyContent: 'center'}}>

                            {
                                auth ?
                                    <Link className="my-auto text-center" to={url}>
                                        <LazyLoadImage
                                            alt="anticonceptivo.cl"
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            effect="blur"
                                            src={userBlue}
                                            height={'25px'}
                                            width={'25px'}
                                        />
                                        <div className="text-icon-navbar-mobile">
                                            CUENTA
                                        </div>
                                    </Link>
                                    :

                                    <div className="my-auto text-center"
                                            onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                        <LazyLoadImage
                                            alt="anticonceptivo.cl"
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            effect="blur"
                                            src={userBlue}
                                            height={'25px'}
                                            width={'25px'}
                                        />
                                        <div className="text-icon-navbar-mobile">
                                            CUENTA
                                        </div>
                                    </div>
                            }


                        </div>

                        <div className="col d-flex" style={{justifyContent: 'center'}}>
                            <div className="my-auto text-center">
                                <Link to={PUBLIC_ROUTES.CART.path}>
                                    <div className="cart-badge-quantity"><TotalCartItems/></div>
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        height={'25px'}
                                        width={'25px'}
                                        src={cartBlue}
                                    />
                                </Link>
                                <div className="text-icon-navbar-mobile">
                                    CARRO
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="d-block">
                <OffCanvas showCanvas={showingMenu} closeCanvas={hideMenu}>
                    <div className="row menu-mobile-issue">
                        <CategoryMenuMobile
                            hideMenu={hideMenu}
                        />
                    </div>
                </OffCanvas>
            </div>

            <div className="d-block">
                <SearchModal
                    showingSearch={showingSearch}
                    hideSearch={hideSearch}
                />
            </div>
        </>
    )
}

export default Mobile;
