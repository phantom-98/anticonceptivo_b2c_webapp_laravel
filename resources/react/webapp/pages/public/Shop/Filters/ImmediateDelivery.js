import React from 'react';
import ImmediateSvg from '../../../../assets/images/icons/immediate.svg'
import {Form} from 'react-bootstrap'

const ImmediateDelivery = ({immediate, setImmediate, textImmediate}) => {


    return (
        <div className="box-immediate mb-3">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-14 semi-bold font-poppins color-009BE8 mb-2">
                                <img src={ImmediateSvg} alt="anticonceptivo.cl"/> <span className="mt-1">{textImmediate}</span>
                            </h3>
                            <p className="font-11 lh-11 regular font-poppins color-484848 mb-0">
                                Hasta 2 horas después de tu compra. Despachos desde 10:00 a 19:00 hrs de Lunes a Sábado.
                            </p>
                        </div>
                        <div className="col-auto d-flex">
                            <div className="my-auto">
                                <Form className="w-auto">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        checked={immediate}
                                        onChange={() => setImmediate(!immediate)}
                                    />
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ImmediateDelivery
