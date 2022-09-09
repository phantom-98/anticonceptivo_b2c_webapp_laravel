import React, {useContext, useEffect, useState} from 'react';
import H2Title from "../general/H2Title";
import ProductCard from "../shopping/ProductCard";
import { v4 as uuidv4 } from 'uuid';
import * as Services from "../../Services";
import LazyLoading from '../LazyLoading';
import {AppContext} from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";

const CondomProduct = ({title, style = ''}) => {

    const [condoms, setCondoms] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {breakpoint} = useContext(AppContext)

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_CONDOMS;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCondoms(response.data);
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
        breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
            <div className="py-3" style={{background: '#FFFFFF'}}>
                <div className="container">
                    {
                        title && (
                            <div className="row py-3">
                                <div className="col-12">
                                    <H2Title text={title}/>
                                </div>
                            </div>
                        )
                    }

                    <div className="row py-3">
                        <div className="col-12 pb-3">
                            <div className={`row card-products-gutters ${style}`}>
                                {
                                    condoms.map((product, index) => {
                                        let uuid = uuidv4();
                                        return (<div className="col-6 col-md-6 col-lg-3 mb-3" key={uuid}>
                                            <ProductCard product={product}/>
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <a style={{textDecoration:"underline"}} href="https://anticonceptivo.cl/tienda/preservativos/condones">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className="py-3" style={{background: '#FFFFFF'}}>
                <div className="container">
                    {
                        title && (
                            <div className="row py-3">
                                <div className="col-12">
                                    <H2Title text={title}/>
                                </div>
                            </div>
                        )
                    }

                    <div className="row py-3">
                        <div className="col-12 pb-3">
                            <div className={`row card-products-gutters ${style}`}>
                                {
                                    condoms.map((product, index) => {
                                        let uuid = uuidv4();
                                        
                                        return index < 2 ? (<div className="col-6 col-md-6 col-lg-3 mb-3" key={uuid}>
                                            <ProductCard product={product}/>
                                        </div>) : null
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <a style={{textDecoration:"underline"}} href="https://anticonceptivo.cl/tienda/preservativos/condones">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CondomProduct
