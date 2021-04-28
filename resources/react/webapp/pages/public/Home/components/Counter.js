import React from 'react';

import {formatNumber} from "../../../../helpers/GlobalUtils";


const Counter = ({count, title, imgPath}) => {
    return (
        <div className="row justify-content-center">
            <div className="col-auto pt-1">
                <img src={imgPath} rel="nofollow"/>
            </div>
            <div className="col-auto pl-0 font-signika">
                <div className="font-50 text-secondary bold lh-45 mb-0">{ formatNumber(count)}</div>
                <div className="font-16 text-primary bold text-uppercase">{title}</div>
            </div>
        </div>
    );
};

export default Counter;
