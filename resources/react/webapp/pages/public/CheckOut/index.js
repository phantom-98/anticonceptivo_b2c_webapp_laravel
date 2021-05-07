import React, {Fragment, useContext, useEffect, useState} from 'react';

import Step from "../../../components/shopping/Step";
import GrantUser from "./GrantUser";
import Resume from "./Resume";
import UserForm from "./UserForm";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";
import Header from "./Header";

const CheckOut = () => {
    const [showFinal, setShowFinal] = useState(1)
    const [view, setView] = useState('grant-user')
    const [step, setStep] = useState({
        number: 1,
        title: 'DATOS PERSONALES',
    })
    useEffect(() => {
        switch (view) {
            case "grant-user":
            case "user-form":
                setStep({
                    number: 1,
                    title: 'DATOS PERSONALES',
                })
                setShowFinal(1)
                break;
            case "add-address":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(2)
                break;
            case "addresses":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(3)
                break;
        }

    }, [view])

    return (
        <Fragment>
            <div className="pb-5" style={{background: '#FAFAFA'}}>
                <div className="container pt-4">

                    <Header showFinal={showFinal} />

                    <div className="row pb-5">
                        <div className="col-md pr-2">
                            <div className="panel panel-cart mb-3">
                                <div className="panel-body" style={{paddingTop: '11px', paddingBottom: '10px'}}>
                                    <Step title={step.title} number={step.number} disabled={false}/>
                                </div>
                            </div>

                            {
                                view == 'grant-user' ? <GrantUser setView={setView}/> : null
                            }
                            {
                                view == 'user-form' ? <UserForm setView={setView}/> : null
                            }
                            {
                                view == 'add-address' ? <AddAddress setView={setView}/> : null
                            }
                            {
                                view == 'addresses' ? <Addresses setView={setView}/> : null
                            }


                        </div>
                        <div className="col-md-auto pl-2" style={{width: '408px'}}>
                            <Resume showFinal={showFinal}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CheckOut
