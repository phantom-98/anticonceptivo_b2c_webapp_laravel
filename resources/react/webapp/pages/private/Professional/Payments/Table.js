import React, {useContext, useEffect, useState} from 'react';

import moment from "moment";
import {Link} from "react-router-dom";
import * as Services from "../../../../Services";
import TablePanel from "../../../../components/TablePanel";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import {AuthContext} from "../../../../context/AuthProvider";

const Table = () => {

    const {auth} = useContext(AuthContext);

    const [tableLoaded, setTableLoaded] = useState(false);
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        if (auth) {
            index();
        }
    }, [auth])

    const index = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PAYMENTS.GET_LIST;
        let professional_id = auth.professional_id;

        Services.DoPost(url, {professional_id}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.liquidations)
                    setTableLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }
    const columns = [
        {
            text: 'Folio',
            dataField: 'id',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
        },
        {
            text: 'Folio',
            dataField: 'sii_code',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
        },
        {
            text: 'Fecha Solicitud',
            dataField: 'created_at',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return row.created_at ? moment(row.created_at).format('DD-MM-YYYY HH:mm:ss') : '-';
            }
        },
        {
            text: 'Período',
            dataField: 'period',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                 const start = row.period_start ? moment(row.period_start).format('DD-MM-YYYY') : '*';
                 const end = row.period_end ? moment(row.period_end).format('DD-MM-YYYY') : '*';
                 return start + ' - ' + end;
            }
        },
        {
            text: 'Monto',
            dataField: 'total',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return formatMoney(row.total);
            }
        },
        {
            text: 'Estado',
            dataField: 'is_paid',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
            formatter: (cell, row) => {
                return row.is_paid ?
                    <span className="badge badge-success">PAGADA</span>
                    :
                    <span className="badge badge-warning">PENDIENTE</span>;
            }
        },
        {
            text: 'Detalle',
            dataField: 'project',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                let url = PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_DETAILS.path;
                url = url.replace(":liquidation_id", row.id);
                return (
                    <Link to={url} className="btn-table more">
                        Ver más
                    </Link>
                );
            }
        }
    ];

    return (
        <TablePanel
            objects={objects}
            columns={columns}
            tableLoaded={tableLoaded}
        />
    );
};

export default Table;
