import React, {useState, useContext} from 'react';
import bgSubscribe from '../../assets/images/sections/subscribe.jpeg'
import bgSubscribeMobile from '../../assets/images/sections/subscribe-mobile-min.jpg'
import UseWindowDimensions from "../customHooks/UseWindowDimensions";
import * as Services from "../../Services";
import toastr from "toastr";
// import { AppContext } from "../../context/AppProvider";
// import {BREAKPOINTS} from "../../helpers/vars";
const Subscribe = () => {

    // const {breakpoint} = useContext(AppContext)
    const { height, width } = UseWindowDimensions();
    // especific breakpoint

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
                toastr.success(response.message);
                setData(defaultData);
            },
                validate: () => {
                    toastr.error('Ingrese un email válido');
                }
            });
        }).catch(error => {
            toastr.error(response.message);
        });
    }

    return (
        <div className="suscribe" style={{backgroundImage: width >= 620 ? `url(${bgSubscribe})` : `url(${bgSubscribeMobile})`, height: 318}}>
            <div className="py-5">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12 mt-2 mb-4">
                            <h3 className="font-poppins subscribe-font text-white bold mb-3">
                                Mantente informado con nuestras promociones y <br/>
                                novedades pensadas para tu bienestar.
                            </h3>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <div className="input-group search-filter-button">
                                <input
                                    type="text"
                                    name='subscribe_email'
                                    className="form-control form-control-custom-subscribe form-control-custom-60"
                                    placeholder="correo@hola.com"
                                    value={data.subscribe_email}
                                    onChange={(e) => handleData(e)}
                                />
                                <div className="input-group-append ">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-bicolor" style={{height: '60px', zIndex: '0'}}
                                        onClick={subscribe}
                                    >
                                        <span className="font-poppins subscribe-btn-font bold text-white px-3">Suscribirme</span>
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
