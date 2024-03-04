import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import HeaderBox from "./HeaderBox";
import HeaderNavbar from "./HeaderNavbar";

const Desktop = () => {
    const [fixedTop, setFixedTop] = useState(false);

    function onScroll() {
        const _fixed = fixedTop; // is not redundate, becase te state uts slow on change
        if (window.pageYOffset > 1) {
            if (!_fixed) {
                setFixedTop(true);
            }
        }

        if (window.pageYOffset == 0) {
            setFixedTop(false);
        }
    }

    useEffect(() => {
        onScroll(true);
        window.addEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div className="d-md-block">
                <HeaderTop />
            </div>

            <div
                className={`d-md-block style-props ${
                    fixedTop ? "style-props-fixed-top" : ""
                }`}
            >
                <HeaderBox />
                <HeaderNavbar />
            </div>
        </>
    );
};

export default Desktop;
