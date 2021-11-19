import React, {useContext, useEffect, useState} from 'react';
import FormPersonalData from "./FormPersonalData";
import H3Panel from "../../../../../components/general/H3Panel";
// import FormComercialInfo from "./FormComercialInfo";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import RutValidator from "w2-rut-validator";
import {setInputError, setCleanInputErrorById} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

const PersonalInfo = () => {

    const {auth, updateAuth} = useContext(AuthContext);

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
        // business_name: '',
        // business_id_number: '',
        // commercial_business: '',
        // commercial_email: '',
        // commercial_address: '',
        // commercial_additional_address:'',
        // commercial_phone: '',
        // commercial_phone_code: '',
        // commercial_region_id: '',
        // commercial_commune_id: '',
    }

    const [data, setData] = useState(defaultData);

    // const [selectedRegion, setSelectedRegion] = useState(0);
    // const [regions, setRegions] = useState([]);
    // const [communes, setCommunes] = useState([]);

    const [rutFlag, setRutFlag] = useState(false);

    useEffect(() => {
        if (auth) {
            setData(auth);
            // getData();
        }
    },[auth])

    // useEffect(() => {
    //     if (regions.length > 0) {
    //         setSelectedRegion(data.commercial_region_id)
    //     }
    // },[regions])

    // useEffect(() => {
    //     if (selectedRegion) {
    //         const region = regions.find(r => r.id == selectedRegion)
    //         let tempCommunes = [];
    //         region.provinces.map((province) =>{
    //             province.communes.map((commune) =>{
    //                 tempCommunes.push(commune);
    //             })
    //         })
    //         let orderCommunes =  tempCommunes.sort((a, b)  => {
    //             const commA = a.name.toLowerCase();
    //             const commB = b.name.toLowerCase();

    //             let comparison = 0;
    //             if (commA > commB) {
    //                 comparison = 1;
    //             } else if (commA < commB) {
    //                 comparison = -1;
    //             }
    //             return comparison;
    //         })

    //         setCommunes(orderCommunes);

    //     }
    // }, [selectedRegion]);

    // const selectRegion = (e) => {
    //     const region = regions.find(r => r.id == e.target.value)
    //     setData({
    //         ...data,
    //         commercial_region_id : region.id,
    //         commercial_commune_id: null
    //     })
    //     setSelectedRegion(e.target.value)
    // }

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

    // const getData = () => {
    //     let url = Services.ENDPOINT.CUSTOMER.PROFILE.GET;
    //     let dataForm = {
    //         customer_id: auth.id
    //     }

    //     Services.DoPost(url, dataForm).then(response => {
    //         Services.Response({
    //         response: response,
    //         success: () => {
    //             // setData(response.data.customer);
    //             // setRegions(response.data.regions);
    //         },
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

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
    const { height, width } = UseWindowDimensions();

    return (
        <div className="row" style={{marginTop: width<=980 ? '0px' :'-50px'}}>

            {
                width < 768 ? null : <H3Panel title="EDITAR PERFIL" />
            }

            <div className="col-md-12 mb-5">
                <div className={width < 768 ? '' : 'panel-bordered'}>
                    <FormPersonalData
                        handleData={handleData}
                        handleCheckBox={handleCheckBox}
                        rutFormat={RutFormat}
                        rutValidate={RutValidate}
                        data={data}
                    />
                </div>
            </div>

            {/* <div className="col-md-12 mb-5">
                <div className="panel-bordered">
                    <FormComercialInfo
                        handleData={handleData}
                        rutFormat={RutFormat}
                        rutValidate={RutValidate}
                        regions={regions}
                        communes={communes}
                        selectRegion={selectRegion}
                        data={data}
                    />
                </div>
            </div> */}

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
