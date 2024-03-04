import React, { useContext, useEffect, useState } from "react";
import Icon from "../../../components/general/Icon";
import logoFull from "../../../assets/images/logo-full.svg";
import cardioLogoFull from "../../../assets/images/cardioLogo.svg";
import oxfarLogoFull from "../../../assets/images/oxfar.svg";
import bioLogoFull from "../../../assets/images/bioequivalente.png";
import StepResponsive from "../../../components/shopping/StepResponsive";
import { AppContext } from "../../../context/AppProvider";

const Header = ({ showFinal }) => {
    const [logo, setLogo] = useState(logoFull);
    const { currentStore } = useContext(AppContext);
    const [ready, setReady] = useState({
        one: false,
        two: false,
        three: false,
    });

    useEffect(() => {
        switch (currentStore) {
            case "cardio":
                setLogo(cardioLogoFull);

                break;
            case "anticonceptivo":
                setLogo(logoFull);
                break;
            case "bioequivalente":
                setLogo(bioLogoFull);
                break;

            default:
                setLogo(oxfarLogoFull);
                break;
        }
    }, []);

    useEffect(() => {
        if (showFinal !== 1) {
            setReady({
                one: true,
                two: false,
                three: false,
            });
        } else {
            setReady({
                one: false,
                two: false,
                three: false,
            });
        }
    }, [showFinal]);

    return (
        <div className="row pb-4">
            <div className="col-md-12 col-lg pb-3 pb-lg-0 d-none d-md-flex">
                <div className="my-auto">
                    <Icon
                        path={logo}
                        style={{ width: "100%", maxHeight: "47px" }}
                    />
                </div>
            </div>
            <div className="col-md-12 col-lg-auto">
                <div className="row justify-content-md-start justify-content-end">
                    <div className="col col-md-auto py-1 px-0 px-md-3">
                        <StepResponsive
                            title="DATOS PERSONALES"
                            number="1"
                            disabled={false}
                            isHeader={true}
                            isReady={ready.one}
                        />
                        <div className="step-back-line step-back-line-first" />
                    </div>
                    <div className="col col-md-auto py-1 px-0 px-md-3">
                        <StepResponsive
                            title="DATOS DE ENVÍO"
                            number="2"
                            disabled={!ready.one}
                            isHeader={true}
                            isReady={ready.two}
                        />
                        <div className="step-back-line" />
                    </div>
                    <div className="col col-md-auto py-1 px-0 px-md-3">
                        <StepResponsive
                            title="PAGO"
                            number="3"
                            disabled={true}
                            isHeader={true}
                            isReady={ready.three}
                        />
                        <div className="step-back-line step-back-line-last" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
