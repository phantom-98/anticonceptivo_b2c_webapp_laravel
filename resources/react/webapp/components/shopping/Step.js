import React from 'react';
import ReactDOM from 'react-dom';
import stepCheck from "../../assets/images/icons/step-check.svg"
import Icon from "../general/Icon";

const Step = ({title, number, disabled = false, isHeader = false, isReady = false}) => {
    return (
        <div className={`row ${disabled ? 'step-disable' : ''}`}>
            <div className="col-auto pr-0">
                <div className={`circle-step ${isReady ? 'circle-step-ready' : ''}`}>
                    {
                        isReady ? <Icon path={stepCheck} title={title} /> :  <span>{number}</span>
                    }
                </div>
            </div>
            <div className="col d-flex">
                <h3 className={`my-auto font-poppins bold color-033F5D mb-0 ${isHeader ? ' font-14' : 'font-18'}`}>
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default Step

if (document.getElementById('Step')) {
    ReactDOM.render(<Step/>, document.getElementById('Step'));
}
