import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";

const AccountMenuItem = ({section, name, sectionSelected}) => {

    const handleSection = (section) => {
        let url = PRIVATE_ROUTES.ACCOUNT.path;
        return url.replace(':section', section);
    }

    return (
        <div className="col-12 mb-2">
            <Link to={() => handleSection(section)} style={{textDecoration: 'none'}}>
                <div className={`menu-section ${section === sectionSelected ? 'active' : ''}`}>
                    <span className="menu-section-item">
                        {name}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default AccountMenuItem
