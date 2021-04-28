import React, {useContext, useEffect, useState} from "react";

import * as Services from "../../../../Services";
import TablePanel from "../../../../components/TablePanel";
import moment from "moment";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import { Link } from "react-router-dom";
import {AuthContext} from "../../../../context/AuthProvider";
import {formatQuotationStatus} from "../../../../helpers/HelperStatus";

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
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.QUOTATIONS.GET_LIST;
        let professional_id = auth.professional_id;

        Services.DoPost(url, {professional_id}).then(response => {
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
            text: 'Empresa',
            dataField: 'company.name',
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
                // console.log('Objetivo', row);
                if(row.project.professional_id == auth.id){
                    let url = PANEL_PROFESSIONAL_ROUTES.PROJECTS_SHOW.path;
                    url = url.replace(":project_id", row.project_id);
                    return (
                        <Link to={url} className="btn-table more">
                            Ver objetivo
                        </Link>
                    );
                }
            }
        },
        {
            text: 'Solicitud',
            dataField: 'tasks',
            sort: true,
            classes: 'nowrap-cell font-12 light color-3C3C3E',
            headerClasses: 'nowrap-cell font-14 bold text-primary',
            formatter: (cell, row) => {
                let url = PANEL_PROFESSIONAL_ROUTES.QUOTATIONS_SHOW.path;
                url = url.replace(":quotation_id", row.id);
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
