import React, {Fragment, useState, useContext} from 'react';
import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
import {setInputError, setCleanInputErrorById} from "../../../helpers/GlobalUtils";
import RutValidator from "w2-rut-validator";
import * as Services from "../../../Services";
import {AuthContext} from "../../../context/AuthProvider";
import {Accordion, Card} from "react-bootstrap";
import {CartContext} from "../../../context/CartProvider";
import {formatMoney} from "../../../helpers/GlobalUtils";
import {CONFIG} from "../../../Config";
import {v4 as uuidv4} from 'uuid';

const UserForm = ({setView, data, setData, setFile, editable}) => {

    const {auth} = useContext(AuthContext);
    const {cartItems} = useContext(CartContext);

    // const [showBilling, setShowBilling] = useState(false);
    const [rutFlag, setRutFlag] = useState(false);
    
    // const [selectedRegion, setSelectedRegion] = useState(0);
    // const [regions, setRegions] = useState([]);
    // const [communes, setCommunes] = useState([]);

    // useEffect(() => {
    //     getRegions();
    // },[])

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

    // const getRegions = () => {
    //     let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.GET_RESOURCES;
    //     let dataForm = {
    //         // customer_id: auth.id
    //     }

    //     Services.DoPost(url, dataForm).then(response => {
    //         Services.Response({
    //         response: response,
    //         success: () => {
    //             // setData(response.data.customer);
    //             setRegions(response.data.regions);
    //         },
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

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
            [e.target.id]: e.target.value
        })
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

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const validateData = () => {
        if (rutFlag) {
            toastr.warning('El formato del rut es invalido.','Perfil no actualizado.');
        }else{
            let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;
            let dataForm = {
                ...data,
                step: 1,
            }

            Services.DoPost(url, dataForm).then(response => {
                Services.Response({
                response: response,
                success: () => {
                    setView('add-address')
                },
                });
            }).catch(error => {
                Services.ErrorCatch(error)
            });
        }
    }

    const hasAddress = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    if (response.data.addresses.length) {
                        setView('addresses');
                    }else{
                        setView('add-address');
                    }
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <Accordion defaultActiveKey={'#'}>
                <Card className="panel panel-cart my-4">
                    <Accordion.Toggle as={Card.Header} eventKey={'#'} style={{backgroundColor: 'white'}}>
                        <h3 className="my-auto font-poppins font-16 bold color-033F5D mb-0" style={{backgroundColor: 'white'}}>
                            Subir receta
                        </h3>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={'#'}>
                        <Card.Body>
                            {
                                cartItems.map((item) => {
                                    let prescriptionKey = uuidv4();
                                    return item.product.recipe_type != 'Venta Directa'  ? (
                                        <div className="col-12 product-item" key={prescriptionKey}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img src={item.product.images ? item.product.images[0].public_file : null} alt={CONFIG.APP_NAME} style={{width: '77px'}}/>
                                                </div>
                                                <div className="col-md-9 mb-3">

                                                    <div className="font-poppins font-12 color-009BE8">{item.product.sku}</div>
                                                    <div className="font-poppins font-14 bold text-black"> 
                                                    
                                                    {
                                                        item.subscription == null ? item.product.name : item.product.name + ' ('+ 'suscripción' +')'
                                                    }
                                                    
                                                    </div>
                                                    <div className="font-poppins font-16 bold color-009BE8">

                                                        {
                                                            item.subscription == null ? formatMoney( item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price)) : formatMoney(item.subscription.price*item.subscription.quantity * item.quantity) + ' ('+ formatMoney(item.subscription.price)+' c/u)'
                                                        }
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-2">
                                                    <input 
                                                        type="file"  
                                                        className="my-auto file-input"
                                                        onChange={handleFile}
                                                    />
                                                </div>
                                            </div>
                                            <div className="line" />
                                        </div>
                                    ) : null
                                })
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            {/* <div className="panel panel-cart mb-3">
                <div className="panel-body" style={{ paddingTop : '11px', paddingBottom : '10px'}}>
                   <div className="row">
                       <div className="col d-flex">
                        
                       </div>
                   </div>
                </div>
            </div> */}
            <div className="panel panel-cart mb-3">
                <div className="panel-body">
                    <FormPersonalData
                        data={data}
                        handleData={handleData}
                        handleCheckBox={handleCheckBox}
                        rutFormat={RutFormat}
                        rutValidate={RutValidate}
                        password={false}
                        editable={editable}
                    />
                </div>
            </div>
            {/* <div className="panel panel-cart mb-3">
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
                            <FormComercialInfo 
                                data={data}
                                handleData={handleData}
                                rutFormat={RutFormat}
                                rutValidate={RutValidate}
                                regions={regions}
                                communes={communes}
                                selectRegion={selectRegion}
                                title={''}
                            />
                        : null
                    }
                </div>
            </div> */}
            <div className="row">
                <div className="col-md-6">
                    {/*<button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>*/}
                    {/*    <span className="font-12">{"< Volver a paso anterior"}</span>*/}
                    {/*</button>*/}
                </div>
                <div className="col-md-6">
                    <button className="btn btn-bicolor btn-block" onClick={ auth ? () =>  hasAddress() : () => validateData()}>
                        <span className="font-14 px-5">CONTINUAR</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default UserForm
