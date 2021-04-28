import React, {Fragment, useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import Form from "./Form";
import LazyLoading from "../../../../components/LazyLoading";

const RegisterSelectType = ({match}) => {


    const [load, setLoad] = useState(false)
    const [type, setType] = useState('');

    useEffect(() => {

        if (match.params.type) {
            if (match.params.type == 'profesional') {
                setType('professional');
                setLoad(true)
            }else if (match.params.type == 'empresa') {
                setType('company');
                setLoad(true)
            }else{
                window.location.href = PUBLIC_ROUTES.REGISTER.path;
            }
        }

    }, [match])

    return (
        <Fragment>
            <div className="row justify-content-center">
                {
                    load ?
                        <div className="col-auto">
                            <Form authType={type}/>
                            <div className="row">
                                <div className="col py-4 text-center">
                                    <p className="font-epilogue font-14 light">¿Ya estás registrado? <Link to={PUBLIC_ROUTES.LOGIN.path} className="btn-link">Ingresa</Link></p>
                                </div>
                            </div>
                        </div>:
                        <LazyLoading height="100px" />
                }
            </div>
        </Fragment>
    );
};

export default RegisterSelectType;
