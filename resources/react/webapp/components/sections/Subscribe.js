import React, {useState} from 'react';
import bgSubscribe from '../../assets/images/sections/subscribe.png'
import * as Services from "../../Services";

const Subscribe = () => {

    const defaultData = {
        subscribe_email: ''
    };

    const [data, setData] = useState(defaultData);

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const subscribe = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.SUBSCRIBE;
        let dataForm = data;
        Services.DoPost(url,dataForm).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setData(defaultData);
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
                        <div className="col-md-8">
                            <div className="input-group search-filter-button">
                                <input
                                    type="text"
                                    name='subscribe_email'
                                    className="form-control form-control-custom form-control-custom-60"
                                    placeholder="correo@hola.com"
                                    value={data.subscribe_email}
                                    onChange={(e) => handleData(e)}
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-bicolor" style={{height: '60px'}}
                                        onClick={subscribe}
                                    >
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
