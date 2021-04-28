import React, {Fragment} from 'react';
import Form from "./Form";

const Verify = ({match}) => {

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Form match={match} />
                </div>
            </div>
        </Fragment>
    );
};

export default Verify;


