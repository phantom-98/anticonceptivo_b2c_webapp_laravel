import React from 'react';
import H3Panel from "../../../../components/general/H3Panel";
import {CONFIG} from "../../../../Config";

const LegalBases = ({legalBases}) => {

    return (
        <div className="row">

            <H3Panel title="BASES LEGALES"/>

            <div className="col-md-12">
                <div className="row">

                    {
                        legalBases.map((legalBase, index) => {
                            return (
                                <div className="col-md-3">
                                    <div className="panel-legal-bases">
                                        <div className="d-flex">
                                            <div className="m-auto py-5">
                                                <a href={legalBase.public_file} target="_blank">
                                                    <img src={legalBase.public_icon} alt={CONFIG.APP_NAME} style={{height:54, width:46}}/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="font-poppins font-14 regular">
                                            {legalBase.name}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default LegalBases

