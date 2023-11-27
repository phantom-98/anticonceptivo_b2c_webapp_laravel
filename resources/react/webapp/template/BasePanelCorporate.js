import React, {useContext} from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import { AppContext } from "../context/AppProvider";
import {BREAKPOINTS} from "../helpers/vars";

const BasePanelCorporate = (props) => {
    const {breakpoint} = useContext(AppContext)

    return (
        <div style={{background : '#FAFAFA'}}>
            <div className="container py-4">

                <Breadcrumbs items={props.breadcrumbs}/>

                <div className="panel mb-4">
                    <div className="responsive-base-panel" style={props.style}>
                        <div className="row">
                            {
                                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                                    <div className="col-md-12">
                                        {
                                            props.title ?
                                                <h1 className="base-panel-one-title">{props.title}</h1>
                                                : null
                                        }
                                    </div>
                                :
                                    null
                                
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
