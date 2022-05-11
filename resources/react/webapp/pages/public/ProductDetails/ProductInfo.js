import React, {useState} from "react";
import {formatMoney} from "../../../helpers/GlobalUtils";
import AddCartCard from "../../../components/shopping/AddCartCard";
import {Accordion, Card} from "react-bootstrap";
import Icon from "../../../components/general/Icon";
import fileSvg from "../../../assets/images/icons/file-alt-regular.svg";
import IsImmediateLabel from "../../../components/shopping/IsImmediateLabel";
import noImage from "../../../assets/images/producto-default.png";

const ProductInfo = ({product, setImageSubscription}) => {

    const [quantity, setQuantity] = useState(1);
    const [subscription, setSubscription] = useState(null);

    const handleSubscription = (subscription_plan) => {
        if (subscription == null) {
            setSubscription(subscription_plan.subscription_plan);
            setImageSubscription(subscription_plan.subscription_plan.public_image ? subscription_plan.subscription_plan.public_image : noImage);
        } else if (subscription.id != subscription_plan.subscription_plan.id) {
            setSubscription(subscription_plan.subscription_plan);
            setImageSubscription(subscription_plan.subscription_plan.public_image ? subscription_plan.subscription_plan.public_image : noImage);
        } else {
            setSubscription(null);
            setImageSubscription(null);
        }
    };

    return (
        <div className="row">
            <div className="col-6">
                <span className="font-poppins font-14 medium font-italic color-585858">
                    {product.laboratory.name}
                </span>
            </div>
            <div className="col-6 text-right">
                <span className="font-poppins font-16 color-009BE8">
                    SKU: {product.sku}
                </span>
            </div>
            <div className="col-md-12 responsive-d-none">
                <h1 className="font-poppins medium font-27 bold text-black">
                    {product.name}
                </h1>
            </div>
            <div className="col-md-12">
                <p className="font-poppins font-16 regular color-585858">
                    <div dangerouslySetInnerHTML={{
                        __html: product.description
                    }}
                    />
                </p>
            </div>



            {
                product.compound ?
                    <div className="col-md-12">
                        <div className="font-poppins font-12 compoundProduct"
                             dangerouslySetInnerHTML={{__html: product.format_compound}}
                        />
                    </div>
                    : null
            }

            <div className="col-12">
                <div className="row">
                    <div className="col-auto my-2">
                        <IsImmediateLabel product={product} />
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <span className="font-poppins font-36 bold color-009BE8">
                    {subscription == null ?
                        [
                            formatMoney(product.is_offer ? product.offer_price : product.price),
                            <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                    C/U {'  '}
                                {
                                    product.is_offer ?
                                        <s>{formatMoney(product.price)}</s>
                                        : null
                                }
                                </span>
                        ]
                        :
                        [
                            formatMoney(subscription.price),
                            <span className="font-poppins font-16 bold color-009BE8 ml-2">
                                    Al mes c/u
                                </span>,
                            <span className="font-poppins font-16 bold color-78d2ff ml-2">
                                    (Ahorra un{" "}
                                {Math.round(
                                    ((product.price - subscription.price) /
                                        product.price) *
                                    100
                                )} %)
                                </span>
                        ]
                    }
                </span>
            </div>

            <div className="col-md-6 mb-3">
                <AddCartCard
                    quantity={quantity}
                    setQuantity={setQuantity}
                    product={product}
                    subscription={subscription}
                    classModule="single-product"
                />
            </div>
            <div className="col-12">
                <div className="row mb-0 mb-md-3">

                    {
                        product.unit_format && product.format != null ?
                            <div className="col-12 col-md-12">
                                <div className="product-format-style font-poppins regular color-6C6B6B">
                                    Precio por unidad: $
                                    {
                                        product.state_of_matter === "Líquido"
                                            ? Math.round((product.price / parseInt(product.format)) * 100) +
                                            " " +
                                            product.unit_format
                                            : Math.round(product.price / parseInt(product.format)) +
                                            " " +
                                            product.unit_format
                                    }
                                </div>
                            </div>
                            : null
                    }

                    <div className="col-12 col-md-12 mt-3 mt-md-3 divRecipe">
                        <h1 className="font-poppins my-auto font-16 color-009BE8 h1Recipe">
                            <Icon className="icon-document iconRecipe"
                                  path={fileSvg}/> {product.recipe_type ? product.recipe_type : "Venta Directa"}
                        </h1>
                    </div>
                </div>
                <div className="row">
                    {
                        product.plans.length > 0 ? <div className="col-md-12 mt-2 custom-accordion-responsive">
                            <Accordion
                                defaultActiveKey={product.id}
                                className="accordion-faq"
                            >
                                <Card
                                    className="card-faq card-plans"
                                    key={product.id}
                                >
                                    <Accordion.Collapse eventKey={product.id}>
                                        <Card.Body>
                                            <div className="row">
                                                <div className="col-12 px-0 subscription-buttons">
                                                    {
                                                        product.plans.map((item, index) => {

                                                                const isActive = subscription == item;
                                                                const month = item.subscription_plan.months;
                                                                const cicle = item.subscription_plan.cicles;
                                                                if(item.active === 0){
                                                                    return null
                                                                }
                                                                return <button
                                                                    className={`btn btn-outline-primary btn-months mr-1 subscription-button-margin ${isActive ? 'focus' : ''}`}
                                                                    onClick={() =>
                                                                        handleSubscription({
                                                                            subscription_plan: item,
                                                                            position: index
                                                                        })}>
                                                                    <span className="textPlansProduct">
                                                                        {cicle} Meses / {month} Ciclos
                                                                    </span>
                                                                </button>
                                                            }
                                                        )}
                                                </div>
                                                {
                                                    subscription ? <div className="col-md-12">
                                                        <div className="mt-3"
                                                             dangerouslySetInnerHTML={{
                                                                 __html: subscription
                                                                     ? subscription.warnings
                                                                     : null
                                                             }}
                                                        />
                                                    </div> : null
                                                }
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
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
