import React, {useState} from 'react';
import StarView from "../../../StarView";
import Switch from "react-switch";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import {validateCompleteProfile} from "../../../../pages/private/Professional/CompleteProfile/actions";
import toastr from "toastr";
import * as Services from "../../../../Services";
import {starRound} from "../../../../helpers/Rating";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";

const Info = ({editable, editMode, setEditMode,  professional , setProfessional}) => {

    const [visible, setVisible] = useState(professional.visible == 1 ? true : false);
    const [disabled, setDisabled] = useState(false);

    const changeVisibility = (status) => {

        if (!professional.price_hour) {
            toastr.warning('Por favor ingrese su valor hora.')
            return null
        }else if(!professional.bank_account_type || !professional.bank_account_number || 
            !professional.bank_account_email || !professional.bank_account_rut || !professional.bank_id){
            toastr.warning('Por favor complete sus datos bancarios en el siguiente ' + "<a class='text-primary bold' href='"+PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_BANK.path+"'>link</a>")
            return null
        }else if(!validateCompleteProfile(professional.profile_section_status)){
            toastr.warning('Por favor complete sus datos de perfil.')
            return null
        }else{
            setVisible(status)
        }

        setDisabled(true)
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.SET_VISIBILITY;
        let data = {
            visible: status,
            professional_id: professional.id
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setDisabled(false)
                    setVisible(status);
                    // setProfessional(response.data.professional)
                    toastr.success(response.message);
                },
                error: () => {
                    toastr.error(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    return (
        <div className="row h-100">
            <div className="col-auto d-flex mr-auto">
                <div className="my-auto">
                    <div className="font-35 bold text-primary">
                        {professional.full_name}
                    </div>
                    <div className="font-16 light color-939292">
                        {professional.areas.map((area, index) => {
                            return (
                                <span key={index}>
                                                {area.name}{" "}
                                    {index + 1 <
                                    professional.areas.length
                                        ? "-"
                                        : ""}{" "}
                                            </span>
                            );
                        })}
                    </div>
                    <div>
                        {
                            professional.rating > 0 ? <StarView value={starRound(professional.rating)}/> : null
                        }
                    </div>
                </div>
            </div>

            {
                editable ? (
                    <div className="col-auto d-flex">
                        <div className="row my-auto">
                            <div className="col-auto">
                                <span className="font-14 color-939292">
                                    Perfil público
                                </span>
                            </div>
                            <div className="col">
                            <Switch
                                disabled={disabled}
                                checkedIcon={<div className="font-12 text-white" style={{    fontWeight: '500',  padding:'0.35rem'}}>ON</div>}
                                uncheckedIcon={<div className="font-12 text-white" style={{   fontWeight: '500',  padding:'0.35rem'}}>OFF</div>}
                                className="switcher-react"
                                width={60}
                                onChange={(value) => { changeVisibility(value)}} 
                                checked={visible} 
                            />
                            </div>
                        </div>
                    </div>
                ) : null
            }

            <div className="col-auto d-flex">
                <div className="my-auto">
                    <div className="font-14 medium text-primary text-right">
                        Valor Hora
                    </div>
                    <div className="font-30 regular color-3B3B3B lh-36">
                        {
                            professional.price_hour
                                ? formatMoney(professional.price_hour)
                                : "$-"
                        }
                    </div>
                </div>
            </div>
            {editable ? (
                <div className="col-auto d-flex">
                    <div className="my-auto pointer" onClick={() => setEditMode(true)}>
                        <div className="text-center">
                            <img
                                src="/themes/web/assets/images/icons/edit-secondary.svg"
                                alt=""
                            />
                        </div>
                        <div className="font-12 light color-939292 text-center">
                            Editar
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Info;
