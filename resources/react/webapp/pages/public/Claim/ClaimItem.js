import React from 'react';

const ClaimItem = ({name, date, description}) => {

    return (
        <div className="row">
            <div className="col-12 font-inter font-18 regular color-033F5D">
                {name}{'   '}{date}
            </div>
            <div className="col-12 mt-1 font-poppins font-14 regular color-484848">
                {description}
            </div>
        </div>
    );
};

export default ClaimItem