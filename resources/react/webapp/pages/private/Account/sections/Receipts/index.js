import React from 'react';

import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";


const Receipts = () =>{
    return (
        <div className="row" style={{marginTop: '-50px'}}>
            <H3Panel title="Mis recetas"/>
            <div className="col-md-12">
                <Table />
            </div>
        </div>
    );
};

export default Receipts
