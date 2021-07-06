import React from 'react';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import LazyLoading from "./LazyLoading";
import NoRegisterExits from "./NoRegisterExists";

const TablePanel = ({objects, columns, tableLoaded, expandRow = false, pagination = true, bordered = false, striped = true }) => {
    return (

           tableLoaded ? objects.length > 0 ?
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={objects}
                    columns={columns}
                    expandRow={ expandRow }
                    pagination={pagination ? paginationFactory() : false}
                    // filter={filterFactory()}
                    bordered={bordered}
                    striped={striped}
                    classes="table-panel"
                /> :
                tableLoaded ?
                    <NoRegisterExits />: null : <LazyLoading height="400px" />

    );
};

export default TablePanel;
