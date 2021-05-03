import React, {useContext} from 'react';
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";

const Login = () =>{

    const {showModalAuth} = useContext(AppContext)

    return (
        <>
            <h2>Login</h2>

            <span onClick={() => showModalAuth(ModalAuthMode.REGISTER)}>Register</span>
        </>
    );
};

export default Login
