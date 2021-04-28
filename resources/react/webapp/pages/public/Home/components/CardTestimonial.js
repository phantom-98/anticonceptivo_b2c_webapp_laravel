import React from 'react';
import {Card} from "react-bootstrap";
import StarView from "../../../../components/StarView";
import {starRound} from "../../../../helpers/Rating";

const CardTestimonial = ({imgPath, name, area, description, stars, width = 290, height = 294}) => {
    return (
        <Card style={{width: width, height: height}}>
            <Card.Body>
                <div className="row py-2 card-testimonials">
                    <div className="col-12 pb-3">
                        <div className="row">
                            <div className="col-auto">
                                <img src={imgPath} rel="nofollow"/>
                            </div>
                            <div className="col pl-0 d-flex">
                                <div className="my-auto">
                                    <div className="font-signika font-16 text-primary bold">{name}</div>
                                    <div className="font-epilogue font-12 light color-939292">{area}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 card-testimonial-description pt-2">
                        <div className="font-epilogue font-12 light color-3C3C3E">{description}</div>
                    </div>
                    <div className="col-12">
                        <StarView value={starRound(stars)} size={12}/>
                    </div>
                </div>
            </Card.Body>
        </Card>

    );
};

export default CardTestimonial;
