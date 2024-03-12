import React, { useState, useEffect, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ModalAuthMode } from "../../../../Globals";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import { AppContext } from "../../../../context/AppProvider";

import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import PRIVATE_ROUTES from "../../../../routes/privateRoutes";

import CategoryMenuMobile from "./CategoryMenuMobile";
import SearchModal from "./SearchModal";
import Search from "./Search";

import * as Services from "../../../../Services";
import "react-lazy-load-image-component/src/effects/blur.css";

import OffCanvas from "../../../../components/OffCanvas";
import TotalCartItems from "../../../../components/shopping/TotalCartItems";

import menu from "../../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../../assets/images/logo_responsive.png";
import cartBlue from "../../../../assets/images/icons/header/cart-blue.svg";
import userBlue from "../../../../assets/images/icons/header/user-blue.svg";
import OurBrands from "../../../../pages/public/Home/OurBrands";
import OurBrandsMobile from "./OurBrandsMobile";

const Mobile = () => {
    const { auth } = useContext(AuthContext);
    const { showModalAuth } = useContext(AppContext);
    const [showingMenu, setShowingMenu] = useState(null);

    const showMenu = () => {
        setShowingMenu(true);
    };

    const hideMenu = () => {
        setShowingMenu(false);
    };

    const [textHeader, setTextHeader] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER;
        Services.DoGet(url, {})
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setTextHeader(response.data.tex_header);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    let url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(":section", "informacion-personal");

    return (
        <>
            <div className="d-block">
                <div className="menu-mobile">
                    <div className="row first-row">
                        <div className="col-auto font-poppins font-12 text-center">
                            <OurBrandsMobile />
                        </div>
                    </div>
                    <div className="row mx-2" style={{ height: "70px" }}>
                        <div
                            className="col d-flex"
                            style={{ justifyContent: "center" }}
                        >
                            <div
                                className="my-auto text-center"
                                onClick={showMenu}
                            >
                                <LazyLoadImage
                                    alt="anticonceptivo.cl"
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={menu}
                                    height={"25px"}
                                    width={"25px"}
                                />
                                <div className="text-icon-navbar-mobile">
                                    PRODUCTOS
                                </div>
                            </div>
                        </div>

                        <div
                            className="col d-flex"
                            style={{ justifyContent: "center" }}
                        >
                            {auth ? (
                                <Link className="my-auto text-center" to={url}>
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        src={userBlue}
                                        height={"25px"}
                                        width={"25px"}
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        CUENTA
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="my-auto text-center"
                                    onClick={() =>
                                        showModalAuth(ModalAuthMode.LOGIN)
                                    }
                                >
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        src={userBlue}
                                        height={"25px"}
                                        width={"25px"}
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        CUENTA
                                    </div>
                                </div>
                            )}
                        </div>

                        <div
                            className="col d-flex"
                            style={{ justifyContent: "center" }}
                        >
                            <div className="my-auto text-center">
                                <Link to={PUBLIC_ROUTES.CART.path}>
                                    <div className="cart-badge-quantity">
                                        <TotalCartItems />
                                    </div>
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        height={"25px"}
                                        width={"25px"}
                                        src={cartBlue}
                                    />
                                </Link>
                                <div className="text-icon-navbar-mobile">
                                    CARRO
                                </div>
                            </div>
                        </div>
                    </div>

                    <Search />
                </div>
            </div>

            <div className="d-block">
                <OffCanvas showCanvas={showingMenu} closeCanvas={hideMenu}>
                    <div className="row menu-mobile-issue">
                        <CategoryMenuMobile hideMenu={hideMenu} />
                    </div>
                </OffCanvas>
            </div>
        </>
    );
};

export default Mobile;
