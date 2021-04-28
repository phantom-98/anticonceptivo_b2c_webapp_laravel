import React, {Fragment} from 'react';

const Breadcrumbs = ({items}) => {

    return (
        <div>
            {
                items.map((item, index) => (
                    <Fragment key={index}>
                        <a className="font-epilogue font-12 light color-939292" href={item.url}>
                            {item.name}
                        </a>
                        <span className="font-epilogue font-12 light color-939292 mx-1">
                            { (index + 1) < items.length ? '>' : '' }
                        </span>
                    </Fragment>
                ))
            }
        </div>
    );
};

export default Breadcrumbs;
