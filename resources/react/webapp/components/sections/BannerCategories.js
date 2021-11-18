import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import UseWindowDimensions from "../../helpers/UseWindowDimensions";

const BannerCategories = ({ bannerCategories }) => {
    const { width } = UseWindowDimensions();


    return (
        <div className="container">
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
                                                src={width > 750 ? bannerCategory.public_subbanner_image : bannerCategory.public_banner_subimage_responsive ?? bannerCategory.public_subbanner_image}
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
