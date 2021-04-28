import React from 'react';
import {Card} from "react-bootstrap";

const CardHowWork = ({imgPath, title, description, width = 261, height = 340}) => {
    return (
        <Card style={{width: width, height: height}}>
            <Card.Body>
                <div className="row py-2 px-2">
                    <div className="col-12">
                        <img src={imgPath} rel="nofollow"/>
                    </div>
                    <div className="col-12">
                        <div className="font-16 text-primary bold my-3">{title}</div>
                        <div className="font-epilogue font-14 light color-3C3C3E">{description}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>

    );
};

export default CardHowWork;
