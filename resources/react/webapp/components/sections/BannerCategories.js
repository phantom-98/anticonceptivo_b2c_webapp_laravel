import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";

const BannerCategories = ({ bannerCategories }) => {
    return (
        <div className="container">
            {bannerCategories.length
                ? bannerCategories.map((bannerCategory, key) => {

                      let bannerCategoryStaticKey = uuidv4();
                      return bannerCategory.public_subbanner_image
                          ? [
                                <div className="row">
                                    <div
                                        className="col-md-12 mb-3"
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
                                                src={
                                                    bannerCategory.public_subbanner_image
                                                }
                                                alt={CONFIG.APP_NAME}
                                                style={{ width: "100%" }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ]
                          : null;
                  })
                : null}
        </div>
    );
};

export default BannerCategories;
