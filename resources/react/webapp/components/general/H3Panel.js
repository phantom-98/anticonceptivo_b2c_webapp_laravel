import React from 'react';
import ReactDOM from 'react-dom';

const H3Panel = ({title}) =>{
    return (
        <div className="col-md-12 mb-3">
            <h3 className="font-poppins font-20 bold color-033F5D">{title}</h3>
        </div>
    );
};

export default H3Panel

if (document.getElementById('H3Panel')) {
    ReactDOM.render(<H3Panel/>, document.getElementById('H3Panel'));
}
