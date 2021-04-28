import React from 'react';
import PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";

const Success = () => {
    return (
        <div className="h-100 d-flex">
            <div className="m-auto text-center">
                <img src="/themes/web/assets/images/icons/success.svg" rel="nofollow"/>
                <h4 className="font-signika font-24 bold text-primary pt-4 pb-2">
                    Operación Exitosa
                </h4>
                <p className="font-epilogue font-14 light color-3C3C3E mb-1">
                    Gracias por enviar tu evaluación de la plataforma.
                </p>
                <button
                    onClick={() => {
                        window.location.href = PROFESSIONAL_ROUTES.PROFILE.path;
                    }}
                    className="btn btn-form btn-primary btn-rounded px-4 mt-3">
                    <span>FINALIZAR</span>
                </button>
            </div>
        </div>
    );
};

export default Success;
