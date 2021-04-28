import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";
import {formatQuotationStatus} from "../../../helpers/HelperStatus";

const QuotationProfessional = ({quotation, index, destroyQuotation}) => {

    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
    urlProfile = urlProfile.replace(':username', quotation.professional.username);


    let urlQuotation = PANEL_COMPANY_ROUTES.QUOTATIONS_SHOW.path;
    urlQuotation = urlQuotation.replace(':quotation_id', quotation.id);

    return (
        <div className="row box-quotation-user">
            <div className="col-auto">
                <Link to={urlProfile} target="_blank">
                    <img
                        className="avatar avatar-small pointer"
                        src={quotation.professional.public_image ? quotation.professional.public_image : '/themes/web/assets/images/default-profile.svg'}
                        alt={`Ikiru -  ${quotation.professional.full_name}`}
                        style={{width: '50px', height: '50px'}}
                    />
                </Link>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col pl-0">
                        <div className="row">
                            <div className="col">
                                <Link to={urlProfile} target="_blank"
                                      className="font-signika font-16 bold text-primary pointer">
                                    {quotation.professional.full_name}
                                </Link>
                            </div>
                            <div className="col-auto">
                                <div className="row">
                                    <div className="col">
                                        <Link to={urlQuotation} className="pointer"
                                             title={`Ver solicitud ${index + 1}`}>
                                            <i className="fa fa-eye text-info"/>
                                        </Link>
                                    </div>
                                    <div className="col">

                                        <div className="pointer"
                                             onClick={() => destroyQuotation(quotation.id)}
                                             title={`Eliminar solicitud ${index + 1}`}>
                                            <i className="fa fa-trash text-danger"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row font-12 light color-939292">
                            <div className="col">
                                {
                                    quotation.professional.areas.map((area, index) => {
                                        return <span
                                            key={index}>{area.name} {(index + 1) < quotation.professional.areas.length ? '-' : ''} </span>
                                    })
                                }
                            </div>

                            <div className="col-auto d-flex">
                                <div className="mt-auto">
                                    {
                                        formatQuotationStatus(quotation.status)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuotationProfessional;
