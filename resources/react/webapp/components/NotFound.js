import React from 'react';
import {Card} from "react-bootstrap";

const NotFound = ({message = 'Recurso no encontrado.', text = '', padding = ''}) => {
    return (
        <div className="mb-3 mt-4">
            <Card>
                <Card.Body>
                    <div className={`row ${padding}`}>
                        <div className="col-12 text-center">
                            <h1 className="font-40 bold text-primary">{message}</h1>
                            <p className="font-epilogue color-3C3C3E">
                                {text}
                            </p>
                            <img className="py-2" src="/themes/web/assets/images/logo.svg" alt="Ikiru"/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NotFound;
