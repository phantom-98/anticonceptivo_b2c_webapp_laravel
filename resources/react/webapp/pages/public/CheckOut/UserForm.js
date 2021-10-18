import React, {Fragment, useContext} from 'react';
import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
import {setInputError, setCleanInputErrorById} from "../../../helpers/GlobalUtils";
import RutValidator from "w2-rut-validator";
import {AuthContext} from "../../../context/AuthProvider";
import {Accordion, Card} from "react-bootstrap";
import {CartContext} from "../../../context/CartProvider";
import {formatMoney} from "../../../helpers/GlobalUtils";
import {CONFIG} from "../../../Config";
import {v4 as uuidv4} from 'uuid';

const UserForm = ({setView, data, setData, setFiles, files, editable, setProductCount, rutFlag, setRutFlag}) => {

    const {cartItems} = useContext(CartContext);

    const handleData = (e, onlyText = false, phone = false) => {
        if (phone) {
            if (e.target.value.match("^$|^[0-9]+$")) {
                setData({...data,
                    [e.target.id]: e.target.value
                }) 
            }
        }

        if (onlyText) {
            if (e.target.value.match('^$|^[a-zA-Z ]+$')) {
                setData({...data,
                    [e.target.id]: e.target.value
                })   
            }
        }

        if (!onlyText && !phone) {
            setData({...data,
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
        let file = e.target.files[0];

        file.product_id = parseInt(e.target.id);
        file.name_id = parseInt(e.target.name);

        let list = [...files];


        if (files.find(x => x.name_id == parseInt(e.target.name))) {
            let found = files.findIndex(x => x.name_id == parseInt(e.target.name));
            list.splice(found,1,e.target.files[0]);
        }else{
            list.push(e.target.files[0]);
        }

        setFiles(list);
    }

    return (
        <Fragment>
            {
                cartItems.filter((item) => item.product.recipe_type != 'Venta Directa').length ?
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
                                        cartItems.map((item, index) => {
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
                                                            <div
                                                                className="custom-file"
                                                                style={{ height: "43px" }}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    className="my-auto custom-file-input"
                                                                    id={item.product.id}
                                                                    name={index}
                                                                    // name="avatar"
                                                                    onChange={handleFile}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <label
                                                                    className="custom-file-label ml-0 pb-0 input-file-register"
                                                                    htmlFor={item.product.id}
                                                                >
                                                                    {
                                                                        files.map((file) => {
                                                                            return file.name_id == index ?
                                                                                <span className="font-14 font-poppins regular">{file.name}</span>
                                                                            :  null
                                                                        })
                                                                    }
                                                                </label>
                                                            </div>
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
                : null
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
};

export default UserForm
