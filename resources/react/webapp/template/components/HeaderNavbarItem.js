import React from 'react';
import Icon from "../../components/general/Icon";
import {Link} from "react-router-dom";

const HeaderNavbarItem = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto header-navbar-col" style={{height : '44px'}}>
            <div className="my-auto">
               <Link to={linkTo} style={{textDecoration: 'none'}}>
                   {icon ? <Icon path={icon}/> : null} <span className="header-navbar-item">{text}</span>
               </Link>
            </div>
        </div>
    );
};

export default HeaderNavbarItem
