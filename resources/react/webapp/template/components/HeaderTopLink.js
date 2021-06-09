import React from 'react';
import Icon from "../../components/general/Icon";
import {Link} from "react-router-dom";

const HeaderTopLink = ({icon, text, linkTo = '#', flag, email}) =>{
    return (
        <div className="col-md-auto top-do-flex">
            {
                flag ? 
                    email ?
                    <div className="nav-item">
                        <a className="my-auto top-link pl-1 pr-0" style={{lineHeight: '33px'}} href="mailto:contacto@anticonceptivo.cl"><Icon path={icon}/>
                            <span className="top-link pl-1">{' '}contacto@anticonceptivo.cl</span>
                        </a>
                    </div>
                    :
                    <div className="nav-item">
                        <a className="my-auto top-link pl-1 pr-0" style={{lineHeight: '33px'}} href="tel:232451883"><Icon path={icon}/>
                            <span className="top-link pl-1">{' '}(2) 3245 1883</span>
                        </a>
                    </div>
                    
                : 
                    <div className="my-auto">
                        <Link to={linkTo}>{icon ? <Icon path={icon}/> : null} <span className="top-link">{text}</span></Link>
                    </div>
            }
        </div>
    );
};

export default HeaderTopLink
