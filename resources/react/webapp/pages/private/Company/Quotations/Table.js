import React, {useContext, useEffect, useState} from "react";

import * as Services from "../../../../Services";
import TablePanel from "../../../../components/TablePanel";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import moment from "moment";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthProvider";
import {formatProjectStatus, formatQuotationStatus} from "../../../../helpers/HelperStatus";
import {createOrder} from "../actions";

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
        let url = Services.ENDPOINT.PANEL.COMPANY.QUOTATIONS.GET_LIST;
        let company_id = auth.company_id;

        Services.DoPost(url, {company_id}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.quotations)
                    setTableLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    const columns = [

        {
            text: 'Creado',
            dataField: 'created_at',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                return moment(row.created_at).format('DD-MM-YYYY HH:mm:ss');
            }
        },
        {
            text: 'Nombre del Objetivo',
            dataField: 'project.name',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
        },
        {
            text: 'Descripción del Objetivo',
            dataField: 'project.description',
            sort: true,
            classes: 'font-12 light color-3C3C3E',
            headerClasses: 'font-14 bold text-primary',
        },
        {
            text: 'Profesional',
            dataField: 'professional.full_name',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                return cell ? cell : 'Aún no asignado'
            }
        },
        {
            text: 'Estado',
            dataField: 'status',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                return formatQuotationStatus(cell)
            }
        },
        {
            text: 'Objetivo',
            dataField: 'tasks',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                let url = PANEL_COMPANY_ROUTES.PROJECTS_SHOW.path;
                url = url.replace(":project_id", row.project_id);
                return (
                    <Link to={url} className="btn-table more">
                        Ver objetivo
                    </Link>
                );
            }
        },
        {
            text: 'Solicitud',
            dataField: 'tasks',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                let url = PANEL_COMPANY_ROUTES.QUOTATIONS_SHOW.path;
                url = url.replace(":quotation_id", row.id);
                return (
                    <Link to={url} className="btn-table more">
                        Ver más
                    </Link>
                );
            }
        },
        {
            text: 'Pago',
            dataField: 'tasks',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                return row.status == 'ACCEPTED' ?
                    <button type="button"
                            onClick={() => createOrder(row.id)}
                            className="btn btn-primary btn-rounded px-3 btn-sm"
                            style={{height: '24px', lineHeight: '12px'}}>
                        <span className="font-10" style={{height: '20px'}}>Pagar</span>
                    </button> : null
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
