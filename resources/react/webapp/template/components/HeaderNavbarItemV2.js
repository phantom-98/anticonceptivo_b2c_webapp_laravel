import React from 'react';
import Icon from "../../components/general/Icon";
import {Link} from "react-router-dom";

const HeaderNavbarItemV2 = ({icon, text, linkTo}) =>{
    return (
        <div className="col-md-auto header-navbar-col" style={{height : '44px'}}>
            <div className="my-auto">
               <Link to={linkTo ? linkTo : '#'} style={{textDecoration: 'none'}}>
                    <img src={icon} className='pr-1' style={{width:25,height:25, float:'left'}}/>
                    <div className="left header-navbar-item pt-1">{text}</div>
               </Link>
            </div>
        </div>
    );
};

export default HeaderNavbarItemV2
