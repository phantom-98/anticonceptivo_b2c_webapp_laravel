import React, { useRef, useEffect, useState, useContext } from "react";
import CloseModal from "../../assets/images/icons/header/close-modal.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import logoFull from "../../assets/images/logo-full.svg";
import { Link } from "react-router-dom";
import Icon from "../../components/general/Icon";
import { AppContext } from "../../context/AppProvider";

import cardioLogoFull from "../../assets/images/cardioLogo.svg";
import oxfarLogoFull from "../../assets/images/oxfar.svg";
import bioLogoFull from "../../assets/images/bioequivalente.png";
const OffCanvas = ({ children, showCanvas, closeCanvas, width = 341 }) => {
    const parentStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    };
    const [logo, setLogo] = useState(logoFull);
    const { currentStore } = useContext(AppContext);
    const ref = useRef();

    useOnClickOutside(ref, () => closeCanvas());
    useEffect(() => {
        switch (currentStore) {
            case "cardio":
                setLogo(cardioLogoFull);

                break;
            case "anticonceptivo":
                setLogo(logoFull);
                break;
            case "bioequivalente":
                setLogo(bioLogoFull);
                break;

            default:
                setLogo(oxfarLogoFull);
                break;
        }
    }, [currentStore]);

    return (
        <div
            ref={ref}
            className={`offcanvas-block-left ${
                showCanvas === null ? "" : showCanvas ? "show" : "hide"
            }`}
            style={{ maxWidth: width + "px" }}
        >
            <div
                className="pointer mb-4"
                style={parentStyle}
                onClick={closeCanvas}
            >
                <Link to={PUBLIC_ROUTES.HOME.path}>
                    <Icon
                        path={logo}
                        style={{ height: "30px", width: "100%" }}
                    />
                </Link>
            </div>
            <div className="canvas-content">{children}</div>
        </div>
    );

    function useOnClickOutside(ref, handler) {
        useEffect(() => {
            if (showCanvas) {
                const listener = (event) => {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            }
        }, [showCanvas]);
    }
};

export default OffCanvas;
