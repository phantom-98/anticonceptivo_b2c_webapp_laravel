import React, {useContext, useEffect, useState} from 'react';

import * as Services from "../../../../Services";
import TablePanel from "../../../../components/TablePanel";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import moment from "moment";
import {formatPaymentStatus} from "../../../../helpers/HelperStatus";
import {Link} from "react-router-dom";
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
                    setObjects(response.data.orders)
                    setTableLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
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
            text: 'Professional',
            dataField: 'professional.full_name',
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
                return  (row.total_minutes / 60 ) + ' horas';
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
        {
            text: 'Objetivo',
            dataField: 'project',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                if(row.status == 'PAID'){
                    let url = PANEL_PROFESSIONAL_ROUTES.PROJECTS_SHOW.path;
                    url = url.replace(":project_id", row.project_id);
                    return (
                        <Link to={url} className="btn-table more">
                            Ver más
                        </Link>
                    );
                }
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
