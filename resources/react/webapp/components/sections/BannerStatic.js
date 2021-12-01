import React, {useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";
import {AppContext} from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";
const BannerStatic = ({banners}) => {
    const {breakpoint} = useContext(AppContext)

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
                                        <img src={breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? banner.public_file : banner.public_file_responsive ?? banner.public_file} alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
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
