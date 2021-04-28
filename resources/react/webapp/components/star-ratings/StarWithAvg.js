import React from 'react';
import StarRating from "./";
import { avgRound, starRound } from "../../helpers/Rating";

const StarWithAvg = ({ avgRating, rowStyle = null}) => {

    return (
        <div className={'row'+' '+rowStyle}>
            <div className="col-auto pr-0">
                <StarRating value={starRound(avgRating)} />
            </div>
            <div className="col-auto pl-1">
                <span className="font-16 lh-16 black text-secondary text-center text-uppercase">{avgRound(avgRating)}</span>
            </div>
        </div>
    );
};

export default StarWithAvg;
