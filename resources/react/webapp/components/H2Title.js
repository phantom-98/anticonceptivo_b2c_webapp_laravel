import React from 'react';
import ReactDOM from 'react-dom';

const H2Title = ({text, className}) =>{
    return (
        <h2 className={`font-poppins font-21 bold text-center uppercase text-primary ${className}`}>{text}</h2>
    );
};

export default H2Title
