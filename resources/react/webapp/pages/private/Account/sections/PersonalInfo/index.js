import React from 'react';
import FormPersonalData from "./FormPersonalData";
import H3Panel from "../../../../../components/general/H3Panel";
import FormComercialInfo from "./FormComercialInfo";

const PersonalInfo = () => {
    return (
        <div className="row">

            <H3Panel title="EDITAR PERFIL"/>

            <div className="col-md-12 mb-5">
                <div className="panel-bordered">
                    <FormPersonalData/>
                </div>
            </div>

            <div className="col-md-12 mb-5">
                <div className="panel-bordered">
                    <FormComercialInfo/>
                </div>
            </div>

            <div className="col-md-12 text-right">
                <button type="button" className="btn btn-bicolor  px-5"
                        onClick={() => alert('UPDATE DATA')}>
                    <span>GUARDAR CAMBIOS</span>
                </button>
            </div>
        </div>
    );
};

export default PersonalInfo
