import React, {Fragment} from 'react';
import {Form} from "react-bootstrap";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";

const FormPersonalData = ({handleData,
    handleCheckBox,
    rutFormat,
    rutValidate,
    data,
    password = true,
    editable = false
    }) => {

    var inputProps =  {};

    if (data.id_type === 'RUT') {
        inputProps.onKeyUp = rutFormat;
        inputProps.onBlur = rutValidate;
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="first_name">Nombres</label>
                    <input type="text"
                            className="form-control form-control-custom"
                            id="first_name"
                            name="first_name"
                            onChange={(e) => handleData(e,true)}
                            value={data.first_name}
                            placeholder="Nombres"
                            onFocus={setCleanInputError}
                            disabled={editable}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="last_name">Apellidos</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="last_name"
                           name="last_name"
                           placeholder="Apellidos"
                           onChange={(e) => handleData(e, true)}
                           value={data.last_name}
                           onFocus={setCleanInputError}
                           disabled={editable}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="email"
                           name="email"
                           placeholder="E-Mail"
                           onChange={(e) => handleData(e)}
                           value={data.email}
                           onFocus={setCleanInputError}
                           disabled={editable}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    {/*<label htmlFor="id_number">RUT</label>*/}
                    <div className="">
                        <Form.Check
                            custom
                            inline
                            label="RUT"
                            type="radio"
                            name="id_type"
                            id={`custom-inline-radio-rut`}
                            onClick={(e) => handleCheckBox(e)}
                            checked={data.id_type === 'RUT' ? true : false}
                            disabled={editable}
                        />
                        <Form.Check
                            custom
                            inline
                            label="DNI"
                            type="radio"
                            name="id_type"
                            id={`custom-inline-radio-dni`}
                            onClick={(e) => handleCheckBox(e)}
                            checked={data.id_type === 'DNI' ? true : false}
                            disabled={editable}
                        />
                    </div>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="id_number"
                           name="id_number"
                           placeholder=""
                           onChange={(e) => handleData(e)}
                           value={data.id_number}
                           onFocus={setCleanInputError}
                           {...inputProps}
                           disabled={editable}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

     <div className="col-md-12">
         <div className="row">
             <div className="col-md-auto pr-3 pr-md-0">
                 <div className="form-group">
                     <label htmlFor="phone_code">Código</label>
                     <select
                         className="form-control form-control-custom pl-2"
                         id="phone_code"
                         name="phone_code"
                         onChange={(e) => handleData(e)}
                         onFocus={setCleanInputError}
                         disabled={editable}
                     >
                         <option value="+56">+56</option>
                     </select>
                     <div className="invalid-feedback" />
                 </div>
             </div>
             <div className="col-md">
                 <div className="form-group">
                     <label htmlFor="phone">Teléfono</label>
                     <input type="text"
                            className="form-control form-control-custom"
                            id="phone"
                            name="phone"
                            placeholder="987654321"
                            onChange={(e) => handleData(e, false, true)}
                            value={data.phone}
                            onFocus={setCleanInputError}
                            disabled={editable}
                     />
                     <div className="invalid-feedback" />
                 </div>
             </div>
         </div>
     </div>
            {
                password ?
                    <Fragment>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password"
                                       className="form-control form-control-custom"
                                       id="password"
                                       name="password"
                                       placeholder="****"
                                       onChange={(e) => handleData(e)}
                                       onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="new_password">Nueva Contraseña</label>
                                <input type="password"
                                       className="form-control form-control-custom"
                                       id="new_password"
                                       name="new_password"
                                       placeholder="****"
                                       onChange={(e) => handleData(e)}
                                       onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                            </div>
                        </div>
                    </Fragment> : null
            }
        </div>
    );
};

export default FormPersonalData
