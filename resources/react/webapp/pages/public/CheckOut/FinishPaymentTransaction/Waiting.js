import React from 'react';
import {WaveTopBottomLoading} from "react-loadingg";

const Waiting = () => {
    return (
        <div className="row">
            <div className="col-12 d-flex" style={{minHeight: 'calc(100vh - 623px)'}}>
                <div className="row my-auto">
                    <div className="col-md-12 text-center mt-4">
                        <h3 className="modal-title">Esperando la confirmación del pago</h3>
                    </div>
                    <div className="col-md-12 text-center font-poppins font-14 regular color-6C6B6B pt-2">
                        Por favor espere un momento mientras confirmamos el estado del pago.
                    </div>

                    <div className="col-md-12 my-5">
                        <WaveTopBottomLoading
                            color={'#0869A6'}
                            speed={2}
                            size={'small'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Waiting
