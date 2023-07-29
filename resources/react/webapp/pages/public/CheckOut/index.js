import React, { Fragment, useContext, useEffect, useState } from 'react';
import Step from "../../../components/shopping/Step";
import GrantUser from "./GrantUser";
import Resume from "./Resume";
import UserForm from "./UserForm";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";
import Subscriptions from "./Subscriptions";
// import Installments from "./Installments";
import Header from "./Header";
import { AuthContext } from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import HandleResponse from "./HandleResponse";
import { CartContext } from "../../../context/CartProvider";
import toastr from "toastr";
import { setInputError } from "../../../helpers/GlobalUtils";
import { LOCAL_STORAGE } from "../../../context/LocalStorage";

const CheckOut = () => {

    const { auth } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const [dispatchDateObject, setDispatchDateObject] = useState(null);
    const [installment, setInstallment] = useState(1);
    const [showFinal, setShowFinal] = useState(1);
    const [view, setView] = useState('grant-user');
    const [step, setStep] = useState({
        number: 1,
        title: 'DATOS PERSONALES',
    })
    const [subscriptionId, setSubscriptionId] = useState(null);

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
        commercial_additional_address: '',
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
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [containsSubscriptions, setContainsSubscriptions] = useState(false);
    const [productCount, setProductCount] = useState(null);
    const [validAddress, setValidAddress] = useState(false);
    const [prescriptionsRequiredUploads, setPrescriptionsRequiredUploads] = useState([]);

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

    const [prescriptionRadio, setPrescriptionRadio] = useState(false);
    const [withoutPrescriptionAnswer, setWithoutPrescriptionAnswer] = useState(null);


    useEffect(() => {
        if (auth) {
            setData(auth);
            setEditable(true);
            getSubscriptions();

            let localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_STEP_TWO));

            console.log('localData', localData)

            if (localData) {
                if ('view' in localData || 'withoutPrescriptionAnswer' in localData) {
                    if (localData.withoutPrescriptionAnswer) {
                        setWithoutPrescriptionAnswer(localData.withoutPrescriptionAnswer)
                    }

                    if (localData.view) {
                        setView(localData.view)
                    }  else {
                        setView("user-form");
                    }

                    setStep({
                        number: 2,
                        title: 'DATOS DE ENVÍO',
                    })

                    // delete local storage
                    console.log('delete local storage')
                    localStorage.removeItem(LOCAL_STORAGE.CART_STEP_TWO);
                }
            } else {
                console.log('no local storage')
                setView("user-form");
            }
        }
    }, [auth])

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

    useEffect(() => {
        cartItems.map((item, index) => {
            if (item.subscription != null) {
                setContainsSubscriptions(true);
            }

            if (!prescriptionsRequiredUploads.length) {
                if (item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)') {
                    setPrescriptionsRequiredUploads((prevModel) => [...prevModel, { id: item.product.id, pending: true }]);
                }
            }
        })
    }, [cartItems])

    useEffect(() => {
        getRegions();
    }, [])

    const validateDataAddressInvite = () => {
        console.log(address)
        if(address.name =="Retiro_tienda"){
            setView('addresses')
        }
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

        Services.DoPost(url, data).then(response => {
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

    // function to get the MIME type based on the extension
    const getMimeType = (extension) => {
        let mime_type = '';
        // extensions .jpg, .jpeg, .png, .pdf, .doc y .docx
        console.log(extension, 'extension');
        switch (extension) {
            case 'jpg':
                mime_type = 'image/jpeg';
                break;
            case 'jpeg':
                mime_type = 'image/jpeg';
                break;
            case 'png':
                mime_type = 'image/png';
                break;
            case 'pdf':
                mime_type = 'application/pdf';
                break;
            case 'doc':
                mime_type = 'application/msword';
                break;
            case 'docx':
                mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            default:
                mime_type = 'application/octet-stream';
                break;
        }

        return mime_type;
    }

    const constructFiles = (attachments) => {
        const temp_files = [];
        for (const attachment of attachments) {
            const { file_public, name, extension, product_id, name_id } = attachment;
            fetch(window.location.origin+file_public)
                .then(res => res.blob())
                .then(blob => {
                    let file = new File([blob], name, { type: extension });
                    file.product_id = product_id;
                    file.name_id = name_id;
                    temp_files.push(file);
                });
        }

        console.log('temp_files', temp_files);
        return temp_files;
    }

    const getSubscriptions = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET_SUBSCRIPTIONS;

        let data = {
            customer_id: auth.id,
            trying_to_subscribe_card: localStorage.getItem('tryingToSubscribeCard'),
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    if (response.data.subscriptions != null) {
                        setSubscription(response.data.subscriptions);
                    }

                    if ('card' in response.data) {
                        if (response.data.card == 'approved') {
                            toastr.success('Tarjeta agregada, ya puedes terminar tu suscripción.', '¡Ya casi terminas!');
                            setSubscriptionId(response.data.card_id);
                        }

                        if (response.data.card == 'refused') {
                            toastr.error('No se ha podido suscribir la tarjeta de crédito, intenta nuevamente.', '¡Ups!');
                        }

                        if (response.data.attachments && response.data.attachments.length > 0) {
                            setPrescriptionRadio(true);
                            setFiles(constructFiles(response.data.attachments));
                        }

                        localStorage.removeItem('tryingToSubscribeCard');
                    }

                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const validateData = () => {
        if (rutFlag) {
            toastr.warning('El formato del rut es incorrecto.', 'Perfil no actualizado.');
            return null;
        } else {

            console.log('VALIDATE DATA');

            let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;

            let productCount = cartItems.filter((item) => item.product.recipe_type != 'Venta Directa').length;

            let _has_required_items = cartItems.filter((item) => item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)').length;

            if (_has_required_items) {
                if (prescriptionsRequiredUploads.filter((item) => item.pending == true).length) {
                    toastr.warning('Debes subir todas las recetas obligatorias.');
                    prescriptionsRequiredUploads.forEach(element => {
                        if (element.pending == true) {
                            setInputError(element.id, 'Debes subir la receta.');
                        }
                    });
                    return null;
                }
            }

            if (productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null && !_has_required_items) {
                toastr.warning('Debes seleccionar un motivo.');
                document.getElementById(`reason_focus`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
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
            formData.append('prescription_radio', productCount > 0 ? !_has_required_items ? prescriptionRadio : true : null);
            formData.append('without_prescription_answer', withoutPrescriptionAnswer);
            formData.append('customer_id', auth ? auth.id : null);

            let fileList = [...files]

            for (let i = 0; i < fileList.length; i++) {
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
                            if (!auth) {
                                setAddress(prevModel => ({
                                    ...prevModel,
                                    name: data.first_name + ' ' + data.last_name,
                                }));
                            }
                        } else {
                            setAddress(prevModel => ({
                                ...prevModel,
                                name: data.first_name + ' ' + data.last_name,
                            }));
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
                            document.getElementById(`reason_focus`).scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
                            });

                            return null;
                        }
                        if (response.data.attachments) {
                            toastr.error(response.data.attachments[0]);
                            document.getElementById(`reason_focus`).scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
                            });
                        } else {
                            toastr.error('Por favor, complete todos los campos.');
                            document.getElementById(`reason_focus`).scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
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

        let _has_required_items = cartItems.filter((item) => item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)').length;

        if (_has_required_items) {
            if (prescriptionsRequiredUploads.filter((item) => item.pending == true).length) {
                toastr.warning('Debes subir todas las recetas obligatorias.');
                prescriptionsRequiredUploads.forEach(element => {
                    if (element.pending == true) {
                        setInputError(element.id, 'Debes subir la receta.');
                    }
                });
                return null;
            }
        }

        if (productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null && !_has_required_items) {
            toastr.warning('Debes seleccionar un motivo.');
            document.getElementById(`reason_focus`).scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
            return null;
        }

        const formData = new FormData();

        formData.append('product_count', productCount);
        formData.append('customer_id', auth.id);
        formData.append('prescription_radio', productCount > 0 ? !_has_required_items ? prescriptionRadio : true : null);
        formData.append('without_prescription_answer', withoutPrescriptionAnswer);

        let fileList = [...files]

        for (let i = 0; i < fileList.length; i++) {
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
                    } else {
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
                        document.getElementById(`reason_focus`).scrollIntoView({
                            behavior: 'smooth',
                            block: 'end',
                        });

                        return null;
                    }
                    if (response.data.attachments) {
                        toastr.error(response.data.attachments[0]);
                        document.getElementById(`reason_focus`).scrollIntoView({
                            behavior: 'smooth',
                            block: 'end',
                        });
                    } else {
                        toastr.error('Por favor, complete todos los campos.');
                        document.getElementById(`reason_focus`).scrollIntoView({
                            behavior: 'smooth',
                            block: 'end',
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
            <div className="pb-5" style={{ background: '#FAFAFA' }}>
                <div className="container pt-4">
                    <Fragment>
                        <Header showFinal={showFinal} />
                        <div className="row pb-5">
                            <div className="col-12 col-lg pr-md-2">

                                <div className={`panel panel-cart mb-3 ${view != 'user-form' ? 'mt-3' : ''}`}>
                                    <div className="panel-body" style={{ paddingTop: '11px', paddingBottom: '10px' }}>
                                        <Step title={step.title} number={step.number} disabled={false} />
                                    </div>
                                </div>

                                {
                                    view == 'grant-user' ? <GrantUser setView={setView} /> : null
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
                                            setPrescriptionsRequiredUploads={setPrescriptionsRequiredUploads}
                                            prescriptionsRequiredUploads={prescriptionsRequiredUploads}
                                        /> : null
                                }
                                {
                                    (containsSubscriptions && (view == 'addresses' || view == 'add-address')) ?
                                        <Subscriptions
                                            onView={view}
                                            setView={setView}
                                            subscription={subscription}
                                            setSubscription={setSubscription}
                                            subscriptionId={subscriptionId}
                                            setSubscriptionId={setSubscriptionId}
                                            files={files}
                                            withoutPrescriptionAnswer={withoutPrescriptionAnswer}
                                        />
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
                                            validateDataAddressInvite={validateDataAddressInvite}
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
                            <div className="col-12 col-lg-auto pl-md-2" style={{ width: '408px' }}>
                                <Resume
                                    installment={installment}
                                    showFinal={showFinal}
                                    data={data}
                                    files={files}
                                    address={address}
                                    setDispatchDateObject={setDispatchDateObject}
                                    subscription={subscription}
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
                                    subscriptionId={subscriptionId}
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
