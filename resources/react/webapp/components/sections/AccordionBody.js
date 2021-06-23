import React from 'react';
import Icon from "../general/Icon";
import boxBlue from '../../assets/images/icons/box-blue.svg';

const AccordionBody = ({data}) => {
    return(
        <div className="row">
            <div className="col-md-12 mb-3 font-inter font-22 bold color-033F5D">
                <Icon path={boxBlue} className="mr-3"/> El costo de nuestros despachos <span className="regular">(plazos máximos de {data.deadline_delivery} horas)</span>
            </div>
            {
                data.formated_costs.map((cost) => {
                    return(
                         <div className="col-md-12 mb-3">
                            <h3>
                                <span className="font-poppins font-22 bold color-033F5D">{cost.id}</span>
                            </h3>
                            <p className="font-inter font-11 regular color-484848">
                                {cost.communes}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AccordionBody;