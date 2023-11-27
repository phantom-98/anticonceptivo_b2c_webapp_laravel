import React, {useContext, useEffect, useState} from 'react';
import FormPersonalData from "./FormPersonalData";
import H3Panel from "../../../../../components/general/H3Panel";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import RutValidator from "w2-rut-validator";
import {setInputError, setCleanInputErrorById} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
const PersonalInfo = () => {

    const {auth, updateAuth} = useContext(AuthContext);
    const { breakpoint } = useContext(AppContext)

    const defaultData = {
        first_name: '',
        last_name: '',
        email: '',
        id_number: '',
        id_type: '',
        phone_code: '',
        phone: '',
        password: '',
        new_password: '',
    }

    const [data, setData] = useState(defaultData);
    const [rutFlag, setRutFlag] = useState(false);

    useEffect(() => {
        if (auth) {
            setData(auth);
        }
    },[auth])

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckBox = (e) => {
        if (e.target.id == 'custom-inline-radio-rut') {
            if ((data.id_number).length > 0) {
                if (!RutValidator.validate(data.id_number)) {
                    setRutFlag(true);
                    setInputError('id_number', 'El formato del RUT no es correcto.')
                }else{
                    setRutFlag(false);
                }
            }
            setData({
                ...data,
                [e.target.name]: 'RUT'
            })
        }

        if (e.target.id == 'custom-inline-radio-dni') {
            if ((data.id_number).length > 0) {
                if (!RutValidator.validate(data.id_number)) {
                    setCleanInputErrorById('id_number')
                }
            }
            setRutFlag(false);
            setData({
                ...data,
                [e.target.name]: 'DNI'
            })
        }
    }

    const updateData = () => {
        if (rutFlag) {
            toastr.warning('El formato del rut es incorrecto.','Perfil no actualizado.');
        }else{
            let url = Services.ENDPOINT.CUSTOMER.PROFILE.UPDATE;

            Services.DoPost(url, data).then(response => {
                Services.Response({
                response: response,
                success: () => {
                    updateAuth(response.data.customer);
                    toastr.success(response.message);
                },
                });
            }).catch(error => {
                Services.ErrorCatch(error)
            });
        }
    }

    const RutFormat = e => {
        let clean = (e.target.value).replace(/[^0-9Kk]/g, '');
        clean = clean.toString().toUpperCase();

        if (clean.length < 14) {
            setData({
                ...data,
                [e.target.name]: RutValidator.format(clean)
            });
        }
    }
    const RutValidate = e => {
        if ((e.target.value).length > 0) {
            if (!RutValidator.validate(e.target.value)) {
                setRutFlag(true);
                setInputError(e.target.id, 'El formato del RUT no es correcto.')
            }else{
                setRutFlag(false);
            }
        }
    }
    
    return (
        <div className="row" style={{marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' :'0px'}}>

            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? <H3Panel title="EDITAR PERFIL" /> : null
            }

            <div className="col-md-12 mb-5">
                <div className={breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 'panel-bordered' : ''}>
                    <FormPersonalData
                        handleData={handleData}
                        handleCheckBox={handleCheckBox}
                        rutFormat={RutFormat}
                        rutValidate={RutValidate}
                        data={data}
                    />
                </div>
            </div>

            <div className="col-md-12 text-right d-none d-sm-block">
                <button type="button" className="btn btn-bicolor px-5"
                        onClick={() => updateData()}>
                    <span>GUARDAR CAMBIOS</span>
                </button>
            </div>
            <div className="col-md-12 text-center d-block d-sm-none">
                <button type="button" className="btn btn-bicolor px-5"
                    onClick={() => updateData()} style={{ width: '100%' }}>
                    <span>GUARDAR CAMBIOS</span>
                </button>
            </div>
        </div>
    );
};

export default PersonalInfo
