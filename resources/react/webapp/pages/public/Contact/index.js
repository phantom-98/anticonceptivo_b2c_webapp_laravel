import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import ContactSuccess from "./ContactSuccess";
import ContactForm from "./ContactForm";

const Contact = () => {

    const [showing, setShowing] = useState('form'); // or success

    return (
        <section className="pb-5">
            <div className="container" style={{maxWidth: '943px'}}>
                <div className="row">
                    <div className="col-auto">
                        <Card style={{width: '454px', height: '520px'}}>
                            <Card.Body>
                                {
                                    showing === 'form' ? <ContactForm setShowing={setShowing}/> : null
                                }
                                {
                                    showing === 'success' ? <ContactSuccess /> : null
                                }
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col pt-4">
                        <img className="w-100" style={{maxWidth: '432px'}}
                             src="/themes/web/assets/images/contact/contact.svg" alt="Ikiru - Contacto"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
