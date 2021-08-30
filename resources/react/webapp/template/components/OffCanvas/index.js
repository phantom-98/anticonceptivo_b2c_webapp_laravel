import React from 'react';
import CloseSvg from "../../../assets/images/icons/header/close-modal-blue.svg";

const OffCanvas = ({children, showCanvas, closeCanvas}) => {

    return (
        <div className={`offcanvas-block-left ${showCanvas ? 'show' : ''}`} style={{maxWidth: '100%' +'px'}}>
            <div className="row mb-2">
                <div className="col-8">
                    <span className="font-18 bold font-poppins color-0869A6" style={{letterSpacing: '5px'}}>Categorías</span>
                </div>
                <div className="col-4 pointer mb-2 text-right"onClick={closeCanvas}>
                    <img src={CloseSvg} rel="nofollow"/>
                </div>
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
