import React, {useEffect, useState} from 'react';

import moment from "moment";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import {formatPaymentStatus} from "../../../../../helpers/HelperStatus";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import NoRegisterExits from "../../../../../components/NoRegisterExists";
import LazyLoading from "../../../../../components/LazyLoading";

const Table = ({objects, tableLoaded, selectedOrders, setSelectedOrders}) => {


    const addToPay = (id) => {
        const found = objects.find(o => o.id == id);
        if (found) {
            setSelectedOrders([
                ...selectedOrders,
                found
            ])
        }
    }

    const removeToPay = (id) => {
        const list = selectedOrders.filter(o => o.id !== id);
        setSelectedOrders(list)
    }

    const columns = [

        {
            text: 'Nº Orden',
            dataField: 'id',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
        },
        {
            text: 'Fecha Transacción',
            dataField: 'payment_date',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return row.payment_date ? moment(row.payment_date).format('DD-MM-YYYY HH:mm:ss') : '-';
            }
        },
        {
            text: 'Empresa',
            dataField: 'company.name',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
        },
        {
            text: 'Duración',
            dataField: 'total_minutes',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return (row.total_minutes / 60) + ' horas';
                // return cell + ' horas';
            }
        },
        {
            text: 'Monto',
            dataField: 'total_price',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return formatMoney(row.total_price_gross - row.commission_professional_total);
            }
        },
        {
            text: 'Estado',
            dataField: 'status',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return formatPaymentStatus(cell);
            }
        },
    ];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            !isSelect ? removeToPay(row.id) : addToPay(row.id)
        },
        onSelectAll: (isSelect, rows, e) => {
           if(isSelect){
               setSelectedOrders(objects)
           }else{
              setSelectedOrders([])
           }
        },
        selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
            <input
                type="checkbox"
                ref={ (input) => {
                    if (input) input.indeterminate = indeterminate;
                } }
                { ...rest }
            />
        ),
        selectionRenderer: ({ mode, ...rest }) => (
            <input type={ mode } { ...rest } />
        )
    };
    return (

        // objects.map(row =>{
        //     const found = selectedOrders.find(o => o.id == row.id)
        //     return <Switch height={20}
        //                    onChange={(e) => handleSelection(!!found, row.id)}
        //                    checked={!!found}/>
        // })

        tableLoaded ? objects.length > 0 ?
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={objects}
                columns={columns}
                pagination={paginationFactory()}
                // filter={filterFactory()}
                bordered={false}
                selectRow={ selectRow }
                // striped
                classes="table-panel"
            /> :
            tableLoaded ?
                <NoRegisterExits />: null : <LazyLoading height="400px" />
    );
};

export default Table;
