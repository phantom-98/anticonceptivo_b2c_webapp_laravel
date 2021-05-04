import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import AccountMenuItem from "./AccountMenuItem";

const AccountMenu = ({sections, sectionSelected}) => {


    return (
        <div className="row">
            {
                Object.keys(sections).map((key, index) => {
                    return <AccountMenuItem key={index}
                                            name={sections[key].name}
                                            sectionSelected={sectionSelected}
                                            section={sections[key].url}/>
                })
            }


        </div>
    );
};

export default AccountMenu
