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
import UseWindowDimensions from "../../../components/customHooks/UseWindowDimensions";

const HeaderNavbar = () => {

    const {width} = UseWindowDimensions();

    const [categories, setCategories] = useState([]);
    const [spliceCategories, setSpliceCategories] = useState([]);
    const [show, setShow] = useState({});
    const [laboratories, setLaboratories] = useState([]);
    const [formats, setFormats] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        setView(width)
    }, [width])

    useEffect(() => {
        doSliceCategories();
    }, [rows, categories])

    const setView = (width) => {
        if (width < 1385) {
            setRows(2)
        } else {
            setRows(1);
        }
    }

    const doSliceCategories = () => {

        let limit = Math.round(categories.length / rows);
        console.log(limit);
        if (limit) {
            let finalData = chunkArrayInGroups(categories, limit);
            setSpliceCategories(finalData);
        }
    }

    const chunkArrayInGroups = (arr, size) => {
        let chunk = [], i;
        for (i = 0; i <= arr.length; i += size)
            chunk.push(arr.slice(i, i + size));
        return chunk;
    }


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
        <div className="pointer" ref={ref}>
            {children}
        </div>
    ));

    const RenderMenuBlock = ({category}) => {
        let url = PUBLIC_ROUTES.SHOP.path;
        url = url.replace(":category", category.slug);

        return (<div className="col-auto">
            <Dropdown key={'category-' + category.categoryId}
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
                    category.id === 1 ?
                        <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom with-pills">
                            <div className="custom-dropdown-item"
                                 style={{cursor: 'default'}}>
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
                }
            </Dropdown>
        </div>)
    }
    console.log('return');
    return (
        <div className="header-navbar bg-0869A6">
            <div className="container px-0 max-header-navbar">
                {
                    spliceCategories.map((cat, i) => {
                        console.log(cat);
                        return <div className="row no-gutters justify-content-center">
                            {
                                cat.map((category, index) => (
                                    <RenderMenuBlock key={index} category={category}/>))
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default HeaderNavbar
