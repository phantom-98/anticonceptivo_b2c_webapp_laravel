import React from 'react';
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";

const FormComercialInfo = ({handleData, 
    rutFormat, 
    rutValidate, 
    regions,
    communes,
    selectRegion,
    data, 
    title = 'Datos de Factura'}) => {

    return (
        <div className="row">

            {
                title ? <div className="col-12">
                    <h4 className="font-poppins font-16 bold color-033F5D">{title}</h4>
                </div> : null
            }

            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="business_id_number">RUT de la empresa</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="business_id_number"
                           name="business_id_number"
                           placeholder="RUT de la empresa"
                           onChange={(e) => handleData(e)}
                           value={data.business_id_number}
                           onFocus={setCleanInputError}
                           onKeyUp={rutFormat}
                           onBlur={rutValidate}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="business_name">Razón social</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="business_name"
                           name="business_name"
                           placeholder="Razón social"
                           onChange={(e) => handleData(e)}
                           value={data.business_name}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="commercial_business">Giro</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="commercial_business"
                           name="commercial_business"
                           placeholder="Giro"
                           onChange={(e) => handleData(e)}
                           value={data.commercial_business}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="commercial_region_id">Región</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="commercial_region_id"
                        name="commercial_region_id"
                        onChange={(e) => selectRegion(e)}
                        value={data.commercial_region_id}
                        >
                            <option value={null}></option>
                        {
                            regions.map(region => {
                                return(
                                    <option value={region.id} key={region.id}>{region.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="commercial_commune_id">Comuna</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="commercial_commune_id"
                        name="commercial_commune_id"
                        onChange={(e) => handleData(e)}
                        value={data.commercial_commune_id}
                        >
                            <option value={null}></option>
                        {
                            communes.map(commune => {
                                return(
                                    <option value={commune.id} key={commune.id}>{commune.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="commercial_address">Dirección</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="commercial_address"
                           name="commercial_address"
                           placeholder="Dirección"
                           onChange={(e) => handleData(e)}
                           value={data.commercial_address}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="commercial_additional_address">Número casa / depto</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="commercial_additional_address"
                           name="commercial_additional_address"
                           placeholder="Número casa / depto"
                           onChange={(e) => handleData(e)}
                           value={data.commercial_additional_address}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="commercial_phone_code">Código</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="commercial_phone_code"
                        name="commercial_phone_code"
                    >
                        <option value="+56">+56</option>
                    </select>
                </div>
            </div>
            <div className="col-md-9">
                <div className="form-group">
                    <label htmlFor="commercial_phone">Teléfono</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="commercial_phone"
                           name="commercial_phone"
                           placeholder="987 654 321"
                           onChange={(e) => handleData(e)}
                           value={data.commercial_phone}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="commercial_email">E-Mail Contacto</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="commercial_email"
                           name="commercial_email"
                           placeholder="E-Mail Contacto"
                           onChange={(e) => handleData(e)}
                           value={data.commercial_email}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

        </div>
    );
};

export default FormComercialInfo
