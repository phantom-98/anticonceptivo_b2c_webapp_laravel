import React, { useContext } from "react";
//import logo from "../assets/images/";
import logoGif from "../assets/images/logo-spinner.gif";
import { AppContext } from "../context/AppProvider";

const LazyLoading = ({ height = "100vh", style = {} }) => {
    if (height) {
        style = {
            ...style,
            height: height,
            paddingBottom: "calc(100vh / 2)",
        };
    }

    const { currentStore } = useContext(AppContext);
    return (
        <div className="w-100 d-flex" style={style}>
            <div className="m-auto text-center">
                <img
                    className="py-2 responsive-d-none"
                    src={`/images/logo_responsive_${currentStore}.png`}
                    alt="anticonceptivo.cl"
                    style={{ width: 40 }}
                />

                <br />

                <div
                    className="spinner-border text-secondary responsive-d-none text-center"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>

                <img
                    className="py-2 responsive-d-display"
                    src={logoGif}
                    alt="anticonceptivo.cl"
                    style={{ width: 50 }}
                />
            </div>
        </div>
    );
};

export default LazyLoading;
