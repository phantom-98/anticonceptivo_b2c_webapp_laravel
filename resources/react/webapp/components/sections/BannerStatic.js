import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";

const BannerStatic = ({banners}) => {

    return (
        <div className="container mt-4 pt-2">
            <div className="row">
                {
                    banners.length ? 
                        banners.map((banner) => {
                            let bannerStaticKey = uuidv4();
                            return(
                                <div key={bannerStaticKey} className={`pb-4 ${banner.size}`}>
                                    <a href={banner.button_link} target={banner.button_target}>
                                        <img src={banner.public_file} alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
                                    </a>
                                </div>
                            )
                        })
                    : null
                }
            </div>
        </div>
    );
};

export default BannerStatic