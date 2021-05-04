import React, {Fragment} from 'react';

const Breadcrumbs = ({items}) => {

    return (
        <div className="pb-3">
            {
                items.map((item, index) => (
                    <Fragment key={index}>
                        <a className="font-poppins font-12 regular color-6C6B6B" href={item.url}>
                            {item.name}
                        </a>
                        <span className="font-poppins font-12 regular color-6C6B6B mx-1">
                            { (index + 1) < items.length ? '>' : '' }
                        </span>
                    </Fragment>
                ))
            }
        </div>
    );
};

export default Breadcrumbs;
