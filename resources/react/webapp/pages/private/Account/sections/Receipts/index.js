import React from 'react';

import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";


const Receipts = () =>{

    const { height, width } = UseWindowDimensions();


    return (
        <div className="row" style={{marginTop: width<=980 ? '0px' :'-50px'}}>
            <H3Panel title="Mis recetas"/>
            <div className="col-md-12">
                <Table />
            </div>
        </div>
    );
};

export default Receipts
