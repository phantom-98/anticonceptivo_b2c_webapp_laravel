import React from 'react';

const H2Title = ({text, className}) =>{
    return (
        <h2 className={`font-poppins font-21 bold text-center uppercase text-primary ${className}`} style={{letterSpacing : '2px'}}>{text}</h2>
    );
};

export default H2Title
