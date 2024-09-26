import React from "react";
import { Link } from "react-router-dom";

const LateralMenuItem = ({ section, name, sectionSelected, handleSection }) => {
    return (
        <div className="col-12 mb-2">
            <Link
                to={() => handleSection(section)}
                style={{ textDecoration: "none" }}
            >
                <div
                    className={`menu-section ${
                        section === sectionSelected ? "active" : ""
                    }`}
                >
                    <h3 className="menu-section-item">{name}</h3>
                </div>
            </Link>
        </div>
    );
};

export default LateralMenuItem;
