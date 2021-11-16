import React, {useState, useEffect} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

const ProductTabs = ({product, legalWarning, valid}) =>{

    const [key, setKey] = useState(valid ? 'benefits' : 'technical');

    return (
        <div className="row pb-5 mt-5">
            <div className="col-12">
                <Tabs
                    id="tabs"
                    variant="pills"
                    className="tabs-about-us pr-2 col-12"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    {
                        valid ?
                            <Tab eventKey="benefits" title="Beneficios y usos">
                                <div className="panel-bordered bg-white padding-responsive-detail">
                                    <p className="font-poppins font-14 regular">
                                        <div dangerouslySetInnerHTML={{ __html: product.benefits }} />
                                    </p>
                                </div>
                            </Tab>
                            : null
                    }

                    <Tab eventKey="technical" title="Descriptor">
                        <div className="panel-bordered bg-white padding-responsive-detail">
                            <p className="font-poppins font-14 regular">
                                <div dangerouslySetInnerHTML={{ __html: product.data_sheet }} />
                            </p>
                        </div>
                    </Tab>

                    <Tab eventKey="legal" title="Aviso Legal">
                        <div className="panel-bordered bg-white padding-responsive-detail">
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
