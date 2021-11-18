import React from 'react';
import moment from "moment";

const FooterBottom = () => {

    return (
        <div className="footer-bottom d-flex">
            <div className="container my-auto">
                <div className="row ">
                    <div className="col-md-8">
                        <div className="text-center text-md-left">
                            © {moment().format('YYYY')} Todos los derechos reservados
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center text-md-right font-12">
                            Autorizado por ISP: Res. Ex. 4003 del 31.08.2021
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FooterBottom
