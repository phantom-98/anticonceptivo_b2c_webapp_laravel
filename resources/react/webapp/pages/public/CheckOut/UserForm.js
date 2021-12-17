import React, {Fragment, useContext, useState} from 'react';
import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
import {setInputError, setCleanInputErrorById} from "../../../helpers/GlobalUtils";
import RutValidator from "w2-rut-validator";
import {Form} from "react-bootstrap";
import {AuthContext} from "../../../context/AuthProvider";
import {Accordion, Card, InputGroup} from "react-bootstrap";
import {CartContext} from "../../../context/CartProvider";
import {formatMoney} from "../../../helpers/GlobalUtils";
import {CONFIG} from "../../../Config";
import {v4 as uuidv4} from 'uuid';
import recipeBlue from '../../../assets/images/icons/recipe-blue.svg'

const UserForm = ({
                      setView,
                      data,
                      setData,
                      setFiles,
                      files,
                      editable,
                      setProductCount,
                      rutFlag,
                      setRutFlag,
                      prescriptionRadio,
                      setPrescriptionRadio,
                      withoutPrescriptionAnswer,
                      setWithoutPrescriptionAnswer
                  }) => {

        const {cartItems} = useContext(CartContext);

        const handleData = (e, onlyText = false, phone = false) => {
            if (phone) {
                if (e.target.value.match("^$|^[0-9]+$")) {
                    setData({
                        ...data,
                        [e.target.id]: e.target.value
                    })
                }
            }

            if (onlyText) {
                if (e.target.value.match('^$|^[a-zA-Z ]+$')) {
                    setData({
                        ...data,
                        [e.target.id]: e.target.value
                    })
                }
            }

            if (!onlyText && !phone) {
                setData({
                    ...data,
                    [e.target.id]: e.target.value
                })
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
                } else {
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
                    } else {
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
            let file = e.target.files[0];

            file.product_id = parseInt(e.target.id);
            file.name_id = parseInt(e.target.name);

            let list = [...files];


            if (files.find(x => x.name_id == parseInt(e.target.name))) {
                let found = files.findIndex(x => x.name_id == parseInt(e.target.name));
                list.splice(found, 1, e.target.files[0]);
            } else {
                list.push(e.target.files[0]);
            }

            setFiles(list);
            console.log(list)
            console.log(JSON.stringify(list))
            console.log(JSON.parse(list))
            localStorage.setItem('files_checkout', JSON.parse(JSON.stringify(list)));
        }

        const handlePrescriptionRadio = (status) => {
            setPrescriptionRadio(status);
            if (status) {
                setWithoutPrescriptionAnswer(null);
            }
        }

        return (
            <Fragment>
                {
                    !cartItems.filter((item) => item.product.recipe_type != 'Venta Directa').length ?
                        null :
                        <>
                            <div className="panel panel-cart mb-3">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-auto">
                                            <img src={recipeBlue} alt="anticonceptivo.cl" rel="nofollow"/>
                                        </div>
                                        <div className="col px-0">
                                            <p className="font-18 lh-18 font-poppins bold color-033F5D mb-0">Receta</p>
                                            <p className="font-16 font-poppins regular color-707070 mb-0">¿Tienes tu
                                                receta?</p>
                                        </div>
                                        <div className="col-auto">
                                            <div className="row pt-3">
                                                <div className="col pl-0">
                                                    <Form.Check
                                                        custom
                                                        label="Si"
                                                        type="radio"
                                                        className="right"
                                                        name="prescription_radio"
                                                        id={`with_prescription`}
                                                        onClick={() => handlePrescriptionRadio(true)}
                                                        checked={prescriptionRadio == true}
                                                    />
                                                </div>
                                                <div className="col pl-0">
                                                    <Form.Check
                                                        custom
                                                        label="No"
                                                        type="radio"
                                                        className="right"
                                                        name="prescription_radio"
                                                        id={`without_prescription`}
                                                        onClick={() => handlePrescriptionRadio(false)}
                                                        checked={prescriptionRadio != true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        prescriptionRadio ? null :
                                            <div className="row">
                                                <div className="col-12 mt-4">
                                                    <p className="font-14 font-poppins regular color-033F5D mb-2">
                                                        Selecciona una de estas opciones
                                                    </p>
                                                </div>
                                                <div className="col-md-12 py-2">

                                                    <div
                                                        className={`pointer receipt-motive ${withoutPrescriptionAnswer === 1 ? 'receipt-motive-active' : ''}`}
                                                        onClick={() => setWithoutPrescriptionAnswer(1)}
                                                    >
                                                        <div className="row">
                                                            <div className="col-auto d-flex pr-0">
                                                                <span
                                                                    className="my-auto font-18 lh-18 font-poppins bold color-033F5D">
                                                                    A
                                                                </span>
                                                            </div>
                                                            <div className="col d-flex">
                                                                <span
                                                                    className="my-auto font-13 font-poppins regular color-033F5D">
                                                                    Mi doctor me dijo que siguiera con este, pero no me renovó la receta.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 py-2">

                                                    <div
                                                        className={`pointer receipt-motive ${withoutPrescriptionAnswer === 2 ? 'receipt-motive-active' : ''}`}
                                                        onClick={() => setWithoutPrescriptionAnswer(2)}
                                                    >
                                                        <div className="row">
                                                            <div className="col-auto d-flex pr-0">
                                                                <span
                                                                    className="my-auto font-18 lh-18 font-poppins bold color-033F5D">
                                                                    B
                                                                </span>
                                                            </div>
                                                            <div className="col d-flex">
                                                                <span
                                                                    className="my-auto font-13 font-poppins regular color-033F5D">
                                                                    Es el que me recetaron y he tomado, pero ya no cuento con la receta.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 py-2">
                                                    <div className="note-receipt">
                                                        <div className="row">
                                                            <div className="col d-flex">
                                                                <span
                                                                    className="my-auto font-13 font-poppins regular color-033F5D">
                                                                    (*) Opciones validadas por el Farmacéutico, sólo son excepciones y no reemplazan por ningún motivo la atención con un médico o matrona.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>

                            {
                                !prescriptionRadio ? null :
                                    <div className="panel panel-cart mb-3">
                                        <div className="panel-body mobile-panel-recipe">
                                            <div className="row">
                                                {
                                                    cartItems.map((item, index) => {

                                                        if (item.product.recipe_type != 'Venta Directa') {
                                                            return <div key={uuidv4()}
                                                                        id="first_name_focus"
                                                                        className="col-12 product-item">
                                                                <div className="row">
                                                                    <div className="col-auto pr-0">
                                                                        <img alt={CONFIG.APP_NAME}
                                                                             style={{height: '38px'}}
                                                                             src={item.product.images ? item.product.images[0].public_file : null}/>
                                                                    </div>
                                                                    <div className="col d-flex">
                                                                        <div
                                                                            className="font-poppins font-14 bold text-black my-auto">
                                                                            {
                                                                                item.subscription == null ? item.product.name : item.product.name + ' (' + 'suscripción' + ')'
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12 mb-2" id='last_name_focus'>
                                                                        <div className="custom-file"
                                                                             style={{height: "47px"}}>
                                                                            <input type="file"
                                                                                   className="my-auto custom-file-input"
                                                                                   id={item.product.id}
                                                                                   name={index}
                                                                                   onChange={handleFile}
                                                                                   accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"/>
                                                                            <div id={`attachments.${index}`}/>
                                                                            <div className="invalid-feedback"/>
                                                                            <label htmlFor={item.product.id}
                                                                                   className="custom-file-label ml-0 pb-0 input-file-register d-flex">
                                                                                {
                                                                                    files.length > 0 ? files.map((file) => {
                                                                                        return file.name_id == index ?
                                                                                            <span key={uuidv4}
                                                                                                  className="font-14 font-poppins regular my-auto">{file.name}</span>
                                                                                            : null
                                                                                    }) : <span key={uuidv4}
                                                                                               className="font-14 font-poppins regular my-auto">Carga tu receta</span>
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }
                        </>

                }


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

                {/* <div className="row">
                <div className="col-md-6 pb-5">

                </div>
            </div> */}
            </Fragment>
        );
    }
;

export default UserForm
