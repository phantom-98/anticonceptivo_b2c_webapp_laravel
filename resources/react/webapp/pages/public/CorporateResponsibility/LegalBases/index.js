import React from 'react';

import H3Panel from "../../../../components/general/H3Panel";
import docsIcon from '../../../../assets/images/icons/docs.svg';
import {CONFIG} from "../../../../Config";

const LegalBases = () => {

    return (
        <div className="row">

            <H3Panel title="BASES LEGALES"/>

            <div className="col-md-12">
                <div className="row">

                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                            return <div className="col-md-3">
                                <div className="panel-legal-bases">
                                    <div className="d-flex">
                                        <div className="m-auto py-5">
                                            <img src={docsIcon} alt={CONFIG.APP_NAME}/>
                                        </div>
                                    </div>
                                    <div className="font-poppins font-14 regular">
                                        Carta de <br/>
                                        Desabastecimiento <br/>
                                        Marzo 2021
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default LegalBases

