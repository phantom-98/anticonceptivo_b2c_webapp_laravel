import React from "react";
/* import Icon from "../../components/general/Icon";
 */ import { Link } from "react-router-dom";

const HeaderTopLink = ({ Icon, text, linkTo = "#", flag, email }) => {
    return (
        <div className="col-md-auto top-do-flex" style={{ height: 33 }}>
            {flag ? (
                email ? (
                    <div className="nav-item">
                        <a
                            className="my-auto top-link pl-1 pr-0"
                            style={{ lineHeight: "33px" }}
                            href={linkTo}
                        >
                            <Icon className="text-with-bg" />
                            <span className="top-link pl-1 text-with-bg">
                                {" "}
                                {text}
                            </span>
                        </a>
                    </div>
                ) : (
                    <div className="nav-item">
                        <a
                            className="my-auto top-link pl-1 pr-0"
                            style={{ lineHeight: "33px" }}
                            href={linkTo}
                        >
                            <Icon className="text-with-bg" />
                            <span className="top-link pl-1 text-with-bg">
                                {" "}
                                {text}
                            </span>
                        </a>
                    </div>
                )
            ) : (
                <div className="my-auto">
                    <Link to={linkTo}>
                        {Icon ? <Icon className="text-with-bg" /> : null}{" "}
                        <span className="top-link text-with-bg">{text}</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HeaderTopLink;
