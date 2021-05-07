import React, {useEffect, useState} from 'react';
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import iconReceipt from '../../../../../assets/images/icons/receipt.svg';
import iconTrash from '../../../../../assets/images/icons/trash.svg';
import Icon from "../../../../../components/general/Icon";

const Table = () => {

    const [tableLoaded, setTableLoaded] = useState(false);

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        //emulación
        const q = 7;
        let _data = [];
        for (let i = 0; i < q; i++) {
            _data = [
                ..._data,
                {
                    created_at: '2021-05-04 12:13:14',
                    id: 1202202345 + i,
                    name : 'receta remedio pastillas anticonceptivas',
                    total: Math.floor(Math.random() * 999999) + 10000,
                }
            ]
        }

        setObjects(_data)
        setTableLoaded(true)

    }, [])

    const columns = [
        {
            text: 'RECETA',
            dataField: 'name',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
                return <span><Icon path={iconReceipt} /> {cell}</span>
            }
        },
        {
            text: 'FECHA',
            dataField: 'created_at',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
                return <span className="uppercase">{moment(cell).lang('es').format('DD MMMM YYYY')}</span>
            }
        },
        {
            text: 'VER RECETA',
            dataField: 'id',
            sort: true,
            classes: 'text-left',
            headerClasses: '',
            formatter: (cell, row) => {
                return <span onClick={() => alert(row)} className="link pointer">Ver Receta</span>
            }
        },
        {
            text: '',
            dataField: 'id',
            sort: true,
            classes: 'text-left',
            headerClasses: '',
            formatter: (cell, row) => {
                return <span onClick={() => alert(`REMOVE ${row.id}`)} className="link pointer">
                    <Icon path={iconTrash} />
                </span>
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
