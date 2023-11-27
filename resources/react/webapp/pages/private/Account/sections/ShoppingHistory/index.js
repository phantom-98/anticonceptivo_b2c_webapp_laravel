import React, {useState, useContext} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import Detail from "./Detail";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";

const Index = () => {

    const [view, setView] = useState('table');
    const [orderSelected, setOrderSelected] = useState(null);
    const { breakpoint } = useContext(AppContext)

    const goBack = () => {
        setView('table')
        setOrderSelected(null)
    }

    const showDetail = (order) => {
        setView('detail')
        setOrderSelected(order)
    }

    return (
        <div className="row" style={{ marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' :'0px'}}>
            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    <H3Panel title="MIS COMPRAS"/> 
                : null
            }
            <div className="col-md-12">
                {
                    view === 'table' ? <Table showDetail={showDetail}/> : null
                }

                {
                    view === 'detail' ? <Detail goBack={goBack} order={orderSelected}/> : null
                }
            </div>
        </div>
    );
};

export default Index
