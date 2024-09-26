import React from "react";
import Icon from "../general/Icon";
import boxBlue from "../../assets/images/icons/box-blue.svg";
import { formatMoney } from "../../helpers/GlobalUtils";
import { CONFIG } from "../../Config";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AccordionBody = ({ data }) => {
    return (
        <div className="row">
            <div className="col-md-12 mb-3 d-flex">
                <div className="m-auto">
                    <LazyLoadImage
                        alt={CONFIG.APP_NAME}
                        className="imgAccordionBody"
                        effect="blur"
                        src={data.public_image}
                    />
                </div>
            </div>
            <div className="col-md-12 mb-3 font-inter font-22 bold color-033F5D">
                <div className="row">
                    <div className="col-auto pr-0">
                        <Icon path={boxBlue} />
                    </div>
                    <h3 className="col card-delivery-cost-title inline">
                        El costo de nuestros despachos
                        <h4 className="regular inline">
                            (máximo {data.deadline_delivery} horas hábiles)
                        </h4>
                    </h3>
                </div>
            </div>
            {data.formated_costs.map((cost, index) => {
                let comunnes = cost.communes.join(", ");
                return (
                    <div className="col-md-12 mb-3" key={uuidv4}>
                        <h3>
                            <div
                                style={{
                                    backgroundColor: cost.color,
                                    height: 10,
                                    width: 10,
                                    border: "1px solid #009BE8",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginBottom: 2,
                                }}
                            />
                            <span className="font-poppins font-22 bold color-033F5D">
                                {formatMoney(cost.price)}{" "}
                                {!cost.description.some(
                                    (element) => element === null
                                )
                                    ? `- ${cost.description}`
                                    : ""}
                            </span>
                        </h3>
                        <h3 className="font-inter font-11 medium color-484848 ml-4 pl-2">
                            {comunnes}.
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

export default AccordionBody;
