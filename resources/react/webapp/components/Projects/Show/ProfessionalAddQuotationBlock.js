import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";
import {formatQuotationStatus} from "../../../helpers/HelperStatus";

const ProfessionalAddQuotationBlock = ({professional, index, addToList, removeFromList, assigns}) => {

    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
    urlProfile = urlProfile.replace(':username', professional.username);

    // let urlQuotation = PANEL_COMPANY_ROUTES.QUOTATIONS_SHOW.path;
    // urlQuotation = urlQuotation.replace(':quotation_id', quotation.id);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const selected = assigns.includes(professional.id)
        console.log(selected);
        setIsSelected(selected);

    }, [assigns])

    return (
        <div className="col-md-6 px-4">
            <div className={`row box-add-quotation-user ${isSelected ? 'active' : ''}`}>
                <div className="col-auto">
                    <Link to={urlProfile} target="_blank">
                        <img
                            className="avatar avatar-small pointer"
                            src={professional.public_image ? professional.public_image : '/themes/web/assets/images/default-profile.svg'}
                            alt={`Ikiru -  ${professional.full_name}`}
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
                                        {professional.full_name}
                                    </Link>
                                </div>
                                <div className="col-auto">
                                    <div className="row">
                                        <div className="col">
                                            {/*<Link to={urlQuotation} className="pointer"*/}
                                            {/*      title={`Ver solicitud ${index + 1}`}>*/}
                                            {/*    <i className="fa fa-eye text-info"/>*/}
                                            {/*</Link>*/}
                                        </div>
                                        <div className="col">
                                            {/*<div className="pointer"*/}
                                            {/*     onClick={() => removeFromList(professional.id)}*/}
                                            {/*     title={`Eliminar solicitud ${index + 1}`}>*/}
                                            {/*    <i className="fa fa-trash text-danger"/>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row font-12 light color-939292">
                                <div className="col">
                                    {
                                        professional.areas.map((area, index) => {
                                            return <span
                                                key={index}>{area.name} {(index + 1) < professional.areas.length ? '-' : ''} </span>
                                        })
                                    }
                                </div>

                                <div className="col-auto d-flex">
                                    <div className="mt-auto">
                                        {
                                            isSelected ?
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromList(professional.id)}
                                                    className="btn btn-primary btn-rounded btn-form btn-sm"
                                                    style={{width: '26px', height: '26px', paddingLeft : '6px'}}>
                                                        <span className="font-12 regular" style={{height: '20px'}}>
                                                            <i className="fa fa-check"/>
                                                        </span>
                                                </button>
                                            :
                                            <button
                                                    type="button"
                                                    onClick={() => addToList(professional.id)}
                                                    className="btn btn-primary btn-rounded btn-form btn-sm"
                                                    style={{width: '26px', height: '26px', paddingLeft : '8px'}}>
                                                        <span className="font-12 regular" style={{height: '20px'}}>
                                                            <i className="fa fa-plus"/>
                                                        </span>
                                                </button>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalAddQuotationBlock;
