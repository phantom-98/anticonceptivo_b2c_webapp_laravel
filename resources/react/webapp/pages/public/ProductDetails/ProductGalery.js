import React, {useState} from 'react';
import {CONFIG} from "../../../Config";
import NoImage from "../../../assets/images/no-image.png";
import {
  SideBySideMagnifier
} from "react-image-magnifiers";

const ProductGallery = ({product}) => {

    const [imageSelected, setImageSelected] = useState(
        product.images.length ? product.images[0].public_file : NoImage
    )
    
    return (
        <div className="row" style={{zIndex: 1000}}>
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                {
                    product.images.length ?
                        product.images.map((img, index) => {
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
                        })
                    : null
                }
            </div>
            <div className="col">
                <div className="img-box-product">
                    {/* <img src={imageSelected} alt={`${CONFIG.APP_NAME} - ${product.name}`}/> */}
                    <SideBySideMagnifier 
                        imageSrc={imageSelected}
                        largeImageSrc={imageSelected}
                        imageAlt={`${CONFIG.APP_NAME}`}
                        fillAlignTop={true}
                        fillAvailableSpace={false}
                        // alwaysInPlace={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductGallery
