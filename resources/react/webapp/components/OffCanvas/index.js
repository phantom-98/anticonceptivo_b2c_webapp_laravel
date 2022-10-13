import React from 'react';
import CloseModal from "../../assets/images/icons/header/close-modal.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OffCanvas = ({children, showCanvas, closeCanvas, width= 341 }) => {

    return (
        <div className={`offcanvas-block-left ${showCanvas === null ? '' : showCanvas ? 'show' : 'hide'}`} style={{maxWidth: width +'px'}}>
            <div className="pointer mb-2 text-right" onClick={closeCanvas}>
                <LazyLoadImage
                    rel="nofollow"
                    effect="blur"
                    src={CloseModal}
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
