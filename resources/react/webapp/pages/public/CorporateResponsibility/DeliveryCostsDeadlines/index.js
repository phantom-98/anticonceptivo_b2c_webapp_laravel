import React from 'react';

import H3Panel from "../../../../components/general/H3Panel";
import {CONFIG} from "../../../../Config";
import mapDelivery from '../../../../assets/images/pages/delivery/maps-devilery.svg'
import Icon from "../../../../components/general/Icon";
import boxBlue from '../../../../assets/images/icons/box-blue.svg'
import circleLight from '../../../../assets/images/icons/circle-light.svg'
import circleDark from '../../../../assets/images/icons/circle-dark.svg'

const DeliveryCostsDeadlines = () => {
    return (
        <div className="row">

            <H3Panel title="PLAZOS Y COSTOS DE ENTREGA"/>

            <div className="col-md-12 mb-3">
                <div className="header-alert">
                    Región Metropolitana
                </div>
            </div>
            <div className="col-md-12 mb-3 d-flex">
                <div className="m-auto">
                    <img src={mapDelivery} alt={CONFIG.APP_NAME}/>
                </div>
            </div>
            <div className="col-md-12 mb-3">
                <Icon path={boxBlue} /> <span className="font-inter font-22 regular color-033F5D">El costo de nuestros despachos (plazos máximos de 48 horas)</span>
            </div>
            <div className="col-md-12 mb-3">
                <h3>
                    <Icon path={circleLight} /> <span className="font-poppins font-22 bold color-033F5D">$3.500</span>
                </h3>
                <p className="font-inter font-11 regular color-484848">
                    Cerrillos, Cerro Navia, Conchalí, El Bosque, Estación Central, Huechuraba, Independencia, La Cisterna, La Florida, La Pintana, La Granja, La Reina, Las Condes, Lo Barnechea, Lo Espejo, Lo Prado, Macul, Maipú, Ñuñoa, Pedro Aguirre Cerda, Peñalolén, Providencia, Pudahuel, Quilicura, Quinta Normal, Recoleta, Renca, San Miguel, San Joaquín, San Ramón, Santiago (Centro) y Vitacura.

                </p>
            </div>
            <div className="col-md-12 mb-3">
                <h3>
                    <Icon path={circleDark} /> <span className="font-poppins font-22 bold color-033F5D">$6.000</span>
                </h3>
                <p className="font-inter font-11 regular color-484848">
                    Buin, Padre Hurtado, Talagante, Colina, Lampa, Paine, Calera de Tango, Peñaflor,  Melipilla, Pirque, Curacaví e Isla de Maipo.San Ramón, Santiago (Centro) y Vitacura.
                </p>
            </div>
        </div>
    );
};

export default DeliveryCostsDeadlines
