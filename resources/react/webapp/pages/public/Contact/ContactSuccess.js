import React from 'react';

const ContactSuccess = () => {
    return (
        <div className="h-100 d-flex">
            <div className="m-auto text-center">
                <img src="/themes/web/assets/images/contact/success.svg" rel="nofollow"/>
                <h4 className="font-signika font-24 bold text-primary pt-4 pb-2">
                    Gracias por contactarnos
                </h4>
                <p className="font-epilogue font-14 light color-3C3C3E mb-1">
                    Tu mensaje a sido enviado satisfactoriamente.
                </p>
                <p className="font-epilogue font-14 light color-3C3C3E mb-1">
                    Te responderemos lo antes posible.
                </p>
            </div>
        </div>
    );
};

export default ContactSuccess;
