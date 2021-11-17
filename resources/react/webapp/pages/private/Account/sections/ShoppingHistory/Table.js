import React, {useEffect, useState, useContext} from 'react';
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import {AuthContext} from "../../../../../context/AuthProvider";
import H3Panel from "../../../../../components/general/H3Panel";

const Table = ({showDetail, width}) => {

    const {auth} = useContext(AuthContext);

    const [tableLoaded, setTableLoaded] = useState(false);
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        getOrders();

        // //emulación
        // const q = 100;
        // let _data = [];
        // for (let i = 0; i < q; i++) {
        //     _data = [
        //         ..._data,
        //         {
        //             created_at: '2021-05-04 12:13:14',
        //             id: 1202202345 + i,
        //             total: Math.floor(Math.random() * 999999) + 10000,
        //         }
        //     ]
        // }

        // setObjects(_data)
        // setTableLoaded(true)
    }, [])

    const getOrders = () => {
        let url = Services.ENDPOINT.CUSTOMER.ORDERS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.orders);
                    setTableLoaded(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
            text: width>=980  ? 'NÚMERO PEDIDO' : 'Nº PEDIDO',
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
            dataField: 'subtotal',
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
