import React from 'react';
import {Dropdown} from 'react-bootstrap'
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {Link} from "react-router-dom";

const HeaderDropDown = ({postTypes}) =>{

    return (
        <div className="col-md-auto top-do-flex">
            <div className="my-auto">
                <Dropdown className="testingg">
                    <Dropdown.Toggle id="dropdown-testing" className='header-navbar-col-custom'>
                        <div className="my-auto">
                            <span className="top-link header-navbar-item font-regular" style={{fontWeight:500}}>Blog</span>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                        {
                            postTypes.map((postType) => {
                                let urlPostType = PUBLIC_ROUTES.BLOG.path.replace(':post_type_slug?',postType.slug);
                                return <Dropdown.Item>
                                    <Link to={urlPostType} style={{textDecoration: 'none'}}>
                                        {postType.name}
                                    </Link>
                                </Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default HeaderDropDown
