import React from "react";
import LateralMenuItem from "./LateralMenuItem";

const LateralMenu = ({ sections, sectionSelected, handleSection }) => {
    return (
        <div className="row">
            {Object.keys(sections).map((key, index) => {
                return (
                    <LateralMenuItem
                        key={index}
                        name={sections[key].name}
                        sectionSelected={sectionSelected}
                        section={sections[key].url}
                        handleSection={handleSection}
                    />
                );
            })}
        </div>
    );
};

export default LateralMenu;
