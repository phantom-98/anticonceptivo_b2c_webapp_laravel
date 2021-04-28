import React from 'react';

import {Card} from "react-bootstrap";
import StarView from "../StarView";
import {formatMoney} from "../../helpers/GlobalUtils";
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";
import {Link} from "react-router-dom";
import {starRound} from "../../helpers/Rating"

const PublicProfileBar = ({professional, section = ''}) => {

    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
    urlProfile = urlProfile.replace(':username', professional.username);

    let urlAvailability = PANEL_COMPANY_ROUTES.PROFESSIONAL_AVAILABILITY.path;
    urlAvailability = urlAvailability.replace(':username', professional.username);

    let urlContact = PANEL_COMPANY_ROUTES.PROFESSIONAL_CONTACT.path;
    urlContact = urlContact.replace(':username', professional.username);
    return (
        <div className="row pb-4">
            <div className="col-12">
                <div className="">
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-auto">
                                    <Link to={urlProfile}>
                                        <img
                                            className="avatar avatar-small pointer"
                                            src={professional.public_image ? professional.public_image : '/themes/web/assets/images/default-profile.svg'}/>
                                    </Link>
                                </div>
                                <div className="col-auto d-flex">
                                    <div className="py-auto">
                                        <div
                                            className="font-25 lh-28 bold text-primary pointer">
                                            <Link to={urlProfile}>
                                                {professional.full_name}
                                            </Link>
                                        </div>
                                        <div className="font-12 lh-10 light color-939292">
                                            {
                                                'areas' in professional ? professional.areas.map((area, index) => {
                                                    return <span
                                                        key={index}>{area.name} {(index + 1) < professional.areas.length ? '-' : ''} </span>
                                                }) : null
                                            }
                                        </div>
                                        <div>
                                        {
                                            professional.rating > 0 ? <StarView value={starRound(professional.rating)}/> : null
                                        }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-auto ml-auto d-flex">
                                    <div className="row my-auto">
                                        <div className="col-auto">
                                            <Link to={urlProfile}
                                                  className={`font-12 color-3B3B3B link-profile px-2 ${section === 'profile' ? 'active' : ''}`}>
                                                Ver Perfil
                                            </Link>
                                        </div>
                                        <div className="col-auto">
                                            <Link to={urlAvailability}
                                                  className={`font-12 color-3B3B3B link-profile px-2 ${section === 'schedule' ? 'active' : ''}`}>
                                                Disponibilidad
                                            </Link>
                                        </div>
                                        <div className="col-auto">
                                            <Link to={urlContact}
                                                  className={`font-12 color-3B3B3B link-profile px-2 ${section === 'contact' ? 'active' : ''}`}>
                                                Contacto
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-auto d-flex">
                                    <div className="my-auto">
                                        <div className="font-14 medium text-primary text-right">Valor Hora</div>
                                        <div
                                            className="font-30 regular color-3B3B3B lh-36">{professional.price_hour ? formatMoney(professional.price_hour) : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PublicProfileBar;
