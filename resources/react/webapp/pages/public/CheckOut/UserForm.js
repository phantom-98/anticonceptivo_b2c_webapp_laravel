import React, {Fragment, useState} from 'react';
import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
import FormPersonalDataDELETE from "../../private/Account/sections/PersonalInfo/FormPersonalDataDELETE";
import FormComercialInfo from "../../private/Account/sections/PersonalInfo/FormComercialInfo";
import {CONFIG} from "../../../Config";

const UserForm = ({setView}) => {
    const [showBilling, setShowBilling] = useState(false)
    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">
                    <FormPersonalDataDELETE/>
                </div>
            </div>
            <div className="panel panel-cart mb-3">
                <div className="panel-body" style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <div className="row pointer" onClick={() => setShowBilling(!showBilling)}>
                        <div className="col">
                            <h3 className="font-poppins font-16 bold color-033F5D mb-0">¿Necesitas factura?</h3>
                        </div>
                        <div className="col-auto">
                            {
                                showBilling ?
                                    <img src="/themes/web/assets/images/up.svg" alt={CONFIG.APP_NAME}/>
                                    :
                                    <img src="/themes/web/assets/images/down.svg" alt={CONFIG.APP_NAME}/>
                            }
                        </div>
                    </div>

                    {
                        showBilling ?
                            <FormComercialInfo title={null}/>
                            : null
                    }
                </div>
            </div>

            <div className="panel panel-cart mb-3">
                <div className="panel-body" style={{ paddingTop : '11px', paddingBottom : '10px'}}>
                   <div className="row">
                       <div className="col-auto d-flex">
                           <h3 className="my-auto font-poppins font-16 bold color-033F5D mb-0">Subir receta</h3>
                       </div>
                       <div className="col d-flex">
                           <input type="file" className="my-auto file-input"/>
                       </div>
                       <div className="col-auto d-flex">
                           <button className="btn btn-bicolor btn-block" onClick={() => alert('SUBIR')}>
                               <span className="font-14 px-5">SUBIR</span>
                           </button>
                       </div>
                   </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    {/*<button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>*/}
                    {/*    <span className="font-12">{"< Volver a paso anterior"}</span>*/}
                    {/*</button>*/}
                </div>
                <div className="col-md-6">
                    <button className="btn btn-bicolor btn-block" onClick={() => setView('add-address')}>
                        <span className="font-14 px-5">CONTINUAR</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default UserForm
