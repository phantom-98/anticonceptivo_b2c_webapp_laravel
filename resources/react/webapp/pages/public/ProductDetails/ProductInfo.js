import React, { useState } from "react";
import { formatMoney } from "../../../helpers/GlobalUtils";
import AddCartCard from "../../../components/shopping/AddCartCard";
import { Accordion, Card } from "react-bootstrap";
import Icon from "../../../components/general/Icon";
import fileSvg from "../../../assets/images/icons/file-alt-regular.svg";

const ProductInfo = ({ product, setImageSubscription }) => {
    const [quantity, setQuantity] = useState(1);
    const [subscription, setSubscription] = useState(null);

    const handleSubscription = subscription_plan => {
        if (subscription == null) {
            setSubscription(subscription_plan.subscription_plan);
            setImageSubscription(subscription_plan.position + 1);
        } else if (subscription.id != subscription_plan.subscription_plan.id) {
            setSubscription(subscription_plan.subscription_plan);
            setImageSubscription(subscription_plan.position + 1);
        } else {
            setSubscription(null);
            setImageSubscription(null);
        }
    };

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
                <h1 className="font-poppins font-12 regular color-6C6B6B">
                    <div
                        dangerouslySetInnerHTML={{ __html: product.compound }}
                    />
                </h1>
            </div>
            <div className="col-md-12">
                <span className="font-poppins font-36 bold color-009BE8">
                    {subscription == null
                        ? [
                              formatMoney(product.is_offer ? product.offer_price  : product.price),
                              <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                  C/U {'  '}
                                  {
                                    product.is_offer ?
                                        <s>{formatMoney(product.price)}</s>
                                    : null
                                  }
                              </span>
                          ]
                        : [
                              formatMoney(subscription.price),
                              <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                  Al mes cada C/U
                              </span>,
                              <span className="font-poppins font-16 bold color-78d2ff ml-2">
                                  (Ahorras un{" "}
                                  {Math.round(
                                      ((product.price - subscription.price) /
                                          product.price) *
                                          100
                                  )}
                                  %)
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

            <div className="offset-md-1 mb-3" />
            {product.unit_format ? (
                <div className="col-md-12 py-2 product-format-style">
                    <span className="font-poppins font-14 regular color-6C6B6B">
                        Precio por unidad: $
                        {product.state_of_matter === "Líquido"
                            ? Math.round(
                                  (product.price / parseInt(product.format)) *
                                      100
                              ) +
                              " " +
                              product.unit_format
                            : Math.round(
                                  product.price / parseInt(product.format)
                              ) +
                              " " +
                              product.unit_format}
                    </span>
                </div>
            ) : null}

            <div className="col-md-12 mt-3">
                <h1 className="font-poppins font-12 regular color-6C6B6B">
                    <Icon className="icon-document" path={fileSvg} />{" "}
                    {product.recipe_type
                        ? product.recipe_type
                        : "Venta Directa"}
                </h1>
            </div>
            {product.plans.length > 0 ? (
                <div className="col-md-12 mt-2">
                    <Accordion
                        defaultActiveKey={product.id}
                        className="accordion-faq"
                    >
                        <Card
                            key={product.id}
                            className="card-faq"
                            key={product.id}
                        >
                            <Accordion.Collapse eventKey={product.id}>
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {product.plans.map(
                                                (item, index) => {
                                                    return subscription ==
                                                        item ? (
                                                        <button
                                                            className="btn btn-outline-primary btn-months mr-2 focus"
                                                            onClick={() =>
                                                                handleSubscription(
                                                                    {
                                                                        subscription_plan: item,
                                                                        position: index
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {
                                                                item
                                                                    .subscription_plan
                                                                    .months
                                                            }{" "}
                                                            Meses
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-outline-primary btn-months mr-2"
                                                            onClick={() =>
                                                                handleSubscription(
                                                                    {
                                                                        subscription_plan: item,
                                                                        position: index
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {
                                                                item
                                                                    .subscription_plan
                                                                    .months
                                                            }{" "}
                                                            Meses
                                                        </button>
                                                    );
                                                }
                                            )}
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
                                            <div
                                                className="mt-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: subscription
                                                        ? subscription.warnings
                                                        : null
                                                }}
                                            />
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
            ) : null}
        </div>
    );
};

export default ProductInfo;
