import React, {Fragment, useContext} from 'react';

import {AuthContext} from "../../../context/AuthProvider";
import MenuLogged from "./MenuLogged";
import MenuNoLogged from "./MenuNoLogged";

const MenuAuth = () => {

    const {auth, authType} = useContext(AuthContext);

    return (
        <Fragment>
            {
                auth ? <MenuLogged /> : <MenuNoLogged />
            }
        </Fragment>
    );
};

export default MenuAuth;
