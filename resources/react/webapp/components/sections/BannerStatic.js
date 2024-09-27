import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import { AppContext } from "../../context/AppProvider";
import { BREAKPOINTS } from "../../helpers/vars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerStatic = ({ banners }) => {
    const { breakpoint } = useContext(AppContext);

    return (
        <div className="row">
            {banners.length
                ? banners.map((banner) => {
                      let bannerStaticKey = uuidv4();
                      return (
                          <div
                              key={bannerStaticKey}
                              className={`pb-4 ${
                                  breakpoint === BREAKPOINTS.MEDIUM ||
                                  breakpoint === BREAKPOINTS.LARGE ||
                                  breakpoint === BREAKPOINTS.EXTRA_LARGE ||
                                  breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE
                                      ? "col-md-3"
                                      : "col-6"
                              }`}
                          >
                              <a
                                  href={banner.button_link}
                                  target={banner.button_target}
                              >
                                  <LazyLoadImage
                                      alt={CONFIG.APP_NAME}
                                      effect="blur"
                                      src={
                                          breakpoint === BREAKPOINTS.MEDIUM ||
                                          breakpoint === BREAKPOINTS.LARGE ||
                                          breakpoint ===
                                              BREAKPOINTS.EXTRA_LARGE ||
                                          breakpoint ===
                                              BREAKPOINTS.EXTRA_EXTRA_LARGE
                                              ? banner.public_file
                                              : banner.public_file_responsive ??
                                                banner.public_file
                                      }
                                      width={"100%"}
                                  />
                              </a>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

export default BannerStatic;
