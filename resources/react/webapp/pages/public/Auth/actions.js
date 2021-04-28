import * as Services from "../../../Services";
import {LOCAL_STORAGE} from "../../../context/LocalStorage";
import {AuthType} from "../../../Globals";
import {validateCompleteProfile} from "../../private/Professional/CompleteProfile/actions";
import PANEL_PROFESSIONAL_ROUTES from "../../../routes/professionalRoutes";
import {validateCompanyCompleteProfile} from "../../private/Company/CompleteProfile/actions";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";
import toastr from "toastr";

export const doLogin = (data, callback, type = 'password') => {
    let url = type == 'password' ? Services.ENDPOINT.AUTH.LOGIN : Services.ENDPOINT.AUTH.LOGIN_BY_TOKEN;
    Services.DoPost(url, data).then(response => {

        callback(response.status)

        Services.Response({
            response: response,
            success: () => {

                localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(response.data.auth));
                localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, response.data.auth_token);
                localStorage.setItem(LOCAL_STORAGE.AUTH_TYPE, response.data.auth_type);

                if (response.data.auth_type === AuthType.PROFESSIONAL) {
                    if(validateCompleteProfile(response.data.auth.professional.profile_section_status)){
                        window.location.href = PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path;
                    }else{
                        window.location.href = PANEL_PROFESSIONAL_ROUTES.COMPLETE_PROFILE.path;
                    }

                } else if (response.data.auth_type === AuthType.COMPANY) {
                    if(validateCompanyCompleteProfile(response.data.auth.company.profile_section_status)){
                        window.location.href = PANEL_COMPANY_ROUTES.DASHBOARD.path;
                    }else{
                        window.location.href = PANEL_COMPANY_ROUTES.COMPLETE_PROFILE.path;
                    }
                } else {
                    window.location.href = '/';
                }
            },
            error: () => {
                toastr.error(response.message);
            }
        });
    }).catch(error => {
        Services.ErrorCatch(error)
    });
}
