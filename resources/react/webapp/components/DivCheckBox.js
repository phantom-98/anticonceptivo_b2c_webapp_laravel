import React from 'react';
import ReactDOM from 'react-dom';

const DivCheckBox = ({active, title, subtitle}) => {
    return (
        <div className={`profesional-type pointer d-flex ${active ? 'active' : ''}`} 
        style={{minHeight: '60px'}}
        >
            <div className="my-auto w-100">
                <div className="row">
                    <div className="col pr-0 d-flex">
                        <div className="my-auto">
                            {
                                title ?
                                    <div className="font-14 bold color-3C3C3E">
                                        {title}
                                    </div> : null
                            }
                            {
                                subtitle ?
                                    <div className={`${title ? 'font-9' : 'font-12'} color-3C3C3E`}>
                                        {subtitle}
                                    </div> :
                                    null
                            }
                        </div>
                    </div>
                    <div className="col-auto ml-auto d-flex" style={{minWidth : '52px'}}>
                        {
                            active ? <img className="my-auto"
                                          src="/themes/web/assets/images/icons/checked-circule.svg"
                                          rel="nofollow"/> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DivCheckBox;
