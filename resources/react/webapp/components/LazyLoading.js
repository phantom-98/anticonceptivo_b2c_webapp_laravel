import React from 'react';
import logo from '../assets/images/logo.svg'

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
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <br/>

                <img className="py-2" src={logo} alt="anticonceptivo.cl"/>
            </div>
        </div>
    );
};

export default LazyLoading;
