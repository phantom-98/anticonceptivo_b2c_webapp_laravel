import React, {useState} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import Detail from "./Detail";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

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

    const { height, width } = UseWindowDimensions();

    return (
        <div className="row" style={{marginTop: width<=980 ? '0px' :'-50px'}}>
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
