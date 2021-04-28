import React from 'react';
import ReactStars from "react-rating-stars-component";

const StarRating = ({edit = false, value}) => {

    if ( !value || value == null) {
        return null;
    }

    return (
        <ReactStars
            edit={edit}
            count={5}
            value={value}
            emptyIcon={<i className="fa fa-star-o"/>}
            halfIcon={<i className="fa fa-star-half-o"/>}
            filledIcon={<i className="fa fa-star"/>}
            isHalf={true}
            size={16}
            activeColor="rgb(253,156,0)"
        />

    );
};

export default StarRating;
