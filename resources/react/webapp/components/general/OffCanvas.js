import React, {Fragment} from 'react';
import closeModal from "../../assets/images/icons/close-modal.svg";
import {CONFIG} from "../../Config";

const OffCanvas = ({children, showCanvas, closeCanvas, width = 396}) => {
    return (
        <Fragment>

            {
                showCanvas ? <div className="fade modal-backdrop show" onClick={closeCanvas} /> : null
            }
            <div className={`offcanvas-block ${showCanvas ? 'show' : ''}`} style={{maxWidth: width + 'px'}}>
                <div className="pointer mb-2 text-right" onClick={closeCanvas}>
                    <img src={closeModal} rel="nofollow" alt={CONFIG.APP_NAME}/>
                </div>
                <div className="canvas-content">
                    {
                        children
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default OffCanvas;
