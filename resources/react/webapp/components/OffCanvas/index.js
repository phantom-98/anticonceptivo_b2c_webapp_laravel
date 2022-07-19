import React from 'react';
import CloseSvg from "../../assets/images/icons/header/close-modal.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OffCanvas = ({children, showCanvas, closeCanvas, width= 341 }) => {

    return (
        <div className={`offcanvas-block ${showCanvas ? 'show' : ''}`} style={{maxWidth: width +'px'}}>
            <div className="pointer mb-2 text-right" onClick={closeCanvas}>
                <LazyLoadImage
                    rel="nofollow"
                    effect="blur"
                    src={CloseSvg}
                />
            </div>
            <div className="canvas-content">
                {
                    children
                }
            </div>
        </div>
    );
};

export default OffCanvas;
