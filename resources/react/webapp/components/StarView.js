import React from 'react';

import ReactStars from "react-rating-stars-component";

const StarView = ({value, size = 14}) => {
    return (
        <ReactStars
            // classNames={'pl-1'}
            edit={false}
            count={5}
            value={value}
            emptyIcon={<i className="fa fa-star"/>}
            halfIcon={<i className="fa fa-star-half-o"/>}
            filledIcon={<i className="fa fa-star"/>}
            isHalf={true}
            size={size}
            activeColor="#E6D610"
            color="rgba(253,156,0,0.25)"
        />
    );
};

export default StarView;
