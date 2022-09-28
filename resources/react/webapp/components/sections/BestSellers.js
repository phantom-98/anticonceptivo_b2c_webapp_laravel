import React, {useState, useEffect} from 'react';
import H2Title from "../general/H2Title";
import * as Services from "../../Services";
import LazyLoading from '../LazyLoading';
import SwiperProducts from '../sections/SwiperProducts';

const BestSeller = ({
    title,
    style='pb-5 mb-2'
}) => {

    const [bestSellers, setBestSellers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_BEST_SELLERS;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setBestSellers(response.data);
                    setIsLoaded(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    if (!isLoaded) {
        return (
            <LazyLoading />
        )
    }

    return (
        <div className="py-3" style={{background: '#FFFFFF'}}>
            <div className="container">
                <div className={`row card-products-gutters ${style}`}>
                    {
                        title && (
                            <div className="col-12 py-4">
                                <H2Title text={title}/>
                            </div>
                        )
                    }

                    <div className="col-12">
                        <SwiperProducts
                            products={bestSellers}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;
