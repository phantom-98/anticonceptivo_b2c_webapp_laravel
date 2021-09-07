import React, {Fragment, useEffect, useState} from 'react';
import {CONFIG} from "../../../Config";
import {
  SideBySideMagnifier
} from "react-image-magnifiers";
import ProductGaleryMobile from "./ProductGaleryMobile";

const ProductGallery = ({product, imageSubscription, productImage}) => {

    const [imageSelected, setImageSelected] = useState(productImage)
    
    useEffect(() => {
        if (imageSubscription == null) {
            setImageSelected (productImage)
        }
    },[imageSubscription])

    useEffect(() => {
        setImageSelected(productImage)
    },[productImage])

    return (
        <Fragment>
            {/* Desktop */}
            <div className="row repsonsive-d-none-v2" style={{zIndex: 1000}}>
                <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                    {
                        product.images.length ?
                            product.images.map((img, index) => {
                                if(index<(imageSubscription ?? 0) + 3){
                                    if(index <= (imageSubscription ?? 0) + 3 && index >= 3 && index != (imageSubscription ?? 0) + 2){
                                        return;
                                    }else if(index == (imageSubscription ?? 0) + 2 && imageSubscription != null){
                                        if(imageSelected != img.public_file){
                                            setImageSelected(img.public_file)
                                        }
                                    }

                                    return (
                                        <div key={index} 
                                            className="img-box-product-mini mb-3 pointer" 
                                            style={imageSelected === img.public_file ? {boxShadow:'1px 1px 8px -1px #009BE8'} : {}}>
                                            <img src={img.public_file} 
                                                onMouseEnter={() => setImageSelected(img.public_file)}
                                                alt={`${CONFIG.APP_NAME} - ${product.name}`}
                                            />
                                        </div>
                                    )                         
                                }

                            })
                        : null
                    }
                </div>
                <div className="col">
                    <div className="img-box-product">
                        {/* <img src={imageSelected} alt={`${CONFIG.APP_NAME} - ${product.name}`}/> */}
                        <SideBySideMagnifier 
                            imageSrc={imageSelected}
                            // largeImageSrc={imageSelected}
                            imageAlt={`${CONFIG.APP_NAME}`}
                            fillAlignTop={true}
                            fillAvailableSpace={false}
                            // alwaysInPlace={true}
                        />
                    </div>
                </div>
            </div>
            
            {/* Mobile */}
            <div className="row responsive-d-display">
                <ProductGaleryMobile
                    images={product.images}
                />
            </div>
        </Fragment>
    );
};

export default ProductGallery
