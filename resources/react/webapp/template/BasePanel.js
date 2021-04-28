import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";

const BasePanel = (props) => {


    return (
        <div className="container">

            <Breadcrumbs items={props.breadcrumbs}/>

            {
                props.title ? <SectionTitle title={props.title}/> : null
            }

           <div className="row">
               <div className="col-12 mt-3">
                   {
                       props.children
                   }
               </div>
           </div>
        </div>
    );
};

export default BasePanel;
