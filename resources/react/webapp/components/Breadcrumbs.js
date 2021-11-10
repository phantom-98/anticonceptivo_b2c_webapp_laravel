import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({items}) => {
//category?
    return (
        <div className="pb-3">
            {
                items.map((item, index) => {
                    console.log(item)
                    let url = item.url;

                    if (url.includes(':category?')) {
                        if(item.slug){
                            url = url.replace(':category?', item.slug)
                        }else{
                            url = url.replace(':category?', 'pastillas')
                        }
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
