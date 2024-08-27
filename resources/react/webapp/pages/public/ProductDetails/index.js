import React, {Fragment, useEffect, useState, useContext} from 'react';
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
import { AppContext } from "../../../context/AppProvider";
import {BREAKPOINTS} from "../../../helpers/vars";
import noImage from "../../../assets/images/producto-default.png";

const ProductDetail = ({match}) => {
    const {breakpoint} = useContext(AppContext)
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
            if(product.meta_title){
                document.title = product.meta_title;
            }else{
                document.title = capitalizeFirstLetterOfEachWord(product.name, true) + ' - Anticonceptivo';
            }
        }
    }, [product])

    useEffect(() => {
        if (match) {
            getData();
        }
    }, [match])

    const getData = () => {
        setLoading(true);
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
                <BasePanelTwo
                    classContainer="mobile-shop"
                    breadcrumbs={breadcrumbs}
                    prepend={<img width="100%" style={{objectFit: 'cover', height: '110px'}}
                        src={breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? product.subcategory.category.public_banner_image : product.subcategory.category.public_banner_image_responsive ?? product.subcategory.category.public_banner_image}
                                  alt={CONFIG.APP_NAME}/>}
                >

                    <div className="row product-separator">
                        <div className="col-md-6">
                            <ProductGallery
                                product={product}
                                imageSubscription={imageSubscription}
                                productImage={product.images.length ? product.images[0].public_file : noImage}
                                hasImages={product.images.length}
                            />
                        </div>
                        <div className="col-md-6 mt-4">
                            <ProductInfo product={product} setImageSubscription={setImageSubscription}/>
                        </div>
                    </div>

                    {
                        product.is_bioequivalent ?
                            <div style={{
                                backgroundColor: '#FFEA17',
                                borderRadius: '10px',
                                minHeight: '47px',
                                padding: '5px 10px'
                            }}>
                                <div className="row">
                                    <div className="col-auto pr-0">
                                        <img src={Bioequivalent} alt="anticonceptivo.cl"/>
                                    </div>
                                    <div className="col d-flex">
                                        <p className="font-poppins font-14 regular mb-0 my-auto"
                                           style={{color: '#F14821'}}>Este medicamento es bioequivalente</p>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    <ProductTabs product={product} legalWarning={legalWarning} valid={product.is_medicine ? false : valid}/>

                </BasePanelTwo>

                {
                    prods.length ?
                        <ProductsCarousel
                            prods={prods}
                            title="Bioquivalentes"
                        />
                        :
                        null
                }

                <Subscribe/>
            </Fragment>
            : <LazyLoading/>
    );
};

export default ProductDetail
