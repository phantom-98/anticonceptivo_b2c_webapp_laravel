import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import { AppContext } from "../../context/AppProvider";
import { BREAKPOINTS } from "../../helpers/vars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerCategories = ({ bannerCategories }) => {
    const { breakpoint } = useContext(AppContext);

    const responsiveCol = (col) => {
        if (
            (col === "col-3" || col === "col-9") &&
            !(
                breakpoint === BREAKPOINTS.MEDIUM ||
                breakpoint === BREAKPOINTS.LARGE ||
                breakpoint === BREAKPOINTS.EXTRA_LARGE ||
                breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE
            )
        ) {
            return "col-6";
        }
        return col;
    };

    return (
        <div className="container">
            <div className="row d-block d-md-none py-2">
                <div className="col-12 text-center">
                    <h2
                        className="font-18 color-0869A6 font-poppins bold"
                        style={{ letterSpacing: "2px" }}
                    >
                        Categorías
                    </h2>
                </div>
            </div>
            <div className="row">
                {bannerCategories.length
                    ? bannerCategories.map((bannerCategory, key) => {
                          let bannerCategoryStaticKey = uuidv4();
                          let isRight = 1;
                          if ((key + 1) % 2 === 0) {
                              isRight = 0;
                          }
                          return bannerCategory.public_subbanner_image
                              ? [
                                    <div
                                        className={
                                            (bannerCategory.subbanner_image_size ??
                                                "col-md-12") + " mb-3"
                                        }
                                        key={bannerCategoryStaticKey}
                                    >
                                        <Link
                                            to={PUBLIC_ROUTES.SHOP.path.replace(
                                                ":category?",
                                                bannerCategory.slug
                                            )}
                                            style={{
                                                textDecoration: "none",
                                                color: "#000000",
                                            }}
                                        >
                                            <div className="row no-gutters">
                                                {isRight ? (
                                                    <>
                                                        <div
                                                            className={responsiveCol(
                                                                "col-9"
                                                            )}
                                                        >
                                                            <LazyLoadImage
                                                                alt={
                                                                    CONFIG.APP_NAME
                                                                }
                                                                effect="blur"
                                                                src={
                                                                    breakpoint ===
                                                                        BREAKPOINTS.MEDIUM ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.LARGE ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.EXTRA_LARGE ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.EXTRA_EXTRA_LARGE
                                                                        ? bannerCategory.public_subbanner_image
                                                                        : bannerCategory.public_banner_subimage_responsive ??
                                                                          bannerCategory.public_subbanner_image
                                                                }
                                                                width={"100%"}
                                                            />
                                                        </div>

                                                        <div
                                                            className={
                                                                responsiveCol(
                                                                    "col-3"
                                                                ) +
                                                                " text-center flex-footer-column"
                                                            }
                                                        >
                                                            <div
                                                                className="w-100 h-100 d-flex "
                                                                style={{
                                                                    backgroundColor:
                                                                        "#0869A6",
                                                                }}
                                                            >
                                                                <div className="m-auto">
                                                                    <LazyLoadImage
                                                                        alt={
                                                                            CONFIG.APP_NAME
                                                                        }
                                                                        effect="blur"
                                                                        src={
                                                                            bannerCategory.public_image
                                                                        }
                                                                        width={
                                                                            35
                                                                        }
                                                                    />
                                                                    <h3 className="mt-3 font-15 bold font-poppins text-white">
                                                                        {
                                                                            bannerCategory.name
                                                                        }
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={
                                                                responsiveCol(
                                                                    "col-3"
                                                                ) +
                                                                " text-center flex-footer-column"
                                                            }
                                                        >
                                                            <div
                                                                className="w-100 h-100 d-flex "
                                                                style={{
                                                                    backgroundColor:
                                                                        "#0869A6",
                                                                }}
                                                            >
                                                                <div className="m-auto">
                                                                    <LazyLoadImage
                                                                        alt={
                                                                            CONFIG.APP_NAME
                                                                        }
                                                                        effect="blur"
                                                                        src={
                                                                            bannerCategory.public_image
                                                                        }
                                                                        width={
                                                                            35
                                                                        }
                                                                    />
                                                                    <h2 className="mt-3 font-15 bold font-poppins text-white">
                                                                        {
                                                                            bannerCategory.name
                                                                        }
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={responsiveCol(
                                                                "col-9"
                                                            )}
                                                        >
                                                            <LazyLoadImage
                                                                alt={
                                                                    CONFIG.APP_NAME
                                                                }
                                                                effect="blur"
                                                                src={
                                                                    breakpoint ===
                                                                        BREAKPOINTS.MEDIUM ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.LARGE ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.EXTRA_LARGE ||
                                                                    breakpoint ===
                                                                        BREAKPOINTS.EXTRA_EXTRA_LARGE
                                                                        ? bannerCategory.public_subbanner_image
                                                                        : bannerCategory.public_banner_subimage_responsive ??
                                                                          bannerCategory.public_subbanner_image
                                                                }
                                                                width={"100%"}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </div>,
                                ]
                              : null;
                      })
                    : null}
            </div>
        </div>
    );
};

export default BannerCategories;
