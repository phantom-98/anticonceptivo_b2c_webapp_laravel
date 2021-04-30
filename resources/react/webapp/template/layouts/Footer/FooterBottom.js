import React from 'react';
import moment from "moment";

const FooterBottom = () => {

    return (
        <div className="footer-bottom bg-033F5D">
            <div className="container">
                <div className="row">
                    <div className="col-md-auto bottom-to-flex">
                        <div className="my-auto">
                            © {moment().format('YYYY')} Todos los derechos reservados
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FooterBottom
