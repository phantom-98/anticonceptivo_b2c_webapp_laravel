import React, {useState} from 'react';
import {CONFIG} from "../../../Config";

const ProductGallery = ({product}) => {

    const [imageSelected, setImageSelected] = useState(product.images[0].file)

    return (
        <div className="row">
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                {
                    product.images.map((img, index) => {
                        return <div key={index} className="img-box-product-mini mb-3 pointer">
                            <img src={img.file} 
                                onClick={() => setImageSelected(img.file)}
                                alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                        </div>
                    })
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
