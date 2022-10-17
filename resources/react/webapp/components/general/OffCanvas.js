import React, {Fragment} from 'react';
import CloseModal from "../../assets/images/icons/header/close-modal.svg";
import {CONFIG} from "../../Config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OffCanvas = ({children, showCanvas, closeCanvas, width = 396}) => {
    return (
        <Fragment>


            <div className={`offcanvas-block ${showCanvas ? 'show' : ''}`} style={{maxWidth: width + 'px'}}>
                <div className="pointer mb-2 text-right" onClick={closeCanvas}>
                    <LazyLoadImage
                        alt={CONFIG.APP_NAME}
                        effect="blur"
                        src={CloseModal}
                    />
                </div>
                <div className="canvas-content px-4">
                    {
                        children
                    }
                </div>
            </div>

            {
                showCanvas ? <div className="fade modal-backdrop show" onClick={closeCanvas} /> : null
            }
        </Fragment>
    );
};

export default OffCanvas;
