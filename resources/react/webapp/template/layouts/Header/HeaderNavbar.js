import React, { useState, useEffect, Fragment } from 'react';
// import pastillas from '../../../assets/images/icons/navbar/pastillas.svg'
// import masculino from '../../../assets/images/icons/navbar/masculino.svg'
// import testEmbarazo from '../../../assets/images/icons/navbar/test-embarazo.svg'
// import emergencia from '../../../assets/images/icons/navbar/emergencia.svg'
// import jeringa from '../../../assets/images/icons/navbar/jeringa.svg'
// import anticonceptivo from '../../../assets/images/icons/navbar/anticonceptivo.svg'
// import femenino from '../../../assets/images/icons/navbar/femenino.svg'
import HeaderNavbarItem from "../../components/HeaderNavbarItem";
import {Dropdown} from 'react-bootstrap'
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import * as Services from "../../../Services";
import { v4 as uuidv4 } from 'uuid';

const HeaderNavbar = () => {

    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);

    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

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

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div className="pointer" ref={ref} onClick={(e)=> { e.preventDefault(); onClick(e); }}>
            {children}
        </div>
    ));

    return (
        <div className="header-navbar bg-0869A6">
            <div className="container">
                <div className="row">
                    {
                        categories.map(category => {
                            let url = PUBLIC_ROUTES.SHOP.path;
                            url = url.replace(":category", category.slug);
                            return(
                                <Dropdown key={uuidv4()}
                                    show={show}
                                    onMouseEnter={showDropdown} 
                                    onMouseLeave={hideDropdown}
                                >
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        <HeaderNavbarItem linkTo={url} icon={category.image} text={category.name}/>
                                    </Dropdown.Toggle>
                                    {
                                        category.subcategories.length ? 
                                            <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                                                {
                                                    category.subcategories.map((subCategory) => {
                                                        let childUrl = PUBLIC_ROUTES.SHOP.path;
                                                        url = url.replace(":category", subCategory.slug);
                                                        return(
                                                            <Dropdown.Item key={uuidv4()}>
                                                                <HeaderNavbarItem linkTo={childUrl} icon={subCategory.image} text={subCategory.name}/>
                                                            </Dropdown.Item>
                                                        )
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        : null
                                    }
                                </Dropdown>                                    
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderNavbar
