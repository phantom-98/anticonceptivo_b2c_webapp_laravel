import React from 'react';
import CloseSvg from "../../assets/images/icons/header/close-modal.svg";

const OffCanvas = ({children, showCanvas, closeCanvas, width= 341 }) => {

    return (
        <div className={`offcanvas-block ${showCanvas ? 'show' : ''}`} style={{maxWidth: width +'px'}}>
            <div className="pointer mb-2 text-right" onClick={closeCanvas}>
                <img src={CloseSvg} rel="nofollow"/>
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
