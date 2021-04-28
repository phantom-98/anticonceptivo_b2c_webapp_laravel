import React from 'react';

import {Card} from "react-bootstrap";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import StarView from "../../../../../components/StarView";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import {Link} from "react-router-dom";
import {starRound} from "../../../../../helpers/Rating";

const ProfessionalCard = ({professional}) => {

    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
    urlProfile = urlProfile.replace(':username', professional.username);

    let urlAvailability = PANEL_COMPANY_ROUTES.PROFESSIONAL_AVAILABILITY.path;
    urlAvailability = urlAvailability.replace(':username', professional.username);

    let professional_description = '';
    if (professional.professional_description && professional.professional_description.length > 0) {
        professional_description = (professional.professional_description).substring(0, 200) + '... <a class="color-3B3B3B" href=":urlProfile">Ver más</a>';
        professional_description = professional_description.replace(':urlProfile', urlProfile)
    }

    let professional_skills = professional.skills.sort((a,b) => (a.pivot.level < b.pivot.level) ? 1 : ((b.pivot.level < a.pivot.level) ? -1 : 0))
    professional_skills = professional.skills.slice(0,3)

    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col-auto">
                        <Link to={urlProfile}>
                            <img
                                className="avatar avatar-small pointer"
                                src={professional.public_image ? professional.public_image : '/themes/web/assets/images/default-profile.svg'}
                                alt={`Ikiru -  ${professional.full_name}`}
                            />
                        </Link>
                    </div>

                    <div className="col">
                        <div style={{height: '50px'}}>
                            <Link to={urlProfile}
                                  className="font-signika font-16 bold text-primary pointer">
                                {professional.full_name}
                            </Link>
                            <div className="font-12 light color-939292">
                                {
                                    professional.areas.map((area, index) => {
                                        return <span
                                            key={index}>{area.name} {(index + 1) < professional.areas.length ? '-' : ''} </span>
                                    })
                                }
                            </div>
                        </div>
                        <div style={{height: '110px'}}>
                            <div className="font-14 light color-3C3C3E">
                                <div dangerouslySetInnerHTML={{__html: professional_description}} style={{
                                    whiteSpace: 'pre-line'
                                }}/>
                            </div>
                        </div>
                        <div className="font-12 light text-primary">
                            {

                                professional_skills.map((skill, index) => {
                                    return <span
                                        key={index}>{skill.name} {(index + 1) < professional.skills.length ? ',' : ''} </span>
                                })
                            }
                            {
                                professional.skills.length > 0 ?
                                    <a href={urlProfile} className="ml-2" style={{textDecoration: 'underline'}}>Ver más</a> : ''
                            }
                        </div>
                    </div>

                    <div className="col-auto">
                        <div style={{height: '50px'}}>
                            {
                                professional.rating > 0 ? <StarView value={starRound(professional.rating)} size={15}/> : null
                            }
                        </div>
                        <div style={{height: '110px'}}>
                            <div className="mb-2">
                                <div className="font-14 medium text-primary">Valor Hora</div>
                                <div
                                    className="font-16 regular color-3B3B3B">{formatMoney(professional.price_hour)}</div>
                            </div>
                            <div className="mb-2">
                                <div className="font-14 medium text-primary">Modo de trabajo</div>
                                <div className="font-16 regular color-3B3B3B">Remoto</div>
                            </div>
                        </div>
                        <div>
                            <Link to={urlAvailability} className="btn btn-primary btn-rounded btn-form">
                                <span className="font-12 regular">Ver Horario</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProfessionalCard;
