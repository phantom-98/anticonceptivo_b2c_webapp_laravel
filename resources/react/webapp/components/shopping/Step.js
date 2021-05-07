import React from 'react';
import ReactDOM from 'react-dom';

const Step = ({title, number, disabled = false}) =>{
    return (
        <div className={`row ${disabled ? 'step-disable': ''}`}>
            <div className="col-auto pr-0">
                <div className="circle-step">
                    <span>1</span>
                </div>
            </div>
            <div className="col d-flex">
                <h3 className="my-auto font-poppins font-18 bold color-033F5D mb-0">
                    DATOS PERSONALES
                </h3>
            </div>
        </div>
    );
};

export default Step

if (document.getElementById('Step')) {
    ReactDOM.render(<Step/>, document.getElementById('Step'));
}
