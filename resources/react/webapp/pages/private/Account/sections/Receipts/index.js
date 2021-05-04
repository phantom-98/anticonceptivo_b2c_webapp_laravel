import React from 'react';

import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";


const Receipts = () =>{
    return (
        <div className="row">
            <H3Panel title="Mis recetas"/>
            <div className="col-md-12 mb-5">
                <Table />
            </div>
        </div>
    );
};

export default Receipts
