import React from 'react';
import ImmediateSvg from '../../../../assets/images/icons/immediate.svg'
import {Form} from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImmediateDelivery = ({ immediate, setImmediate, textImmediate, subTextImmediate}) => {

    return (
        <div className="box-immediate mb-3">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-14 semi-bold font-poppins color-009BE8 mb-2">
                                <LazyLoadImage
                                    alt="anticonceptivo.cl"
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={ImmediateSvg}
                                /> <span className="mt-1">{textImmediate}</span>
                            </h3>
                            <p className="font-11 lh-11 regular font-poppins color-484848 mb-0">
                                {subTextImmediate}
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
