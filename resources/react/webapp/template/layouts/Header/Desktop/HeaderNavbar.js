import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const HeaderNavbar = () => {
    return ( []
        // <Navbar
        //     className="header-navbar"
        //     bg="dark"
        //     variant="dark"
        //     onMouseLeave={() => setSelected('')}
        // >
        //     <Container>
        //         <Nav className="justify-content-center nav">
        //             {mainMenu.map((item: MainMenuEntity) => {
        //                 if (item.type == 'Button') {
        //                     return (
        //                         <Link
        //                             key={uuid()}
        //                             href={{
        //                                 pathname: `/category/${encodeURIComponent(
        //                                     item.slug
        //                                 )}`,
        //                             }}
        //                             passHref
        //                         >
        //                             <a
        //                                 className="btn btn-discount my-auto d-flex"
        //                                 style={{ whiteSpace: 'nowrap' }}
        //                             >
        //                                 <div className="my-auto row g-0">
        //                                     <div className="col">
        //                                         <Icon path={discountWhite} />
        //                                     </div>
        //                                     <div
        //                                         className="col-auto"
        //                                         style={{ marginTop: '-1px' }}
        //                                     >
        //                                         <span className="ms-1 p-0 header-navbar-item black font-11">
        //                                             {item.name}
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </a>
        //                         </Link>
        //                     );
        //                 } else {
        //                     return (
        //                         <div
        //                             key={uuid()}
        //                             onMouseEnter={() => setSelected(item.slug)}
        //                             className={`nav-item dropdown ${
        //                                 selected === item.slug ? 'show' : ''
        //                             }`}
        //                         >
        //                             <Link
        //                                 href={`/category/${encodeURIComponent(
        //                                     item.slug
        //                                 )}`}
        //                                 passHref
        //                             >
        //                                 <a
        //                                     id={item.slug}
        //                                     aria-expanded="false"
        //                                     className="dropdown-toggle nav-link"
        //                                 >
        //                                     {item.name}
        //                                 </a>
        //                             </Link>
        //                             <div
        //                                 onMouseLeave={() => setSelected('')}
        //                                 aria-labelledby={item.slug}
        //                                 data-bs-popper="static"
        //                                 className={`dropdown-menu ${
        //                                     selected === item.slug ? 'show' : ''
        //                                 } ${
        //                                     item.children &&
        //                                     item.children?.length > 5
        //                                         ? 'columns-2'
        //                                         : ''
        //                                 }`}
        //                             >
        //                                 {item.children !== undefined &&
        //                                 item.children.length
        //                                     ? item.children.map(
        //                                           (
        //                                               subCategory: MainMenuEntity
        //                                           ) => {
        //                                               return (
        //                                                   <Link
        //                                                       key={uuid()}
        //                                                       href={{
        //                                                           pathname: `/category/${encodeURIComponent(
        //                                                               item.slug
        //                                                           )}`,
        //                                                           query: {
        //                                                               subcategories:
        //                                                                   subCategory.slug,
        //                                                           },
        //                                                       }}
        //                                                       passHref
        //                                                   >
        //                                                       <a
        //                                                           className={`dropdown-item`}
        //                                                       >
        //                                                           {
        //                                                               subCategory.name
        //                                                           }
        //                                                       </a>
        //                                                   </Link>
        //                                               );
        //                                           }
        //                                       )
        //                                     : null}
        //                             </div>
        //                         </div>
        //                     );
        //                 }
        //             })}
        //         </Nav>
        //     </Container>
        // </Navbar>
    );
};

export default HeaderNavbar
