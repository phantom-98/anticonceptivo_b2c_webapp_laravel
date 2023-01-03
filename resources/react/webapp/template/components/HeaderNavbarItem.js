import React from 'react';
import Icon from "../../components/general/Icon";
import {Link} from "react-router-dom";

const HeaderNavbarItem = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto header-navbar-col" style={{height : '44px'}}>
            <div className="my-auto">
               <Link to={linkTo ? linkTo : '#'} style={{textDecoration: 'none'}}>
                   {icon ? <div className="left"> <Icon path={icon}/></div> : null} <div className="left header-navbar-item pt-1">{text}</div>
               </Link>
            </div>
        </div>
    );
};

export default HeaderNavbarItem
