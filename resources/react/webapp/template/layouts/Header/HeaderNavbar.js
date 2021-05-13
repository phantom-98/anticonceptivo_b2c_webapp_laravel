import React, { useState, useEffect } from 'react';
// import pastillas from '../../../assets/images/icons/navbar/pastillas.svg'
// import masculino from '../../../assets/images/icons/navbar/masculino.svg'
// import testEmbarazo from '../../../assets/images/icons/navbar/test-embarazo.svg'
// import emergencia from '../../../assets/images/icons/navbar/emergencia.svg'
// import jeringa from '../../../assets/images/icons/navbar/jeringa.svg'
// import anticonceptivo from '../../../assets/images/icons/navbar/anticonceptivo.svg'
// import femenino from '../../../assets/images/icons/navbar/femenino.svg'
import HeaderNavbarItem from "../../components/HeaderNavbarItem";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import * as Services from "../../../Services";

const HeaderNavbar = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    },[])

    const getCategories = () => {
        let url = Services. ENDPOINT.NO_AUTH.HOME.GET_CATEGORY;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCategories(response.data.categories);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="header-navbar bg-0869A6">
            <div className="container">
                <div className="row">
                    {
                        categories.map(category => {
                            let url = PUBLIC_ROUTES.SHOP.path;
                            url = url.replace(":category", category.slug);
                            return(
                                <HeaderNavbarItem linkTo={url} icon={category.image} text={category.name} key={category.id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderNavbar
