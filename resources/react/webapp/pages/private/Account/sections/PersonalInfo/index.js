import React from 'react';
import ReactDOM from 'react-dom';
import FormPersonalData from "./FormPersonalData";
import H3Panel from "../../../../../components/general/H3Panel";
import {ModalAuthMode} from "../../../../../Globals";
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

            <div className="col-md-12 mb-5 text-right">
                <button type="button" className="btn btn-bicolor btn-auth px-5"
                        onClick={() => alert('UPDATE DATA')}>
                    <span>GUARDAR CAMBIOS</span>
                </button>
            </div>
        </div>
    );
};

export default PersonalInfo
