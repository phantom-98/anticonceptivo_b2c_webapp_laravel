import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({items}) => {
//category?
    return (
        <div className="pb-3">
            {
                items.map((item, index) => {

                    let url = item.url;

                    if (url.includes(':category?')) {
                        url = url.replace(':category?', 'pastillas')
                    }

                    return <Fragment key={index}>
                        <Link className="font-poppins font-12 regular color-6C6B6B" to={url}>
                            {item.name}
                        </Link>
                        <span className="font-poppins font-12 regular color-6C6B6B mx-1">
                            {(index + 1) < items.length ? '>' : ''}
                        </span>
                    </Fragment>
                })
            }
        </div>
    );
};

export default Breadcrumbs;
