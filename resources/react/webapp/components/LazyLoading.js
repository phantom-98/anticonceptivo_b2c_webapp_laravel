import React from 'react';
import logo from '../assets/images/logo-full.svg'

const LazyLoading = ({height = '100vh'}) => {

    let style = {};

    if (height) {
        style = {
            height: height
        }
    }

    return (


        <div className="w-100 d-flex" style={style}>
            <div className="m-auto text-center">
                
                <img className="py-2 pulse-effect" src={logo} alt="anticonceptivo.cl"/>

                <br/>

                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

            </div>
        </div>
    );
};

export default LazyLoading;
