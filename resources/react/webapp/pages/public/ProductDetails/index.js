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
import {capitalizeFirstLetterOfEachWord} from "../../../helpers/GlobalUtils";

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
                    name: product.subcategory.category.name,
                    slug: product.subcategory.category.slug
                },
                {
                    url: (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', match.params.slug),
                    name: product.name,
                }
            ]);

            document.title = capitalizeFirstLetterOfEachWord(product.name, true) + ' - Anticonceptivo';
        }
    }, [product])

    useEffect(() => {
        if (match) {
            getData();
        }
    }, [match])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRODUCT_BY_SLUG.GET;
        let data = {
            product_slug: match.params.slug
        }
        Services.DoPost(url, data).then(response => {
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
                        {/*<div className={product.subcategory.category.banner_image_size +" pt-4"}>*/}
                        <div className="w-100 pt-4">
                            <img width="100%" style={{objectFit: 'cover', height: '110px'}}
                                 src={product.subcategory.category.public_banner_image} alt={CONFIG.APP_NAME}/>
                        </div>
                    </div>
                </div>

                <BasePanelTwo breadcrumbs={breadcrumbs}>

                    <div className="row product-separator">
                        <div className="col-md-6">
                            <ProductGallery product={product} imageSubscription={imageSubscription}
                                            productImage={product.images[0].public_file}/>
                        </div>
                        <div className="col-md-6 mt-4">
                            <ProductInfo product={product} setImageSubscription={setImageSubscription}/>
                        </div>
                    </div>

                    {
                        product.is_bioequivalent ?
                            <div style={{backgroundColor: '#FFEA17', borderRadius: '10px', minHeight : '47px', padding : '5px 10px'}}>
                                <div className="row">
                                    <div className="col-auto pr-0">
                                        <img src={Bioequivalent} alt="anticonceptivo.cl"/>
                                    </div>
                                    <div className="col d-flex">
                                        <p className="font-poppins font-15 regular mb-0 my-auto" style={{color: '#F14821'}}>Este medicamento es bioequivalente</p>
                                    </div>
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
