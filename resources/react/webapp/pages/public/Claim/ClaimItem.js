import React from 'react';

const ClaimItem = ({name, date, description, color}) => {

    const style = {
        height: '60px',
        width: '60px',
        textAlign: 'center',
        border: `1px solid ${color}`,
        backgroundColor: color,
        borderRadius: '10px',
        lineHeight: '60px',
        color: "white",
    }

    return (
        <div className="row">
            <div className="col-auto">
               <div className="bold font-poppins" style={style}>
                    {name ? name.charAt(0).toUpperCase() : null}
               </div>
            </div>
            <div className="col-10">
                <div className="row">
                    <div className="col-12 font-inter font-18 regular color-033F5D">
                        {name}{'   '}{date}
                    </div>
                    <div className="col-12 mt-1 font-poppins font-14 regular color-484848">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimItem