import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import stepCheck from "../../assets/images/icons/step-check.svg"
import Icon from "../general/Icon";

const Step = ({title, number, disabled = false, isHeader = false, isReady = false}) => {
    return (
        <Fragment>
            <div className={`row d-none d-md-flex ${disabled ? 'step-disable' : ''}`}>
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

            <div className={`row d-flex d-md-none ${disabled ? 'step-disable' : ''}`}>
                <div className="col-12 d-flex mb-2">
                    <div className={`mx-auto circle-step text-center ${isReady ? 'circle-step-ready' : ''}`}>
                        {
                            isReady ? <Icon path={stepCheck} title={title} style={{width : '23px'}} /> :  <span className="font-9">{number}</span>
                        }
                    </div>
                </div>
                <div className="col-12 text-center">
                    <h3 className={`my-auto font-poppins bold color-033F5D mb-0 ${isHeader ? ' font-6' : 'font-6'}`}>
                        {title}
                    </h3>
                </div>
            </div>
        </Fragment>
    );
};

export default Step

if (document.getElementById('Step')) {
    ReactDOM.render(<Step/>, document.getElementById('Step'));
}
