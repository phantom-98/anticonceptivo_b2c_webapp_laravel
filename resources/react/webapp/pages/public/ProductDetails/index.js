import React, {Fragment, useEffect, useState} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import ProductTabs from "./ProductTabs";
import ProductsCarousel from "../../../components/sections/ProductsCarouselV2";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGalery";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";
import Bioequivalent from "../../../assets/images/icons/bioequivalence.png"

const ProductDetail = ({match}) => {

    const [product, setProduct] = useState(null);
    const [valid, setValid] = useState(null);
    const [prods, setProds] = useState([]);
    const [legalWarning, setLegalWarning] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [imageSubscription, setImageSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (match) {
            getData();
        }
    },[match])

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
                    setProds(response.data.prods);
                    setLegalWarning(response.data.legal_warnings);
                    setValid(response.data.valid);
                    setLoading(false);
                },
                error: () => {
                    window.location.href = PUBLIC_ROUTES.SHOP.path
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (

        !loading ?
            <Fragment>
                <div style={{background: '#FAFAFA'}}>
                    <div className="container">
                        <div className="w-100 pt-4">
                            <img width="100%" style={{objectFit:'cover', height:'110px'}} src={product.subcategory.category.public_banner_image} alt={CONFIG.APP_NAME}/>
                        </div>
                    </div>
                </div>

                <BasePanelTwo breadcrumbs={breadcrumbs} >

                    <div className="row product-separator">
                        <div className="col-md-6">
                            <ProductGallery product={product} imageSubscription={imageSubscription} productImage={product.images[0].public_file}/>
                        </div>
                        <div className="col-md-6 mt-4">
                            <ProductInfo product={product} setImageSubscription={setImageSubscription}/>
                        </div>
                    </div>

                    {
                        product.is_bioequivalent ?
                        <div className="row padding-beneficy">
                            <div className="col product-detail-tabs font-beneficy" style={{backgroundColor: '#FFEA17', borderRadius: '10px', height:'50px', lineHeight:'50px'}}>
                                <img src={Bioequivalent} className="mr-2"/>
                                <span className="font-poppins regular">Este medicamento es bioequivalente</span>
                            </div>
                        </div>
                        : null
                    }

                    <ProductTabs product={product} legalWarning={legalWarning} valid={valid}/>

                </BasePanelTwo>

                {
                    // prods.length ?
                        <ProductsCarousel
                            prods={prods}
                            title="Te podría interesar"
                        />
                    // : null
                }

                <Subscribe/>
            </Fragment>
        : <LazyLoading/>
    );
};

export default ProductDetail
