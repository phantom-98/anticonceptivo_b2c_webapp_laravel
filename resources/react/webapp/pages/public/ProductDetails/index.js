import React, {Fragment, useEffect, useState} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import {dummy_products} from "../../../helpers/productsData";
import {CONFIG} from "../../../Config";
import ProductTabs from "./ProductTabs";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGalery";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";

const ProductDetail = ({match}) => {

    const [product, setProduct] = useState(null);
    const [legalWarning, setLegalWarning] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        if (product) {
            setBreadcrumbs([
                {
                    url: PUBLIC_ROUTES.HOME.path,
                    name: 'Inicio'
                },
                {
                    url: PUBLIC_ROUTES.SHOP.path,
                    name: 'Productos'
                },
                {
                    url: (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', match.params.slug),
                    name: product.name,
                }
            ]);
        }
    },[product])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRODUCT_BY_SLUG.GET;
        let data = {
            product_slug: match.params.slug
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setProduct(response.data.product);
                    setLegalWarning(response.data.legal_warnings);
                },
                error: () => {
                    window.location.href = PUBLIC_ROUTES.SHOP.path
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    // if (!product) {
    //     return null;
    // }

    return (
        
        product ? 
            <Fragment>
                <div style={{background: '#FAFAFA'}}>
                    <div className="container">
                        <div className="w-100 pt-4">
                            <img width="100%" src="/themes/web/products/banner.png" alt={CONFIG.APP_NAME}/>
                        </div>
                    </div>
                </div>

                <BasePanelTwo breadcrumbs={breadcrumbs} >

                    <div className="row pb-5 mb-5">
                        <div className="col-md-6">
                            <ProductGallery product={product}/>
                        </div>
                        <div className="col-md-6">
                            <ProductInfo product={product}/>
                        </div>
                    </div>

                    <ProductTabs product={product} legalWarning={legalWarning}/>

                </BasePanelTwo>

                {/* <ProductsCarousel title="Te podría interesar"/> */}

                <Subscribe/>
            </Fragment>
        : <LazyLoading/>
    );
};

export default ProductDetail
