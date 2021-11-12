import React, {useEffect, useState, useContext} from 'react';
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
// import {formatMoney} from "../../../../../helpers/GlobalUtils";
import iconReceipt from '../../../../../assets/images/icons/receipt.svg';
import iconTrash from '../../../../../assets/images/icons/trash.svg';
import Icon from "../../../../../components/general/Icon";
import * as Services from "../../../../../Services";
import {AuthContext} from "../../../../../context/AuthProvider";
import toastr from "toastr";
import PUBLIC_ROUTES from "../../../../../routes/publicRoutes";

const Table = () => {

    const {auth} = useContext(AuthContext);

    const [tableLoaded, setTableLoaded] = useState(false);

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.CUSTOMER.PRESCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.prescriptions);
                    setTableLoaded(true)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const removeData = (rowId) => {
        let url = Services.ENDPOINT.CUSTOMER.PRESCRIPTIONS.REMOVE;
        let data = {
            customer_id: auth.id,
            prescription_id: rowId
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.prescriptions);
                    toastr.success(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const columns = [
        {
            text: 'PRODUCTO',
            dataField: 'name',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
                return <a href={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', row.product.slug)} target="_blank" className="link pointer">{row.product.name}</a>
            }
        },
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
                return <a href={row.file_public} target="_blank" className="link pointer">Ver Receta</a>
            }
        }
        // {
        //     text: '',
        //     dataField: 'id',
        //     sort: true,
        //     classes: 'text-left',
        //     headerClasses: '',
        //     formatter: (cell, row) => {
        //         return <span onClick={() => removeData(row.id)} className="link pointer">
        //             <Icon path={iconTrash} />
        //         </span>
        //     }
        // },

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
