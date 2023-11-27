import React, {useRef, useEffect} from 'react';
import CloseModal from "../../assets/images/icons/header/close-modal.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import logoFull from "../../assets/images/logo-full.svg";
import {Link} from "react-router-dom";
import Icon from "../../components/general/Icon";

const OffCanvas = ({children, showCanvas, closeCanvas, width= 341 }) => {

    const parentStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }

    const ref = useRef();

    useOnClickOutside(ref, () => closeCanvas());


    return (
        <div ref={ref} className={`offcanvas-block-left ${showCanvas === null ? '' : showCanvas ? 'show' : 'hide'}`} style={{maxWidth: width +'px'}}>
            <div className="pointer mb-4" style={parentStyle} onClick={closeCanvas}>
                    <Link to={PUBLIC_ROUTES.HOME.path}>
                        <Icon path={logoFull} style={{height: '30px', width: '100%'}}/>
                    </Link>
            </div>
            <div className="canvas-content">
                {
                    children
                }
            </div>
        </div>
    );

    function useOnClickOutside(ref, handler) {
        useEffect(
          () => {
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
          },
          [showCanvas]
        );
    }
};

export default OffCanvas;
