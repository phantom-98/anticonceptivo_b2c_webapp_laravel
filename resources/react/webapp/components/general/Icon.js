import React from 'react';
import {CONFIG} from "../../Config";

const Icon = ({path, style = {}, className = '', title = ''}) => {
    return (
        <img src={path} rel="nofollow" style={style} className={className} alt={CONFIG.APP_NAME} title={title}/>
    );
};

export default Icon
