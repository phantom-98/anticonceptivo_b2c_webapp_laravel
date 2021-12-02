import React, {useState, useEffect} from 'react';
import Icon from "../../../components/general/Icon";
import boxWhite from "../../../assets/images/icons/header/box-white.svg"
import phoneWhite from "../../../assets/images/icons/header/phone-white.svg"
import emailWhite from "../../../assets/images/icons/header/email-white.svg"
import HeaderTopLink from "../../components/HeaderTopLink";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import * as Services from "../../../Services";
import HeaderDropDown from "../../components/HeaderDropDown";

const HeaderTop = () => {

    const [postTypes, setPostTypes] = useState([]);

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
                    setPostTypes(response.data.post_types);
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
                        <marquee loop='10'> <Icon path={boxWhite}/> Despacho inmediato solo en RM de lunes a sábado de 10:00 - 19:00 hrs</marquee>
                    </div>
                </div>
                <div className="col-md">
                    <div className="row justify-content-end">
                        <HeaderTopLink icon={phoneWhite} flag={true} email={false} linkTo={"tel:232451883"} text={`(2) 3245 1883`}/>
                        <HeaderTopLink icon={emailWhite} flag={true} email={true} linkTo={"mailto:contacto@anticonceptivo.cl"} text={`contacto@anticonceptivo.cl`}/>
                        {/*<HeaderDropDown postTypes={postTypes} />*/}
                        {/*<HeaderTopLink text={`Historía de los anticonceptivos`} linkTo={PUBLIC_ROUTES.HISTORY.path}/>*/}
                        {/*<HeaderTopLink text={`Blog`} linkTo={PUBLIC_ROUTES.BLOG.path}/>*/}
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
