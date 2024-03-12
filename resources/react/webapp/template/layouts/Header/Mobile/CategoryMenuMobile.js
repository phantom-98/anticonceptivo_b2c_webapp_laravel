import React, { useState, useEffect, useContext } from "react";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import * as Services from "../../../../Services";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import PillsMenuMobile from "./PillsMenuMobile";
import Icon from "../../../../components/general/Icon";
import { AppContext } from "../../../../context/AppProvider";
const anticonceptivoNavBar = [1, 2, 3, 4, 5, 6, 7];
const cardioNavBar = [9, 10, 11, 12, 13];
const bioequivalenteNavBar = [14, 15, 16, 17, 18, 19, 20, 21, 22];
const oxfarNavBar = [14, 15, 16, 17, 18, 19, 20, 21, 22];
const CategoryMenuMobile = ({ hideMenu }) => {
    const [categories, setCategories] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [formats, setFormats] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const { currentStore } = useContext(AppContext);
    useEffect(() => {
        getResources();
    }, [currentStore]);

    const getResources = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER_MENU;

        Services.DoGet(url)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        let list = [];
                        let listShow = {};
                        response.data.categories.map((category) => {
                            let categoryId = uuidv4();
                            list = [
                                ...list,
                                { ...category, ["categoryId"]: categoryId },
                            ];
                            listShow = { ...listShow, [categoryId]: false };
                        });
                        switch (currentStore) {
                            case "anticonceptivo":
                                list = list.filter((item) =>
                                    anticonceptivoNavBar.includes(item.id)
                                );
                                break;
                            case "cardio":
                                list = list.filter((item) =>
                                    cardioNavBar.includes(item.id)
                                );
                                break;
                            case "bioequivalente":
                                list = list.filter((item) =>
                                    bioequivalenteNavBar.includes(item.id)
                                );
                                break;

                            default:
                                list = list.filter((item) =>
                                    oxfarNavBar.includes(item.id)
                                );
                                break;
                        }
                        setLaboratories(response.data.laboratories);
                        setFormats(Object.values(response.data.formats));
                        setSubscriptions(response.data.subscriptions);
                        setCategories(list);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    return categories.map((category) => {
        let url = PUBLIC_ROUTES.SHOP.path;
        url = url.replace(":category", category.slug);

        return (
            <div className="col-12" key={category.categoryId}>
                <div className="margin-menu-bottom">
                    <Link
                        to={url}
                        onClick={hideMenu}
                        className="item-menu-cat-first"
                    >
                        {category.public_image ? (
                            <div className="left" style={{ width: "25px" }}>
                                <Icon
                                    style={{
                                        width: "20px",
                                    }}
                                    path={category.public_image}
                                />
                            </div>
                        ) : null}
                        {"  "}
                        {category.name}
                    </Link>
                </div>
                {category.id === 1 ? (
                    <PillsMenuMobile
                        laboratories={laboratories}
                        formats={formats}
                        subscriptions={subscriptions}
                        categorySlug={category.slug}
                        hideMenu={hideMenu}
                    />
                ) : (
                    <ul style={{ listStyleType: "none" }}>
                        {category.subcategories.map((subCategory) => {
                            let childUrl = PUBLIC_ROUTES.SHOP_SUBCATEGORY.path;
                            childUrl = childUrl.replace(
                                ":category?",
                                category.slug
                            );
                            childUrl = childUrl.replace(
                                ":subcategory?",
                                subCategory.slug
                            );
                            let subcatId = uuidv4();
                            return (
                                <li className="my-2" key={subcatId}>
                                    <Link
                                        to={childUrl}
                                        onClick={hideMenu}
                                        className="item-menu-cat-third"
                                    >
                                        {subCategory.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    });
};

export default CategoryMenuMobile;
