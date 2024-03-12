import React, { useState, useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import H2Title from "../../../components/general/H2Title";
import { CONFIG } from "../../../Config";
import { v4 as uuidv4 } from "uuid";
import { BREAKPOINTS } from "../../../helpers/vars";
import { AppContext } from "../../../context/AppProvider";
import SliderArrowRight from "../../../assets/images/icons/slider-arrow-right.png";
import SliderArrowLeft from "../../../assets/images/icons/slider-arrow-left.png";
import * as Services from "../../../Services";
import { useHistory } from "react-router-dom";

const OurBrands = () => {
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
        showModalStoreChange(true);
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
        <div style={{ marginBottom: "10px" }}>
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
                                        maxWidth: "10%",

                                        padding: "0 10px",
                                        cursor: "pointer",
                                        borderBottom:
                                            brand.name == currentStore
                                                ? "3px solid var(--btn-color-grad-1)"
                                                : "3px solid #C4C4C4",
                                        backgroundColor:
                                            brand.name == currentStore
                                                ? "#DCDCDC"
                                                : "none",
                                    }}
                                >
                                    <img
                                        src={brand.image}
                                        alt={CONFIG.APP_NAME}
                                        className=""
                                        style={{
                                            width: "100%",

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

export default OurBrands;
