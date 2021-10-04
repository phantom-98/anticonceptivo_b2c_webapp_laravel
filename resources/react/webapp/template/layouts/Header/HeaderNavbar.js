import React, {useState, useEffect} from 'react';
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
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import PillsDropDown from "../../components/PillsDropDown";

const HeaderNavbar = () => {
    const size = useWindowSize();
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState({});
    const [laboratories, setLaboratories] = useState([]);
    const [formats, setFormats] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const showDropdown = (categoryId) => {
        let listShow = {}
        Object.keys(show).map((key, index) => (listShow = {...listShow, [key]: key == categoryId ? true : false}))
        setShow(listShow);
    }
    const hideDropdown = (categoryId) => {
        setShow({...show, [categoryId]: false});
    }

    useEffect(() => {
        getResources();
    }, [])

    const getResources = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER_MENU;

        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    let list = [];
                    let listShow = {};
                    response.data.categories.map((category) => {
                        let categoryId = uuidv4();
                        list = [...list, {...category, ["categoryId"]: categoryId}]
                        listShow = {...listShow, [categoryId]: false}
                    })
                    setLaboratories(response.data.laboratories);
                    setFormats(Object.values(response.data.formats));
                    setSubscriptions(response.data.subscriptions);
                    setCategories(list);
                    setShow(listShow);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div className="pointer" ref={ref}
            // onMouseEnter={(e)=> {
            //     e.preventDefault();
            //     onClick(e);
            // }}
            // onMouseLeave={(e)=> {
            //     e.preventDefault();
            //     onClick(e);
            // }}
        >
            {children}
        </div>
    ));

    return (
        <div className="header-navbar bg-0869A6">
            <div className="container px-0 max-header-navbar">
                <div>

                    <div className="row justify-content-center">

                        {

                            categories.map((category, index) => {
                                let url = PUBLIC_ROUTES.SHOP.path;
                                url = url.replace(":category", category.slug);

                                if (size.width <= 1351 && index <= 3) {
                                    return (

                                        <Dropdown key={category.categoryId}
                                                  show={show[category.categoryId]}
                                                  onMouseEnter={() => showDropdown(category.categoryId)}
                                                  onMouseLeave={() => hideDropdown(category.categoryId)}
                                                  drop={'down'}
                                        >
                                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <HeaderNavbarItem
                                                    linkTo={url}
                                                    icon={category.public_image}
                                                    text={category.name}
                                                />
                                            </Dropdown.Toggle>

                                            {
                                                // category.subcategories.length ?
                                                category.id === 1 ?
                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom with-pills">
                                                        {/* <Dropdown.Item key={uuidv4()} style={{cursor:'default'}}>
                                                    <PillsDropDown
                                                        laboratories={laboratories}
                                                        formats={formats}
                                                        subscriptions={subscriptions}
                                                        categorySlug={category.slug}
                                                    />
                                                </Dropdown.Item> */}
                                                        <div className="custom-dropdown-item" style={{cursor: 'default'}}>
                                                            <PillsDropDown
                                                                laboratories={laboratories}
                                                                formats={formats}
                                                                subscriptions={subscriptions}
                                                                categorySlug={category.slug}
                                                            />
                                                        </div>
                                                    </Dropdown.Menu>
                                                    :

                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                                                        {
                                                            category.subcategories.map((subCategory) => {
                                                                let childUrl = PUBLIC_ROUTES.SHOP_SUBCATEGORY.path;
                                                                childUrl = childUrl.replace(":category?", category.slug);
                                                                childUrl = childUrl.replace(":subcategory?", subCategory.slug);
                                                                return (
                                                                    <Dropdown.Item key={uuidv4()}>
                                                                        <Link to={childUrl}
                                                                              style={{textDecoration: 'none'}}>
                                                                        <span
                                                                            className="header-navbar-subitem">{subCategory.name}</span>
                                                                        </Link>
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                // : null
                                            }
                                        </Dropdown>

                                    )
                                }else if(size.width > 1351){
                                    return (

                                        <Dropdown key={category.categoryId}
                                                  show={show[category.categoryId]}
                                                  onMouseEnter={() => showDropdown(category.categoryId)}
                                                  onMouseLeave={() => hideDropdown(category.categoryId)}
                                                  drop={'down'}
                                        >
                                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <HeaderNavbarItem
                                                    linkTo={url}
                                                    icon={category.public_image}
                                                    text={category.name}
                                                />
                                            </Dropdown.Toggle>

                                            {
                                                // category.subcategories.length ?
                                                category.id === 1 ?
                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom with-pills">
                                                        {/* <Dropdown.Item key={uuidv4()} style={{cursor:'default'}}>
                                                    <PillsDropDown
                                                        laboratories={laboratories}
                                                        formats={formats}
                                                        subscriptions={subscriptions}
                                                        categorySlug={category.slug}
                                                    />
                                                </Dropdown.Item> */}
                                                        <div className="custom-dropdown-item" style={{cursor: 'default'}}>
                                                            <PillsDropDown
                                                                laboratories={laboratories}
                                                                formats={formats}
                                                                subscriptions={subscriptions}
                                                                categorySlug={category.slug}
                                                            />
                                                        </div>
                                                    </Dropdown.Menu>
                                                    :

                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                                                        {
                                                            category.subcategories.map((subCategory) => {
                                                                let childUrl = PUBLIC_ROUTES.SHOP_SUBCATEGORY.path;
                                                                childUrl = childUrl.replace(":category?", category.slug);
                                                                childUrl = childUrl.replace(":subcategory?", subCategory.slug);
                                                                return (
                                                                    <Dropdown.Item key={uuidv4()}>
                                                                        <Link to={childUrl}
                                                                              style={{textDecoration: 'none'}}>
                                                                        <span
                                                                            className="header-navbar-subitem">{subCategory.name}</span>
                                                                        </Link>
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                // : null
                                            }
                                        </Dropdown>

                                    )
                                }

                            })
                        }

                    </div>
                    <div className="row justify-content-center">

                        {

                            categories.map((category, index) => {
                                let url = PUBLIC_ROUTES.SHOP.path;
                                url = url.replace(":category", category.slug);

                                if (size.width <= 1351 && index > 3) {
                                    return (

                                        <Dropdown key={category.categoryId}
                                                  show={show[category.categoryId]}
                                                  onMouseEnter={() => showDropdown(category.categoryId)}
                                                  onMouseLeave={() => hideDropdown(category.categoryId)}
                                                  drop={'down'}
                                        >
                                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <HeaderNavbarItem
                                                    linkTo={url}
                                                    icon={category.public_image}
                                                    text={category.name}
                                                />
                                            </Dropdown.Toggle>

                                            {
                                                // category.subcategories.length ?
                                                category.id === 1 ?
                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom with-pills">
                                                        {/* <Dropdown.Item key={uuidv4()} style={{cursor:'default'}}>
                                                    <PillsDropDown
                                                        laboratories={laboratories}
                                                        formats={formats}
                                                        subscriptions={subscriptions}
                                                        categorySlug={category.slug}
                                                    />
                                                </Dropdown.Item> */}
                                                        <div className="custom-dropdown-item" style={{cursor: 'default'}}>
                                                            <PillsDropDown
                                                                laboratories={laboratories}
                                                                formats={formats}
                                                                subscriptions={subscriptions}
                                                                categorySlug={category.slug}
                                                            />
                                                        </div>
                                                    </Dropdown.Menu>
                                                    :

                                                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                                                        {
                                                            category.subcategories.map((subCategory) => {
                                                                let childUrl = PUBLIC_ROUTES.SHOP_SUBCATEGORY.path;
                                                                childUrl = childUrl.replace(":category?", category.slug);
                                                                childUrl = childUrl.replace(":subcategory?", subCategory.slug);
                                                                return (
                                                                    <Dropdown.Item key={uuidv4()}>
                                                                        <Link to={childUrl}
                                                                              style={{textDecoration: 'none'}}>
                                                                        <span
                                                                            className="header-navbar-subitem">{subCategory.name}</span>
                                                                        </Link>
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                // : null
                                            }
                                        </Dropdown>

                                    )
                                }

                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default HeaderNavbar
