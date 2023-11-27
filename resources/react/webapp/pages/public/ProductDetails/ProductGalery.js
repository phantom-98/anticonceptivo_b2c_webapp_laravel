import React, {Fragment, useEffect, useState} from 'react';
import {CONFIG} from "../../../Config";
import {
  SideBySideMagnifier
} from "react-image-magnifiers";
import ProductGaleryMobile from "./ProductGaleryMobile";
import noImage from "../../../assets/images/producto-default.png";

const ProductGallery = ({product, imageSubscription, productImage, hasImages}) => {

    const [imageSelected, setImageSelected] = useState(productImage)
    const [productImages, setProductImages] = useState(hasImages ? product.images : [noImage]);

    useEffect(() => {
        if (imageSubscription == null) {
            setProductImages(hasImages ? product.images : [noImage]);
            setImageSelected (productImage)
        }else{
            let list = [...product.images];
            list.push(imageSubscription);
            setProductImages(list);
            setImageSelected(imageSubscription)
        }
    },[imageSubscription])

    useEffect(() => {
        setProductImages(hasImages ? product.images : [noImage]);
        setImageSelected(productImage)
    },[productImage])

    return (
        <Fragment>
            <div className="row mb-3 responsive-d-display">
                <div className="col-12">
                    <h1 className="font-poppins font-27 bold text-black">
                        {product.name}
                    </h1>
                </div>
            </div>
            {/* Desktop */}
            <div className="row responsive-d-none-v2" style={{zIndex: 1000}}>
                <div className="col-auto mr-0 pr-0" style={{width: '118px', height: '400px', overflowY:'auto'}}>
                    {
                        productImages.map((img, index) => {
                            let flag = productImages.length == index+1
                            return (
                                <div key={index} id={img}
                                    className={`img-box-product-mini ${!flag ? 'mb-3' : ''} pointer`}
                                    style={img == imageSelected ? { boxShadow: '1px 1px 8px -1px #009BE8' } : imageSelected == img.public_file ? { boxShadow: '1px 1px 8px -1px #009BE8' } : {}}>
                                        <img
                                            src={img.public_file ? img.public_file : img}
                                            onMouseEnter={() => setImageSelected(img.public_file ? img.public_file : img)}
                                            alt={`${CONFIG.APP_NAME} - ${product.name}`}
                                        />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col">
                    <div className="img-box-product">
                        <SideBySideMagnifier
                            imageSrc={imageSelected}
                            imageAlt={`${CONFIG.APP_NAME}`}
                            fillAlignTop={true}
                            fillAvailableSpace={false}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="row responsive-d-display">
               <div className="col-12">
                   <div className="gallery-res-box">
                       <ProductGaleryMobile
                           images={!imageSubscription ? product.images : imageSubscription}
                       />
                   </div>
               </div>
            </div>
        </Fragment>
    );
};

export default ProductGallery
