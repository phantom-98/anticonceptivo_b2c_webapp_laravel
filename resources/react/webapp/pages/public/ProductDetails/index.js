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

const ProductDetail = ({match}) => {

    const [product, setProduct] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        setProduct(null)
        const slug = match.params.slug
        const _prod = dummy_products.find(p => p.slug == slug);
        if (_prod) {
            setProduct(_prod)
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
                    url: (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', slug),
                    name: _prod.name,
                }
            ])

        } else {
            window.location.href = PUBLIC_ROUTES.SHOP.path
        }

    }, [match])

    if (!product) {
        return null;
    }
    return (
        <Fragment>
            <div style={{background: '#FAFAFA'}}>
                <div className="container">
                    <div className="w-100 pt-4">
                        <img width="100%" src="/themes/web/products/banner.png" alt={CONFIG.APP_NAME}/>
                    </div>
                </div>
            </div>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >

                <div className="row pb-5 mb-5">
                    <div className="col-md-6">
                        <ProductGallery product={product}/>
                    </div>
                    <div className="col-md-6">
                        <ProductInfo product={product}/>
                    </div>
                </div>


                <ProductTabs/>

            </BasePanelTwo>

            <ProductsCarousel title="Te podría interesar"/>

            <Subscribe/>
        </Fragment>
    );
};

export default ProductDetail
