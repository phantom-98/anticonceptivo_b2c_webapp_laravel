import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import UseWindowDimensions from "../components/customHooks/UseWindowDimensions";


const BasePanelCorporate = (props) => {

    const { width } = UseWindowDimensions();

    return (
        <div style={{background : '#FAFAFA'}}>
            <div className="container py-4">

                <Breadcrumbs items={props.breadcrumbs}/>

                <div className="panel mb-4">
                    <div className="responsive-base-panel" style={props.style}>
                        <div className="row">
                            {
                                width < 768 ?
                                null
                                :
                                <div className="col-md-12">
                                    {
                                        props.title ?
                                            <h1 className="base-panel-one-title">{props.title}</h1>
                                        : null
                                    }
                                </div>
                            }
                            <div className="col-md-12">
                                {
                                    props.children
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BasePanelCorporate;
