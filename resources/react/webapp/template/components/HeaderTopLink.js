import React from 'react';
import Icon from "../../components/general/Icon";
import {Link} from "react-router-dom";

const HeaderTopLink = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto top-do-flex">
            <div className="my-auto">
                <Link to={linkTo}>{icon ? <Icon path={icon}/> : null} <span className="top-link">{text}</span></Link>
            </div>
        </div>
    );
};

export default HeaderTopLink
