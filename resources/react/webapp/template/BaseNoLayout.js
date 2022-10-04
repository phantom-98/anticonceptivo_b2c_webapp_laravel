import React, {Fragment} from 'react';

const BaseNoLayout = (props) => {

    return (
        <Fragment>
            <section id="header" className="header">

            </section>
            <section id="content" className="content">
                <div className="app-margin-top">
                    {
                        props.children
                    }
                </div>
            </section>
            <section id="footer" className="footer d-flex py-5">

            </section>
        </Fragment>
    );
};

export default BaseNoLayout;
