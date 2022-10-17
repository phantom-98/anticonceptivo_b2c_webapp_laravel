import React, {useState, useEffect} from 'react';
import phoneWhite from "../../../../assets/images/icons/header/phone-white.svg"
import emailWhite from "../../../../assets/images/icons/header/email-white.svg"
import HeaderTopLink from "../../../components/HeaderTopLink";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import * as Services from "../../../../Services";

const HeaderTop = () => {

    const [textHeader, setTextHeader] = useState(null);
    const [phoneContact, setPhoneContact] = useState(null);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTextHeader(response.data.tex_header);
                    setPhoneContact(response.data.phone_contact);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="top-header bg-033F5D">
            <div className="row mx-2">
                <div className="col-md-auto py-2">
                    <div className="my-auto">
                        {
                            textHeader && textHeader.link ?
                                <a href={textHeader.link } target="_blank" className="text-white">
                                    {textHeader ? textHeader.text : ''}
                                </a>
                            : textHeader ? textHeader.text : ''
                        }
                    </div>
                </div>
                <div className="col-md">
                    <div className="row justify-content-end">
                        <HeaderTopLink icon={phoneWhite} flag={true} email={false} linkTo={"tel:"+String(phoneContact).replace(/\D/g, "")} text={phoneContact}/>
                        <HeaderTopLink icon={emailWhite} flag={true} email={true} linkTo={"mailto:contacto@anticonceptivo.cl"} text={`contacto@anticonceptivo.cl`}/>
                        <HeaderTopLink text={`Blog`} linkTo={PUBLIC_ROUTES.BLOG.path}/>
                        <HeaderTopLink text={`Sobre nosotros`} linkTo={PUBLIC_ROUTES.ABOUT_US.path}/>
                        <HeaderTopLink text={`Contacto`} linkTo={PUBLIC_ROUTES.CONTACT_US.path}/>
                        <HeaderTopLink text={`FAQ`} linkTo={PUBLIC_ROUTES.FAQ.path}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HeaderTop
