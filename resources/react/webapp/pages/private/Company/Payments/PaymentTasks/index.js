import React, {useEffect, useContext} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import CompanyTask from "../../../../../components/TaskItem/CompanyTasks";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const PaymentTasks = ({match}) => {

    const { auth } = useContext(AuthContext);

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PAYMENTS.path,
            name: PANEL_COMPANY_ROUTES.PAYMENTS.title
        },
        // {
        //     url: PANEL_COMPANY_ROUTES.TASKS.path,
        //     name: PANEL_COMPANY_ROUTES.TASKS.title
        // }
    ];

    useEffect(() => {
        // console.log(match);
        index();
    },[]);

    const index = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.PAYMENTS.TASKS.GET_TASKS;
        let company_id = auth.id;

        Services.DoPost(url, { company_id })
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        // setObjects(response.data.orders);
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    // <SectionTitle title={`Tareas Pago Nº ${orderLoaded.id}`} />;

    return (
        <BasePanel
            // title={PANEL_COMPANY_ROUTES.TASKS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        {/* <CompanyTask authId={authId} orderId={orderId} /> */}
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default PaymentTasks;
