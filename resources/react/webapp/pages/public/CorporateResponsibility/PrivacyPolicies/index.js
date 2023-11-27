import React from 'react';
import H3Panel from "../../../../components/general/H3Panel";

const PrivacyPolicies = ({privacyPolicy}) => {

    return (
        <div className="row">

            <H3Panel title="POLÍTICAS DE PRIVACIDAD"/>

            <div className="col-md-12">
                <div dangerouslySetInnerHTML={{ __html: privacyPolicy.description }} />
            </div>
        </div>
    );
};

export default PrivacyPolicies
