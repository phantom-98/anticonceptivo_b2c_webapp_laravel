import React from 'react';
import ReactDOM from 'react-dom';

const CardPanel = ({children, title, style, height = null}) => {
    return (
        <div className="w-100 card-panel" style={style}>
            <div className="card-panel-title">
                <h3>{title}</h3>
            </div>
            {
                height ?
                    <div className="panel-body" style={{height : `calc(${height} - 20px)`}}>
                        {
                            children
                        }
                    </div>:
                    <div className="panel-body">
                        {
                            children
                        }
                    </div>
            }
        </div>
    );
};

export default CardPanel;
