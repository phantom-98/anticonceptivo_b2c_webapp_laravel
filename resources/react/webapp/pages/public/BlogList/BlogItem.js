import React from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {CONFIG} from "../../../Config";

const BlogItem = ({blog, image}) => {
    return (
        <div className="col-md-6 mb-3">
            <div className="panel" style={{borderRadius: '12px'}}>
                <div className="panel-body p-3">
                    <Link to={PUBLIC_ROUTES.BLOG_EXAMPLE.path} style={{textDecoration : 'none'}}>
                        <div className="row">
                            <div className="col-md-auto">
                                <div className="blog-list-img">
                                    <img src={image} alt={CONFIG.APP_NAME}/>
                                </div>
                            </div>
                            <div className="col pl-0">
                                <div className="font-poppins font-14 regular color-009BE8 mb-1">
                                    03 MAR 2021
                                </div>
                                <div className="font-poppins font-20 lh-24 bold color-033F5D  mb-2">
                                    Cesfam administró segunda dosis de Sinovac a 10 personas que debían recibir la de
                                    Pfizer
                                </div>
                                <div>
                                    <Link to={PUBLIC_ROUTES.BLOG_EXAMPLE.path}>
                                        <span className="font-poppins font-12 bold color-009BE8
                                        text-uppercase">
                                                Leer más
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogItem
