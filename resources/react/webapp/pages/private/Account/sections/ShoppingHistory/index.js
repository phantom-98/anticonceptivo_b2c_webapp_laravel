import React, {useState} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import Detail from "./Detail";

const Index = () => {

    const [view, setView] = useState('table');
    const [orderSelected, setOrderSelected] = useState(null);

    const goBack = () => {
        setView('table')
        setOrderSelected(null)
    }

    const showDetail = (order) => {
        setView('detail')
        setOrderSelected(order)
    }

    return (
        <div className="row" style={{marginTop: '-50px'}}>
            <H3Panel title="MIS COMPRAS"/>
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
