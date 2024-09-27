import React from "react";
import ReactDOM from "react-dom";

const RowCol = ({ name, value, firstColSize = 3 }) => {
    return (
        <div className="col-12 pb-1">
            <div className="row">
                <div className={`col-md-${firstColSize}`}>
                    <h3 className="font-poppins font-14 bold color-484848 text-uppercase">
                        {name}
                    </h3>
                </div>
                <div className={`col-md-${12 - firstColSize}`}>
                    <h3 className="font-poppins font-14 regular color-484848">
                        {value}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default RowCol;
