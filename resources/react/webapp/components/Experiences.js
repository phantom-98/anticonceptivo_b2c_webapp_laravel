import React, {Fragment} from 'react';
import moment from "moment";

const Experiences = ({name, startAt, finishAt, jobTitle, description}) => {

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                    <span className="font-12 bold color-3C3C3E">
                        {name}
                    </span>
                </div>
                <div className="col-6 text-right">
                    <span className="font-10 color-3C3C3E">
                        <span className="bold">de</span> {moment(startAt).lang("es").format('MMM YYYY')} <span className="bold">-</span> {finishAt ? moment(finishAt).lang("es").format('MMM YYYY') : <span className="bold">Actualidad</span>}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <span className="font-12 light color-3C3C3E">
                        {jobTitle}
                    </span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <span className="font-12 light color-3C3C3E">
                        {description}
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default Experiences;
