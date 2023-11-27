import React from 'react';
import ReactDOM from 'react-dom';

const RowCol = ({name, value, firstColSize = 3}) => {


    return (
        <div className="col-12 pb-1">
            <div className="row">
                <div className={`col-md-${firstColSize}`}>
                    <span className="font-poppins font-14 bold color-484848 text-uppercase">{name}</span>
                </div>
                <div className={`col-md-${12 - firstColSize}`}>
                    <span className="font-poppins font-14 regular color-484848">{value}</span>
                </div>
            </div>
        </div>
    );
};

export default RowCol
