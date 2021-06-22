import React from 'react';
import LazyLoading from "../LazyLoading";
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";

const BannerStatic = ({banners}) => {

    return (
        banners.length ? 
            banners.map(banner => {
                let bannerStaticKey = uuidv4();
                return(
                    <div key={bannerStaticKey} className={banner.size}>
                        <img src={banner.public_file} alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
                    </div>
                )
            })
        : null
    );
};

export default BannerStatic