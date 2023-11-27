import React, {useContext} from 'react';

import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";

const Receipts = () =>{

    const {breakpoint} = useContext(AppContext)

    return (
        <div className="row" style={{ marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' :'0px'}}>
            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? <H3Panel title="Mis recetas"/> : null
            }
            <div className="col-md-12">
                <Table/>
            </div>
        </div>
    );
};

export default Receipts
