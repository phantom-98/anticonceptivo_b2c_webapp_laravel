import React from 'react';
import H3Panel from "../../../../components/general/H3Panel";
import {CONFIG} from "../../../../Config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LegalBases = ({legalBases}) => {

    return (
        <div className="row">

            <H3Panel title="CARTA DE DESABASTECIMIENTO"/>

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
                                                    <LazyLoadImage
                                                        alt={CONFIG.APP_NAME}
                                                        title="Anticonceptivo"
                                                        rel="nofollow"
                                                        effect="blur"
                                                        src={legalBase.public_icon}
                                                    />
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

