import React from 'react';
import Icon from "../../../components/Icon";
import boxWhite from "../../../assets/images/icons/header/box-white.svg"
import phoneWhite from "../../../assets/images/icons/header/phone-white.svg"
import emailWhite from "../../../assets/images/icons/header/email-white.svg"
import HeaderTopLink from "../../components/HeaderTopLink";

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
                            <HeaderTopLink text={`Blog`}/>
                            <HeaderTopLink text={`Sobre nosotros`}/>
                            <HeaderTopLink text={`Contacto`}/>
                            <HeaderTopLink text={`FAQ`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HeaderTop
