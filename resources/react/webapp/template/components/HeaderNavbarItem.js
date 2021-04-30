import React from 'react';
import Icon from "../../components/Icon";

const HeaderNavbarItem = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto header-navbar-col" style={{height : '44px'}}>
            <div className="my-auto">
                {icon ? <Icon path={icon}/> : null} <span className="header-navbar-item">{text}</span>
            </div>
        </div>
    );
};

export default HeaderNavbarItem
