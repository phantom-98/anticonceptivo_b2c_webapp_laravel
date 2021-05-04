import React, {useEffect, useState} from 'react';
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import {formatMoney} from "../../../../../helpers/GlobalUtils";

const Table = ({showDetail}) => {

    const [tableLoaded, setTableLoaded] = useState(false);

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        //emulación
        const q = 100;
        let _data = [];
        for (let i = 0; i < q; i++) {
            _data = [
                ..._data,
                {
                    created_at: '2021-05-04 12:13:14',
                    id: 1202202345 + i,
                    total: Math.floor(Math.random() * 999999) + 10000,
                }
            ]
        }

        setObjects(_data)
        setTableLoaded(true)

    }, [])

    const columns = [
        {
            text: 'FECHA',
            dataField: 'created_at',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
                return moment(cell).format('DD/MM/YYYY');
            }
        },
        {
            text: 'NÚMERO PEDIDO',
            dataField: 'id',
            sort: true,
            classes: 'text-left',
            headerClasses: '',
            formatter: (cell, row) => {
                return <span onClick={() => showDetail(row)} className="link pointer"
                             style={{color: '#484848'}}>{cell}</span>
            }
        },
        {
            text: 'TOTAL',
            dataField: 'total',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
                return formatMoney(cell)
            }
        },
    ];

    return (
        <TablePanel
            objects={objects}
            columns={columns}
            tableLoaded={tableLoaded}
        />
    );
};

export default Table
