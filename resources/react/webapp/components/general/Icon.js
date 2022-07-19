import React from 'react';
import {CONFIG} from "../../Config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Icon = ({path, style = {}, className = '', title = ''}) => {
    return (
        <LazyLoadImage
            alt={CONFIG.APP_NAME}
            className={className}
            style={style}
            effect="blur"
            rel="nofollow"
            src={path}
            title={title}
        />
    );
};

export default Icon
