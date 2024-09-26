import React from 'react';
import ReactDOM from 'react-dom';

const NoRegisterExits = ({type = 'primary', message = 'No existen registros.'}) => {
    return (
        <div className={`mb-0 alert alert-${type} fade show text-center`}
             role="alert">
            <h3 className="font-12">{message}</h3>
        </div>
    );
};

export default NoRegisterExits;
