import React, {Fragment} from 'react';
import Breadcrumbs from "../components/Breadcrumbs";

const BasePanelTwo = (props) => {

    return (
        <div style={{background : '#FAFAFA'}}>
            {
                props.prepend
            }
            <div className={`container py-4 ${props.classContainer}`}>

                <Breadcrumbs items={props.breadcrumbs}/>

                <div className="row pb-4">

                    <div className="col-md-12">
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasePanelTwo;
