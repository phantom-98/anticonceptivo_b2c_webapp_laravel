import React from 'react';
import ReactDOM from 'react-dom';
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

const QuotationCompanyCard = ({company}) => {

    let urlProfile = '#' //PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
   // urlProfile = urlProfile.replace(':username', company.username);


    return (
        // <Card>
        //     <Card.Body>
                <div className="row">
                    <div className="col-auto">
                        <Link to={urlProfile} target="_blank">
                            <img
                                className="avatar avatar-small pointer"
                                src={company.public_image ? company.public_image : '/themes/web/assets/images/default-profile.svg'}
                                alt={`Ikiru -  ${company.full_name}`}
                                style={{width: '50px', height: '50px'}}
                            />
                        </Link>
                    </div>
                    <div className="col">
                        <div className="row pt-1">
                            <div className="col pl-0">
                                <div className="row">
                                    <div className="col">
                                        <Link to={urlProfile}
                                              className="font-signika font-16 bold text-primary pointer">
                                            {company.name}
                                        </Link>
                                    </div>
                                </div>
                                <div className="row font-12 light color-939292">
                                    <div className="col">
                                        {company.business_name}
                                        {/*{*/}
                                        {/*    professional.areas.map((area, index) => {*/}
                                        {/*        return <span*/}
                                        {/*            key={index}>{area.name} {(index + 1) < professional.areas.length ? '-' : ''} </span>*/}
                                        {/*    })*/}
                                        {/*}*/}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        //     </Card.Body>
        // </Card>
    );
};

export default QuotationCompanyCard;
