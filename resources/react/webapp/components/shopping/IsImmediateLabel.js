import React from 'react';
import isImmediateSvgWhite  from '../../assets/images/icons/immediate-white.svg'
import arrivesTodayBlue  from '../../assets/images/icons/arrives-today-blue.svg'
import arrivesTomorrowGreen  from '../../assets/images/icons/arrives-tomorrow-green.svg'

const IsImmediateLabel = ({product}) =>{

    const Immediate = () => {
        return (
            <div className="is-immediate-label">
                <img src={isImmediateSvgWhite} alt="anticonceptivo.cl"/> <span>Entrega inmediata</span>
            </div>
        )
    }

    const Today = () => {
        return (
            <div className="is-today-label">
                <img src={arrivesTodayBlue} alt="anticonceptivo.cl"/> <span>Lleva hoy</span>
            </div>
        )
    }

    const Tomorrow = () => {
        return (
            <div className="is-tomorrow-label">
                <img src={arrivesTomorrowGreen} alt="anticonceptivo.cl"/> <span>Lleva mañana</span>
            </div>
        )
    }

    return (
       <div className="row">
           <div className="col-12 justify-content-end">
               {
                   product.is_immediate ?
                       <Immediate /> : Math.round(Math.random()) ? <Today /> : <Tomorrow/>
               }
           </div>
       </div>
    );
};

export default IsImmediateLabel
