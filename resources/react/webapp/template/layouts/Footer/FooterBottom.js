import React from "react";
import moment from "moment";

const FooterBottom = () => {
    return (
        <div className="footer-bottom d-flex">
            <div className="container my-auto">
                <div className="row text-with-bg">
                    <div className="col-md-8">
                        <div className="text-center text-md-left">
                            © {moment().format("YYYY")} Todos los derechos
                            reservados
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center text-md-right font-12">
                            Autorizado por ISP: Res. Ex. 3848 del 24.07.2023
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
