import React from 'react';
import moment from "moment";

const FooterBottom = () => {

    return (
        <div className="footer-bottom bg-033F5D">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 bottom-to-flex">
                        <div className="my-auto">
                            © {moment().format('YYYY')} Todos los derechos reservados
                        </div>
                    </div>
                    <div className="col-md-4 bottom-to-flex">
                        <div className="my-auto">
                            Autorizado por ISP: Res. Ex. 4003 del 31.08.2021
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FooterBottom
