import React, { useState } from "react";
import { formatMoney } from "../../../helpers/GlobalUtils";
import AddCartCard from "../../../components/shopping/AddCartCard";
import { Accordion, Card } from "react-bootstrap";

const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [subscription, setSubscription] = useState(null);

    const handleSubscription = (subscription_plan) =>{
        if(subscription == null){
            setSubscription(subscription_plan.subscription_plan)
        }else if(subscription.id != subscription_plan.subscription_plan.id){
            setSubscription(subscription_plan.subscription_plan)
        }else{
            setSubscription(null)
        }
    }



    return (
        <div className="row">
            <div className="col-md-6">
                <span className="font-poppins font-14 font-italic color-707070">
                    {product.laboratory.name}
                </span>
            </div>
            <div className="col-md-6 text-right">
                <span className="font-poppins font-14 color-009BE8">
                    SKU: {product.sku}
                </span>
            </div>
            <div className="col-md-12">
                <h1 className="font-poppins font-27 bold text-black">
                    {product.name}
                </h1>
            </div>
            <div className="col-md-12">
                <p className="font-poppins font-14 regular color-6C6B6B">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.description
                        }}
                    />
                </p>
            </div>
            <div className="col-md-12">
                <span className="font-poppins font-36 bold color-009BE8">
                    {subscription == null
                        ? [
                              formatMoney(product.price) ,
                              <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                   C/U
                              </span>
                          ]
                        : [
                              formatMoney(subscription.price) ,
                              <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                   al mes
                              </span>
                          ]}
                </span>
            </div>

            {/* <div className="col-md-12 mb-3">
                <p className="font-inter font-16 bold color-033F5D">
                    Suscríbete a nuestros planes
                </p>
                <div className="row">
                    {
                        product.plans.map(plan => {
                            return(
                                <div className="col-auto ">
                                    <button className="btn btn-outline-primary btn-months">
                                       { plan.subscription_plan.months } Meses
                                    </button>
                                </div>
                            )
                        })
                    } */}
            {/* <div className="col-auto ">
                        <button className="btn btn-outline-primary btn-months">
                            4 Meses
                        </button>
                    </div>
                    <div className="col-auto px-0">
                        <button className="btn btn-outline-primary btn-months">
                            6 Meses
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-primary btn-months">
                            12 Meses
                        </button>
                    </div> */}
            {/* </div>
            </div> */}

            <div className="col-md-6 mb-3">
                <AddCartCard
                    quantity={quantity}
                    setQuantity={setQuantity}
                    product={product}
                    subscription={subscription}
                />
            </div>

            <div className="col-md-12">
                <Accordion className="accordion-faq">
                    <Card
                        key={product.id}
                        className="card-faq"
                        key={product.id}
                    >
                        <Accordion.Collapse eventKey={product.id}>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-12">
                                        {product.plans.map(item => {
                                            return (
                                                <button className="btn btn-outline-primary btn-months mr-2" onClick={() => handleSubscription({subscription_plan: item })}>
                                                    {
                                                        item.subscription_plan
                                                            .months
                                                    }{" "}
                                                    Meses
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {/* <div className="col-md-5">
                                        <AddCartCard
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            product={product}
                                            subscription={subscription}
                                        />
                                    </div> */}
                                    <div className="col-md-12">
                                        <div className="mt-3" dangerouslySetInnerHTML={{__html: subscription ? subscription.warnings : null}} /> 
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey={product.id}
                        >
                            <h3>Suscríbete a nuestros planes</h3>
                        </Accordion.Toggle>
                    </Card>
                </Accordion>
            </div>

            {/* <div className="col-md-12">
                <div className="alert-simple-blue">
                    <div className="font-poppins font-12 regular color-033F5D">· Considera 13 productos</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se despachara 2 unidades a su domicilio</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se cobra acorde a cada despacho</div>
                </div>
            </div> */}
        </div>
    );
};

export default ProductInfo;
