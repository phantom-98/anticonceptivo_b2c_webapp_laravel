import React, {useState} from 'react';
import {CONFIG} from "../../../Config";

const ProductGallery = ({product}) => {

    const [imageSelected, setImageSelected] = useState(product.images[0].public_file)

    return (
        <div className="row">
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                {
                    product.images.map((img, index) => {
                        return <div key={index} className="img-box-product-mini mb-3 pointer">
                            <img src={img.public_file} 
                                className="mt-2 pt-1"
                                onClick={() => setImageSelected(img.public_file)}
                                alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                        </div>
                    })
                }
            </div>
            <div className="col">
                <div className="img-box-product">
                    <img src={imageSelected} className="mt-5 pt-4" alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery
