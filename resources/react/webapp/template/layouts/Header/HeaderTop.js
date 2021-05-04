import React from 'react';
import Icon from "../../../components/general/Icon";
import boxWhite from "../../../assets/images/icons/header/box-white.svg"
import phoneWhite from "../../../assets/images/icons/header/phone-white.svg"
import emailWhite from "../../../assets/images/icons/header/email-white.svg"
import HeaderTopLink from "../../components/HeaderTopLink";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const HeaderTop = () => {

    return (
        <div className="top-header bg-033F5D">
            <div className="container">
                <div className="row">
                    <div className="col-md-auto top-do-flex">
                        <div className="my-auto">
                            <Icon path={boxWhite}/> Máximo 12 días hábiles en despachos
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="row justify-content-end">
                            <HeaderTopLink icon={phoneWhite} text={`+56 9 2344 8723`}/>
                            <HeaderTopLink icon={emailWhite} text={`Hola@anticonceptivos.cl`}/>
                            <HeaderTopLink text={`Blog`} linkTo={PUBLIC_ROUTES.BLOG.path}/>
                            <HeaderTopLink text={`Sobre nosotros`} linkTo={PUBLIC_ROUTES.ABOUT_US.path}/>
                            <HeaderTopLink text={`Contacto`} linkTo={PUBLIC_ROUTES.CONTACT_US.path}/>
                            <HeaderTopLink text={`FAQ`} linkTo={PUBLIC_ROUTES.FAQ.path}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HeaderTop
