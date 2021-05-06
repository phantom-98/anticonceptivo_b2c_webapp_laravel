import React, {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

const ProductTabs = () =>{

    const [key, setKey] = useState('benefits');

    return (
        <div className="row pb-5">
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>

            </div>
            <div className="col">
                <Tabs
                    id="tabs"
                    variant="pills"
                    className="tabs-about-us"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="benefits" title="Beneficios">
                        <div className="panel-bordered bg-white p-5">
                            <p className="font-poppins font-14 regular">
                                Dispensación sujeta a normativa sanitaria. Precio exclusivo para compras realizadas a través de nuestro sitio web. Precio no incluye costos de despacho. No se automedique.
                            </p>
                            <p className="font-poppins font-14 regular">
                                Despacho de productos y/o medicamentos sujetos a stock y disponibilidad técnica de medios de transporte y/o despacho. Para mayor información, llamar al número 000 00 0000, teléfonos celulares al *0000 o al XXXXX,
                            </p>
                        </div>
                    </Tab>
                    <Tab eventKey="technical" title="Ficha Técnica">
                        <div className="panel-bordered bg-white p-5">
                            <p className="font-poppins font-14 regular">
                                Dispensación sujeta a normativa sanitaria. Precio exclusivo para compras realizadas a través de nuestro sitio web. Precio no incluye costos de despacho. No se automedique.
                            </p>
                            <p className="font-poppins font-14 regular">
                                Despacho de productos y/o medicamentos sujetos a stock y disponibilidad técnica de medios de transporte y/o despacho. Para mayor información, llamar al número 000 00 0000, teléfonos celulares al *0000 o al XXXXX,
                            </p>
                        </div>
                    </Tab>

                    <Tab eventKey="legal" title="Avisa Legal">
                        <div className="panel-bordered bg-white p-5">
                            <p className="font-poppins font-14 regular">
                                Dispensación sujeta a normativa sanitaria. Precio exclusivo para compras realizadas a través de nuestro sitio web. Precio no incluye costos de despacho. No se automedique.
                            </p>
                            <p className="font-poppins font-14 regular">
                                Despacho de productos y/o medicamentos sujetos a stock y disponibilidad técnica de medios de transporte y/o despacho. Para mayor información, llamar al número 000 00 0000, teléfonos celulares al *0000 o al XXXXX,
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ProductTabs
