import React from 'react';
import logo from '../assets/images/logo-full.svg'
import logoGif from '../assets/images/logo-spinner.gif';

const LazyLoading = ({height = '100vh', style = {}}) => {

    if (height) {
        style = {
            ...style,
            height: height,
            paddingBottom: 'calc(100vh / 2)',
        }
    }

    return (


        <div className="w-100 d-flex" style={style}>
            <div className="m-auto text-center">

                <img className="py-2 responsive-d-none" src={logo} alt="anticonceptivo.cl" style={{width: 310}}/>

                <br/>

                <div className="spinner-border text-secondary responsive-d-none text-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <img className="py-2 responsive-d-display" src={logoGif} alt="anticonceptivo.cl" style={{width: 50}}/>

            </div>
        </div>
    );
};

export default LazyLoading;
