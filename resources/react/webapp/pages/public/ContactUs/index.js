import React from "react";
import BasePanelOne from "../../../template/BasePanelOne";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

import ContactForm from "./ContactForm";

const ContactUs = () => {
    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: "Inicio",
        },
        {
            url: PUBLIC_ROUTES.CONTACT_US.path,
            name: PUBLIC_ROUTES.CONTACT_US.title,
        },
    ];

    return (
        <BasePanelOne
            breadcrumbs={breadcrumbs}
            title={PUBLIC_ROUTES.CONTACT_US.title}
        >
            <div className="row">
                <div className="col">
                    <ContactForm />
                </div>
            </div>
        </BasePanelOne>
    );
};

export default ContactUs;
