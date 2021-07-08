import React from 'react';
import {Dropdown} from 'react-bootstrap'

const HeaderDropDown = ({postTypes}) =>{

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div className="pointer" ref={ref}>
            {children}
        </div>
    ));

    return (
        <div className="col-md-auto top-do-flex">
            <div className="my-auto">
                <Dropdown
                    // key={category.categoryId}
                    // show={show[category.categoryId]}
                    // onMouseEnter={() => showDropdown(category.categoryId)} 
                    // onMouseLeave={() => hideDropdown(category.categoryId)}
                    // drop={'down'}
                >
                    <Dropdown.Toggle as={CustomToggle} id="header-drop-down">
                        <div className="col-md-auto header-navbar-col" style={{height : '44px'}}>
                            <div className="my-auto">
                                <span className="top-link header-navbar-item">Blog</span>
                            </div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom">
                        {
                            postTypes.map((postType) => {
                                return <Dropdown.Item href="#/action-1">{postType.name}</Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default HeaderDropDown
