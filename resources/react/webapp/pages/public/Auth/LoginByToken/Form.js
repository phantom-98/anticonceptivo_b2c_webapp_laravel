import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {setCleanInputError} from "../../../../helpers/GlobalUtils";
import SocialMediaButtons from "../SocialMedia/SocialMediaButtons";
import {doLogin} from "../actions";
import * as Services from "../../../../Services";
import toastr from "toastr";
import LazyLoading from "../../../../components/LazyLoading";

const Form = ({match}) => {

    const [loginLoading, setLoginLoading] = useState(false)

    const [data, setData] = useState({
        auth_email: match.params.email,
        auth_token:  match.params.token,
    });

    useEffect(() =>{
        if (match){
            setData({
                auth_email: match.params.email,
                auth_token:  match.params.token,
            })
            login();
        }
    }, [match])

    const login = () =>{
        setLoginLoading(true)
        doLogin(data, (status) => {
            if(status != 'success'){
                setLoginLoading(false)
            }
        },'token')
    }
    return (
        <Card style={{width: '454px', minHeight: '432px'}}>
            <Card.Body>
                <div className="p-4">
                    <LazyLoading height="430px" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Form;
