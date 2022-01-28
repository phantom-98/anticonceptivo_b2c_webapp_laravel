import React, {Fragment, useContext, useEffect, useState} from 'react';
import Step from "../../../components/shopping/Step";
import GrantUser from "./GrantUser";
import Resume from "./Resume";
import UserForm from "./UserForm";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";
import Subscriptions from "./Subscriptions";
// import Installments from "./Installments";
import Header from "./Header";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import HandleResponse from "./HandleResponse";
import {CartContext} from "../../../context/CartProvider";
import toastr from "toastr";
import {setInputError} from "../../../helpers/GlobalUtils";

const CheckOut = () => {

    const {auth} = useContext(AuthContext);
    const {cartItems} = useContext(CartContext);
    // const {isCartReady, checkCart} = useContext(CartContext);

    const [dispatchDateObject, setDispatchDateObject] = useState(null);
    const [installment, setInstallment] = useState(1);
    const [showFinal, setShowFinal] = useState(1);
    const [finishWebpayProccess, setFinishWebpayProccess] = useState(0);
    const [webpayProccessSuccess, setWebpayProccessSuccess] = useState();
    const [view, setView] = useState('grant-user');
    const [step, setStep] = useState({
        number: 1,
        title: 'DATOS PERSONALES',
    })

    const defaultData = {
        first_name: '',
        last_name: '',
        email: '',
        id_number: '',
        id_type: 'RUT',
        phone_code: '+56',
        phone: '',
        business_name: '',
        business_id_number: '',
        commercial_business: '',
        commercial_email: '',
        commercial_address: '',
        commercial_additional_address:'',
        commercial_phone: '',
        commercial_phone_code: '',
        commercial_region_id: '',
        commercial_commune_id: '',
    }

    const [data, setData] = useState(defaultData);
    const [files, setFiles] = useState([]);
    const [editable, setEditable] = useState(false);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [containsSubscriptions, setContainsSubscriptions] = useState(false);
    const [productCount, setProductCount] = useState(null);
    const [validAddress, setValidAddress] = useState(false);

    const [address, setAddress] = useState({
        name: '',
        region_id: '',
        commune_id: '',
        address: '',
        extra_info: '',
    });

    const [subscription, setSubscription] = useState([]);
    const [rutFlag, setRutFlag] = useState(false);
    const [customerId, setCustomerId] = useState(null);

    const [prescriptionRadio, setPrescriptionRadio] = useState(true);
    const [withoutPrescriptionAnswer, setWithoutPrescriptionAnswer] = useState(null);


    useEffect(() => {
        if (auth) {
            setData(auth);
            setEditable(true);
            // getAddress();
            getSubscriptions();
            setView("user-form");
        }
    },[auth])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        switch (view) {
            case "grant-user":
            case "user-form":
                setStep({
                    number: 1,
                    title: 'DATOS PERSONALES',
                })
                setShowFinal(1)
                break;
            case "add-address":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(2)
                break;
            case "addresses":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(3)
                break;
        }

    }, [view])

    useEffect(()=>{
        cartItems.map((item, index) => {
            if(item.subscription != null){
                setContainsSubscriptions(true);
            }
        })
    },[cartItems])

    useEffect(() => {
        getRegions();
    },[])

    const validateDataAddressInvite = () => {
        if (validAddress === false) {
           
        }

        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;
        let dataForm = {
            ...address,
            step: 2,
        }
        Services.DoPost(url, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setView('addresses')
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const updateData = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.UPDATE;

        if (validAddress === false) {
           
        }

        let data = {
            customer_id: auth.id,
            address_id: address.id,
            name: address.name,
            last_name: address.last_name,
            region_id: address.region_id,
            commune_id: parseInt(address.commune_id),
            address: address.address,
            extra_info: address.extra_info,
            comment: address.comment
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setView('addresses')
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }
    const getRegions = () => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.GET_RESOURCES;
        let dataForm = {
            // customer_id: auth.id
        }

        Services.DoPost(url, dataForm).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setCommunes(response.data.communes);
                setRegions(response.data.regions);
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const getSubscriptions = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET_SUBSCRIPTIONS;
        let data = {
            customer_id: auth.id
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                  if(response.data.subscriptions != null){
                    setSubscription(response.data.subscriptions);
                  }
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const validateData = () => {
        if (rutFlag) {
            toastr.warning('El formato del rut es incorrecto.','Perfil no actualizado.');
            return null;
        }else{

            let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;

            let productCount = cartItems.filter((item) => item.product.recipe_type != 'Venta Directa').length;

            if (productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null) {
                toastr.warning('Debes seleccionar un motivo.');
                document.getElementById(`reason_focus`).scrollIntoView({
                    behavior: 'smooth'
                });
                return null;
            }

            const formData = new FormData();

            formData.append('product_count', productCount);
            formData.append('step', 1);
            formData.append('email', data.email);
            formData.append('first_name', data.first_name);
            formData.append('id_number', data.id_number);
            formData.append('id_type', data.id_type);
            formData.append('last_name', data.last_name);
            formData.append('phone', data.phone);
            formData.append('phone_code', data.phone_code);
            formData.append('prescription_radio', productCount > 0 ? prescriptionRadio : null);
            formData.append('without_prescription_answer', withoutPrescriptionAnswer);

            let fileList = [...files]

            for(let i=0; i < fileList.length; i++){
                formData.append('attachments[]', fileList[i]);
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            Services.DoPost(url, formData, config).then(response => {
                Services.Response({
                response: response,
                success: () => {
                    setView('add-address')
                    setProductCount(productCount);
                    if (response.data.customer_id) {
                        setCustomerId(response.data.customer_id);
                    }
                },
                error: () => {
                    toastr.error(response.message);
                },
                warning: () => {
                    toastr.warning(response.message);
                },
                validate: () => {
                    let errorKey = Object.keys(response.data)[0];

                    if (errorKey.includes('.')) {
                        toastr.error('Formato de archivo invalido.');
                        document.getElementById(`attachments_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });

                        return null;
                    }
                    if (response.data.attachments) {
                        toastr.error(response.data.attachments[0]);
                        document.getElementById(`${errorKey}_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        toastr.error('Por favor, complete todos los campos.');
                        document.getElementById(`${errorKey}_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
                });
            }).catch(error => {
                Services.ErrorCatch(error)
            });
        }
    }

    const hasAddress = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.GET;
        let productCount = cartItems.filter((item) => item.product.recipe_type != 'Venta Directa').length;

        if (productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null) {
            toastr.warning('Debes seleccionar un motivo.');
            document.getElementById(`reason_focus`).scrollIntoView({
                behavior: 'smooth'
            });
            return null;
        }

        const formData = new FormData();

        formData.append('product_count', productCount);
        formData.append('customer_id', auth.id);
        formData.append('prescription_radio', productCount > 0 ? prescriptionRadio : null);
        formData.append('without_prescription_answer', withoutPrescriptionAnswer);

        let fileList = [...files]

        for(let i=0; i < fileList.length; i++){
            formData.append('attachments[]', fileList[i]);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        Services.DoPost(url, formData, config).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setProductCount(productCount);
                    if (response.data.addresses.length) {
                        setView('addresses');
                    }else{
                        setView('add-address');
                    }
                },
                error: () => {
                    toastr.error(response.message);
                },
                warning: () => {
                    toastr.warning(response.message);
                },
                validate: () => {
                    let errorKey = Object.keys(response.data)[0];

                    if (errorKey.includes('.')) {
                        toastr.error('Formato de archivo invalido.');
                        document.getElementById(`attachments_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });

                        return null;
                    }
                    if (response.data.attachments) {
                        toastr.error(response.data.attachments[0]);
                        document.getElementById(`${errorKey}_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        toastr.error('Por favor, complete todos los campos.');
                        document.getElementById(`${errorKey}_focus`).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="pb-5" style={{background: '#FAFAFA'}}>
                <div className="container pt-4">
                            <Fragment>
                                <Header showFinal={showFinal} />
                                    <div className="row pb-5">
                                        <div className="col-12 col-lg pr-md-2">

                                            <div className={`panel panel-cart mb-3 ${view != 'user-form'? 'mt-3' : ''}`}>
                                                <div className="panel-body" style={{paddingTop: '11px', paddingBottom: '10px'}}>
                                                    <Step title={step.title} number={step.number} disabled={false}/>
                                                </div>
                                            </div>

                                            {
                                                view == 'grant-user' ? <GrantUser setView={setView}/> : null
                                            }
                                            {
                                                view == 'user-form' ?
                                                    <UserForm
                                                        setView={setView}
                                                        data={data}
                                                        setData={setData}
                                                        setFiles={setFiles}
                                                        files={files}
                                                        editable={editable}
                                                        regions={regions}
                                                        setProductCount={setProductCount}
                                                        rutFlag={rutFlag}
                                                        setRutFlag={setRutFlag}
                                                        prescriptionRadio={prescriptionRadio}
                                                        setPrescriptionRadio={setPrescriptionRadio}
                                                        withoutPrescriptionAnswer={withoutPrescriptionAnswer}
                                                        setWithoutPrescriptionAnswer={setWithoutPrescriptionAnswer}
                                                    /> : null
                                            }
                                            {
                                                (containsSubscriptions && (view == 'addresses' || view == 'add-address')) ?

                                                [<Subscriptions
                                                    setView={setView}
                                                    subscription={subscription}
                                                    setSubscription={setSubscription}
                                                />
                                                // ,
                                                // <Installments
                                                //     setInstallment={setInstallment}

                                                // />
                                            ]

                                                : null


                                            }

                                            {
                                                view == 'add-address' ?
                                                    <AddAddress
                                                        setView={setView}
                                                        regions={regions}
                                                        address={address}
                                                        setAddress={setAddress}
                                                        validAddress={validAddress}
                                                        setValidAddress={setValidAddress}
                                                        setInputError={setInputError}
                                                    /> : null
                                            }
                                            {
                                                view == 'addresses' ?
                                                    <Addresses
                                                        setView={setView}
                                                        regions={regions}
                                                        dispatchDateObject={dispatchDateObject}
                                                        communes={communes}
                                                        address={address}
                                                        setAddress={setAddress}
                                                    /> : null
                                            }


                                        </div>
                                        <div className="col-12 col-lg-auto pl-md-2" style={{width: '408px'}}>
                                            <Resume
                                                installment={installment}
                                                showFinal={showFinal}
                                                data={data}
                                                files={files}
                                                address={address}
                                                setDispatchDateObject={setDispatchDateObject}
                                                subscription={subscription}
                                                setFinishWebpayProccess={setFinishWebpayProccess}
                                                setWebpayProccessSuccess={setWebpayProccessSuccess}
                                                setOrderId={setOrderId}
                                                orderId={orderId}
                                                total={total}
                                                setTotal={setTotal}
                                                subtotal={subtotal}
                                                setSubtotal={setSubtotal}
                                                validateData={validateData}
                                                hasAddress={hasAddress}
                                                view={view}
                                                customerId={customerId}
                                                updateData={updateData}
                                                validateDataAddressInvite={validateDataAddressInvite}
                                                prescriptionRadio={prescriptionRadio}
                                                withoutPrescriptionAnswer={withoutPrescriptionAnswer}
                                            />
                                        </div>
                                    </div>
                            </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default CheckOut
