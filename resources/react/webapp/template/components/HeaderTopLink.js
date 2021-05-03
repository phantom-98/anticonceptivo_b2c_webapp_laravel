import React from 'react';
import Icon from "../../components/general/Icon";

const HeaderTopLink = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto top-do-flex">
            <div className="my-auto">
                {icon ? <Icon path={icon}/> : null} <span className="top-link">{text}</span>
            </div>
        </div>
    );
};

export default HeaderTopLink
