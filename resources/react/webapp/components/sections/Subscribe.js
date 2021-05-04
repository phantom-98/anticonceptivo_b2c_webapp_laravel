import React from 'react';
import bgSubscribe from '../../assets/images/sections/subscribe.png'

const Subscribe = () => {
    return (
        <div className="suscribe" style={{backgroundImage: `url(${bgSubscribe})`}}>
            <div className="py-5">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="font-poppins font-25 text-white bold mb-3">
                                Mantente informado con nuestras promociones y <br/>
                                novedades pensadas para tu bienestar.
                            </h3>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group search-filter-button">
                                <input type="text"
                                       className="form-control form-control-custom form-control-custom-60"
                                       placeholder="correo@hola.com"/>
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-bicolor" style={{height: '60px'}}>
                                        <span className="font-poppins font-18 bold text-white px-3">Suscribirme</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe
