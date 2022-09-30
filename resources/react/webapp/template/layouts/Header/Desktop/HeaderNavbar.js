import React, {useState, useEffect} from 'react';
import HeaderNavbarItem from "../../../components/HeaderNavbarItem";
import {Dropdown} from 'react-bootstrap'
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import * as Services from "../../../../Services";
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import PillsDropDown from "../../../components/PillsDropDown";
import UseWindowDimensions from "../../../../components/customHooks/UseWindowDimensions";

const HeaderNavbar = () => {

    const {width} = UseWindowDimensions();
    const [categories, setCategories] = useState([]);
    const [spliceCategories, setSpliceCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(null);
    const [laboratories, setLaboratories] = useState([]);
    const [formats, setFormats] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        setView(width)
    }, [width]);

    useEffect(() => {
        doSliceCategories();
    }, [rows, categories]);

    useEffect(() => {
        getResources();
    }, []);

    const setView = (width) => {
        if (width < 1385) {
            if (rows != 2) {
                setRows(2)
            }
        } else {
            if (rows != 1) {
                setRows(1)
            }
        }
    }

    const doSliceCategories = () => {
        let limit = Math.round(categories.length / rows);
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

    const getResources = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER_MENU;

        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    let list = [];
                    response.data.categories.map((category) => {
                        let categoryId = uuidv4();
                        list = [...list, {...category, categoryId: categoryId}]
                    })

                    setLaboratories(response.data.laboratories);
                    setFormats(Object.values(response.data.formats));
                    setSubscriptions(response.data.subscriptions);
                    setCategories(list);
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
                      show={showDropdown === category.categoryId}
                      onMouseEnter={() => setShowDropdown(category.categoryId)}
                      onMouseLeave={() => setShowDropdown(null)}
                    drop={'down'}
            >
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <HeaderNavbarItem
                        linkTo={url}
                        icon={testing}
                        text={category.name}
                    />
                </Dropdown.Toggle>

                {
                    category.id === 1 ?
                        <Dropdown.Menu
                            align="right"
                            bsPrefix="dropdown-menu-custom with-pills">
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

                        <Dropdown.Menu
                            align="right"
                            bsPrefix="dropdown-menu-custom">
                            {
                                category.subcategories.map((subCategory) => {
                                    let childUrl = PUBLIC_ROUTES.SHOP_SUBCATEGORY.path;
                                    childUrl = childUrl.replace(":category?", category.slug);
                                    childUrl = childUrl.replace(":subcategory?", subCategory.slug);
                                    return (
                                        <Link key={uuidv4()} to={childUrl} className="dropdown-item" style={{textDecoration: 'none'}}>
                                            <span className="header-navbar-subitem">{subCategory.name}</span>
                                        </Link>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                }
            </Dropdown>
        </div>)
    }

    return (
        <div className="header-navbar bg-0869A6">
            <div className="container px-0 max-header-navbar">
                {
                    spliceCategories.map((cat, i) => {
                        if (cat.length) {
                            return <div key={uuidv4()} className="row no-gutters justify-content-center">
                                {
                                    cat.map((category, index) => (
                                        <RenderMenuBlock key={index} category={category}/>))
                                }
                            </div>
                        }
                    })
                }
            </div>
        </div>
    );
};

export default HeaderNavbar
