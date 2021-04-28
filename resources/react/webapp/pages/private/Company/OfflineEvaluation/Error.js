import React from 'react';

const Error = () => {
    return (
        <div className="h-100 d-flex">
            <div className="m-auto text-center">
                <img src="/themes/web/assets/images/icons/error.svg" rel="nofollow"/>
                <h4 className="font-signika font-24 bold text-primary pt-4 pb-2">
                    Algo ha salido mal
                </h4>
                <p className="font-epilogue font-14 light color-3C3C3E mb-1">
                    Este link ya ha caducado.
                </p>
                {/*<p className="font-epilogue font-14 light color-3C3C3E mb-1">*/}
                {/*    Te responderemos lo antes posible.*/}
                {/*</p>*/}
            </div>
        </div>
    );
};

export default Error;
