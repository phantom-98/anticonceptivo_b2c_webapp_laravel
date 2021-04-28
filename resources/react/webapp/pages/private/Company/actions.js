import * as Services from "../../../Services";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";

export const createOrder = (quotation_id) => {
    let url = Services.ENDPOINT.PANEL.PAYMENTS.CREATE_ORDER;
    let data = {
        quotation_id: quotation_id
    }
    Services.DoPost(url, data)
        .then(response => {
            Services.Response({
                response: response,
                success: () => {
                    let url = PANEL_COMPANY_ROUTES.ORDER_PAY.path;
                    url = url.replace(':orderAuthToken', response.data.order_auth_token)
                    return window.location.href = url;
                },
                error: () => {

                },
                warning: () => {

                }
            });
        })
        .catch(error => {
            Services.ErrorCatch(error);
        });
};
