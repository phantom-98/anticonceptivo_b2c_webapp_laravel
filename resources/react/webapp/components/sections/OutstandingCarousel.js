import React, { useState, useEffect } from "react";
import H2Title from "../general/H2Title";
import * as Services from "../../Services";
import LazyLoading from "../LazyLoading";
import SwiperProducts from "../sections/SwiperProducts";

const OutstandingCarousel = ({ title, style = "pt-5 pb-5", brand }) => {
    const [outstandings, setOutstandings] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let url;
        if (brand !== "anticonceptivo") {
            url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_LANDING + brand;
        } else {
            url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_OUTSTANDING;
        }

        //let url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_OUTSTANDING;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setOutstandings(response.data);
                        setIsLoaded(true);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    if (!isLoaded) {
        return <LazyLoading />;
    }

    return (
        <>
            <div className="bg-fafafa">
                <div className="container">
                    <div className={`row card-products-gutters ${style}`}>
                        {title && (
                            <div className="col-12 py-4">
                                <H2Title text={title} />
                            </div>
                        )}

                        <div className="col-12">
                            <SwiperProducts products={outstandings} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OutstandingCarousel;
