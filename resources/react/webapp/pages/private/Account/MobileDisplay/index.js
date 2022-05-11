import React, {useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import PersonalInfo from "../sections/PersonalInfo";
import Addresses from "../sections/Addresses";
import ShoppingHistory from "../sections/ShoppingHistory";
import Subscription from "../sections/Subscription";
import Receipts from "../sections/Receipts";
import CreditAndDebitCard from "../sections/CreditAndDebitCard";
import CustomerService from "../sections/CustomerService";
import {v4 as uuid} from 'uuid';

const MobileDisplay = ({sections}) => {

    const processRouteMobile = (mobileSelected) => {

        switch (mobileSelected) {
            case 0:
                return <PersonalInfo/>

            case 1:
                return <Addresses/>;

            case 2:
                return <ShoppingHistory/>;

            case 3:
                return <Subscription/>;
            case 4:
                return <Receipts/>;
            case 5:
                return <CreditAndDebitCard/>;

            case 6:
                return <CustomerService/>;
        }
    }

    return (
        <div className="col-12">
            <Accordion>
                {
                    Object.keys(sections).map((key, index) => {
                        return (
                            <Card key={uuid()} className="card-faq my-4">
                                <Accordion.Collapse eventKey={index.toString()}>
                                    <Card.Body className="pb-0 pt-1 px-0">
                                        {
                                            processRouteMobile(index)
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header}
                                                  eventKey={index.toString()}>
                                    <h2 className="font-poppins font-21 bold">{sections[key].name}</h2>
                                </Accordion.Toggle>
                            </Card>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default MobileDisplay;
