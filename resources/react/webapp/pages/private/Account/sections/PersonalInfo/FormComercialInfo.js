import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from "react-bootstrap";

const FormComercialInfo = ({title = 'Datos de Factura'}) => {
    return (
        <div className="row">

            {
                title ? <div className="col-12">
                    <h4 className="font-poppins font-16 bold color-033F5D">{title}</h4>
                </div> : null
            }

            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="company_name">Empresa</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="company_name"
                           name="company_name"
                           placeholder="Empresa"
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="company_id_number">RUT de la empresa</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="company_id_number"
                           name="company_id_number"
                           placeholder="RUT de la empresa"
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="company_business_name">Razón social</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="company_business_name"
                           name="company_business_name"
                           placeholder="Razón social"
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="company_business_type">Giro</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="company_business_type"
                           name="company_business_type"
                           placeholder="Giro"
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="region_id">Región</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="region_id"
                        name="region_id">
                        <option value="5">REGIÓN DE VALPARAÍSO</option>
                    </select>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="commune_id">Comuna</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="commune_id"
                        name="commune_id">
                        <option value="5">Viña del Mar</option>
                    </select>
                </div>
            </div>

            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="address"
                           name="address"
                           placeholder="Dirección"
                    />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="address_number">Número casa / depto</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="address_number"
                           name="address_number"
                           placeholder="Número casa / depto"
                    />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="phone_code">Código</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="phone_code"
                        name="phone_code"
                    >
                        <option value="+56">+56</option>
                    </select>
                </div>
            </div>

            <div className="col-md-9">
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="phone"
                           name="phone"
                           placeholder="987 654 321"
                    />
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="contact_name">Nombre Contacto</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="contact_name"
                           name="contact_name"
                           placeholder="Nombre Contacto"
                    />
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="contact_email">E-Mail Contacto</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="contact_email"
                           name="contact_email"
                           placeholder="E-Mail Contacto"
                    />
                </div>
            </div>

        </div>
    );
};

export default FormComercialInfo
