import React from 'react';
import Icon from "../general/Icon";
import boxBlue from '../../assets/images/icons/box-blue.svg';
import { formatMoney } from "../../helpers/GlobalUtils";
import {CONFIG} from "../../Config";
import { v4 as uuidv4 } from 'uuid';

const AccordionBody = ({data}) => {

    return(
        <div className="row">
            <div className="col-md-12 mb-3 d-flex">
                <div className="m-auto">
                    <img src={data.public_image} alt={CONFIG.APP_NAME} style={{maxWidth: '100%'}}/>
                </div>
            </div>
            <div className="col-md-12 mb-3 font-inter font-22 bold color-033F5D">
                <Icon path={boxBlue} className="mr-3"/> El costo de nuestros despachos <span className="regular">(plazos máximos de {data.deadline_delivery} horas)</span>
            </div>
            {
                data.formated_costs.map((cost) => {
                    let comunnes = cost.communes.join(', ');
                    return(
                        <div className="col-md-12 mb-3" key={uuidv4}>
                            <h3>
                                <span style={{
                                    backgroundColor: cost.color,
                                    height: 20,
                                    width: 20,
                                    border: '1px solid #009BE8',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                }}></span> <span className="font-poppins font-22 bold color-033F5D">{formatMoney(cost.price)}</span>
                            </h3>
                            <p className="font-inter font-11 regular color-484848 ml-4 pl-2">
                                {comunnes}.
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AccordionBody;
