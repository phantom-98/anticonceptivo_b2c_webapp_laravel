import React from 'react';
import CardHowWork from "../components/CardHowWork";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";


const HowItIsWork = () => {
    return (
        <section className="bg-how-its-work py-5" id="howItWorks">
            <div className="container" style={{maxWidth: '983px'}}>
                <div className="row">

                    <div className="col-12">
                        <h2 className="font-35 bold text-secondary text-center">
                            ¿Cómo funciona?
                        </h2>
                        <p className="font-epilogue font-16 light text-center color-121212">Realizas el pago con
                            garantía total sobre los fondos y empieza a trabajar :)
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center pb-4 pt-5">
                    <div className="col-auto">
                        <CardHowWork
                            title="REGISTRATE"
                            imgPath="/themes/web/assets/images/home/how-work-register.svg"
                            description="Recibe propuestas de excelentes freelancers. Elige al mejor para tu objetivo."
                        />
                    </div>
                    <div className="col-auto">
                        <CardHowWork
                            title="EMPIEZA AHORA"
                            imgPath="/themes/web/assets/images/home/how-work-start-now.svg"
                            description="Realizas el pago con garantía total sobre los fondos y empieza a trabajar :)"
                        />
                    </div>
                    <div className="col-auto">
                        <CardHowWork
                            title="ACEPTAR"
                            imgPath="/themes/web/assets/images/home/how-work-accepts.svg"
                            description="Recibe el objetivo terminado y libera los fondos al freelancer."
                        />
                    </div>
                </div>
                <div className="row pt-1">
                    <div className="col text-center">
                        <Link to={PUBLIC_ROUTES.HOW_ITS_WORK.path} className="btn btn-primary btn-rounded px-4">
                            <span className="font-12 regular">Ver más información</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItIsWork;
