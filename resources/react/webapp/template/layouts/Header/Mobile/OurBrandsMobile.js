import React, { useState, useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CONFIG } from "../../../../Config";
import { v4 as uuidv4 } from "uuid";

import { AppContext } from "../../../../context/AppProvider";
import * as Services from "../../../../Services";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OurBrandsMobile = () => {
    const {
        breakpoint,
        currentStore,
        setStore,

        showModalStoreChange,
    } = useContext(AppContext);
    let navigate = useHistory();

    const navigateToAboutUs = (brand) => {
        if (!brand) return navigate.push("/");
        navigate.push(`/${brand}`);
    };
    const [newBrands, setNewBrands] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (brands?.length) {
            brandBySeven();
        }
    }, [brands]);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_BRANDS;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                console.log(response);
                Services.Response({
                    response: response,
                    success: () => {
                        setBrands(response.data.brands);
                        //console.log(brands);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    const handleTheme = (brand) => {
        setStore(brand);
        if (brand === "anticonceptivo") return navigateToAboutUs();
        navigateToAboutUs(brand);

        //toggleTheme(brand);
    };
    const brandBySeven = () => {
        let _brands = [...brands];
        let _final_brands = [];
        while (_brands.length) {
            _final_brands.push(_brands.splice(0, 7));
        }
        setNewBrands(_final_brands);
    };

    //return <div>{console.log(brands)}</div>;

    return (
        <div style={{ marginBottom: "10px", minHeight: "76px" }}>
            {newBrands.map((_brands, index) => {
                return (
                    <div
                        key={uuidv4()}
                        //className="row py-3 justify-content-center"
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {_brands.map((brand, indx) => {
                            return (
                                <div
                                    className=""
                                    key={uuidv4()}
                                    style={{
                                        // flex: "0 0 9.33333%",

                                        margin: "0px 5px",
                                        padding: "5px 5px",
                                        borderBottom:
                                            brand.name == currentStore
                                                ? "3px solid var(--btn-color-grad-1)"
                                                : "3px solid #C4C4C4",
                                        backgroundColor:
                                            brand.name == currentStore
                                                ? "#F5F5F5"
                                                : "none",
                                        borderRadius: "0px 0px 15px 15px",
                                    }}
                                >
                                    <LazyLoadImage
                                        src={`/images/logo_responsive_${brand.name}.png`}
                                        alt={CONFIG.APP_NAME}
                                        style={{
                                            height: "80%",
                                            margin: "0 20px",
                                            objectFit: "contain",
                                        }}
                                        onClick={() => handleTheme(brand.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default OurBrandsMobile;
