import React, {useContext} from "react";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import { AppContext } from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";

const BannerCategories = ({ bannerCategories }) => {
    const {breakpoint} = useContext(AppContext)

    return (
        <div className="container">
            <div className="row d-block d-md-none py-2">
                <div className="col-12 text-center">
                    <h3 className="font-21 color-0869A6 font-poppins bold" style={{ letterSpacing: "2px" }}>CATEGORÍAS</h3>
                </div>
            </div>
            <div className="row">
            {bannerCategories.length
                ? bannerCategories.map((bannerCategory, key) => {

                      let bannerCategoryStaticKey = uuidv4();
                      return bannerCategory.public_subbanner_image
                          ? [
                                    <div
                                        className={(bannerCategory.subbanner_image_size ?? 'col-md-12') + ' mb-3'}
                                        key={bannerCategoryStaticKey}
                                    >
                                        <Link
                                            to={PUBLIC_ROUTES.SHOP.path.replace(
                                                ":category?",
                                                bannerCategory.slug
                                            )}
                                            style={{
                                                textDecoration: "none",
                                                color: "#000000"
                                            }}
                                        >
                                            <img
                                          src={breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? bannerCategory.public_subbanner_image : bannerCategory.public_banner_subimage_responsive ?? bannerCategory.public_subbanner_image}
                                                alt={CONFIG.APP_NAME}
                                                style={{ width: "100%" }}
                                            />
                                        </Link>

                                </div>
                            ]
                          : null;
                  })
                : null}
            </div>
        </div>
    );
};

export default BannerCategories;
