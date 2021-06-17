import React, {useState, Fragment} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

const ProductTabs = ({product, legalWarning}) =>{

    const [key, setKey] = useState(product.subcategory.category_id !== 8 ? 'benefits' : 'legal');

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
                    {
                        product.subcategory.category_id !== 8 ? 
                            <Tab eventKey="benefits" title="Beneficios y usos">
                                <div className="panel-bordered bg-white p-5">
                                    <p className="font-poppins font-14 regular">
                                        <div dangerouslySetInnerHTML={{ __html: product.benefits }} />
                                    </p>
                                </div>
                            </Tab>                        
                        : null
                    }

                    {
                        product.subcategory.category_id !== 8 ? 
                            <Tab eventKey="technical" title="Ficha Técnica">
                                <div className="panel-bordered bg-white p-5">
                                    <p className="font-poppins font-14 regular">
                                        <div dangerouslySetInnerHTML={{ __html: product.data_sheet }} />
                                    </p>
                                </div>
                            </Tab>
                        : null
                    }

                    <Tab eventKey="legal" title="Aviso Legal">
                        <div className="panel-bordered bg-white p-5">
                            <p className="font-poppins font-14 regular">
                                <div dangerouslySetInnerHTML={{ __html: legalWarning.description }} />
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ProductTabs
