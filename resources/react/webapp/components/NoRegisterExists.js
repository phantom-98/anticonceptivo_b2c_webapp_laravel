import React from 'react';
import ReactDOM from 'react-dom';

const NoRegisterExits = ({type = 'primary', message = 'No existen registros.'}) => {
    return (
        <div className={`mb-0 alert alert-${type} fade show text-center`}
             role="alert">
            <span className="font-12">{message}</span>
        </div>
    );
};

export default NoRegisterExits;
