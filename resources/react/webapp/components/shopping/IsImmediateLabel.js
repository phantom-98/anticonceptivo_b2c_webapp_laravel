import React, { useEffect, useState } from "react";
import isImmediateSvgWhite from "../../assets/images/icons/immediate-white.svg";
import arrivesTodayBlue from "../../assets/images/icons/arrives-today-blue.svg";
import freeShipping from "../../assets/images/icons/free-shipping.svg";
import arrivesTomorrowGreen from "../../assets/images/icons/arrives-tomorrow-green.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const IsImmediateLabel = ({ product, list = true }) => {
    const [type, setType] = useState("");
    const [label, setLabel] = useState("");

    useEffect(() => {
        if ("delivery_label" in product) {
            if (
                "label" in product.delivery_label &&
                "label_status" in product.delivery_label
            ) {
                setLabel(product.delivery_label.label);
                setType(product.delivery_label.label_status);
            }
        }
    }, [product]);

    const Immediate = () => {
        return (
            <div className="is-immediate-label">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={isImmediateSvgWhite}
                />{" "}
                <span className="ml-1">{label}</span>
            </div>
        );
    };

    const Today = () => {
        return (
            <div className="is-today-label">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={arrivesTodayBlue}
                />{" "}
                <span className="ml-1">{label}</span>
            </div>
        );
    };

    const Tomorrow = () => {
        return (
            <div className="is-tomorrow-label">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={arrivesTomorrowGreen}
                />{" "}
                <span className="ml-1">{label}</span>
            </div>
        );
    };

    const AfterTomorrow = () => {
        return (
            <div className="is-after-tomorrow-label">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={arrivesTomorrowGreen}
                />{" "}
                <span className="ml-1">{label}</span>
            </div>
        );
    };

    const AfterTomorrowCustom = () => {
        return (
            <div className="is-after-tomorrow-label">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={arrivesTomorrowGreen}
                />{" "}
                <span className="ml-1">{label}</span>
            </div>
        );
    };

    const FreeShipping = () => {
        return (
            <div className="is-free-shipping">
                <LazyLoadImage
                    alt="anticonceptivo.cl"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={freeShipping}
                />{" "}
                <span className="ml-1">Envío Gratis</span>
            </div>
        );
    };

    return (
        <div className={list ? "product-tags" : "product-info my-2"}>
            {type == "IMMEDIATE" ? <Immediate /> : null}
            {type == "TODAY" ? <Today /> : null}
            {type == "TOMORROW" ? <Tomorrow /> : null}
            {type == "AFTER_TOMORROW" ? <AfterTomorrow /> : null}
            {type == "AFTER_TOMORROW_CUSTOM" ? <AfterTomorrowCustom /> : null}
            {"has_free_shipping" in product &&
            product.has_free_shipping == true ? (
                <FreeShipping />
            ) : null}
        </div>
    );
};

export default IsImmediateLabel;
