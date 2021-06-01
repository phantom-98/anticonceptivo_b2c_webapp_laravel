import React, {useState} from 'react';
import {CONFIG} from "../../../Config";
import NoImage from "../../../assets/images/no-image.png";

const ProductGallery = ({product}) => {

    const [imageSelected, setImageSelected] = useState(
        product.images.length ? product.images[0].public_file : NoImage
    )

    return (
        <div className="row">
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                {
                    product.images.length ?
                        product.images.map((img, index) => {
                            return <div key={index} className="img-box-product-mini mb-3 pointer">
                                <img src={img.public_file} 
                                    onClick={() => setImageSelected(img.public_file)}
                                    alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                            </div>
                        })
                    : null
                }
            </div>
            <div className="col">
                <div className="img-box-product">
                    <img src={imageSelected} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery
