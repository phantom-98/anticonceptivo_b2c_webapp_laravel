import React from 'react';
import {Modal} from "react-bootstrap";

const ModalTerms = ({show, handleClose}) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            contentClassName="modal-custom"
            dialogClassName="modal-963"
        >
            <Modal.Body>
                <div className="row">
                    <div className="col-auto ml-auto pointer">
                        <img onClick={handleClose} src="/themes/web/assets/images/icons/close-modal.svg"
                             rel="nofollow"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 p-4">
                        <div className="row">
                            <div className="col-10 offset-1 body-terms">
                                <h4 className="font-signika font-24 bold text-primary mb-3">
                                    Términos y Condiciones
                                </h4>

                                <p>
                                    El documento denominado Términos y Condiciones Generales de Uso de una determinada página o
                                    sitio web es aquel que contiene las normas que regulan la interacción de las personas que
                                    acceden a ella (usuarias) con el contenido que la misma página pone a disposición, con los
                                    productos y/o servicios ofrecidos en ella, y con las personas responsables del sitio.
                                </p>

                                <p>
                                    Los Términos y Condiciones de Uso constituyen un documento que se ha vuelto cada vez más
                                    habitual y necesario para cualquier persona que sea propietaria de un Sitio Web, o bien que
                                    utilice algún servicio o host proporcionado por un proveedor (como las plataformas de
                                    blogging,
                                    microblogging y algunas redes sociales).
                                </p>

                                <p>
                                    Aunque en Chile no existe una regulación extensiva en la materia, este documento se ha
                                    elaborado teniendo en consideración la incipiente legislación aplicable y las
                                    recomendaciones realizadas por organismos públicos y no gubernamentales.
                                </p>

                                <p>
                                    Es por lo anterior que este modelo de Términos y Condiciones contiene una lista extensa de
                                    menciones que se consideran importantes para el correcto funcionamiento de todo sitio web,
                                    generando la confianza que incentive en los usuarios la interacción con la página y con los
                                    productos y servicios ofrecidos en ella.
                                </p>

                                <p>
                                    En relación a los sitios Web que entregan servicios o productos para que las persona usuarias
                                    puedan comprar o contratar deben respetar la normativa aplicable a las páginas de internet, así
                                    como entregar un acceso a la información claro y conciso, velando por la seguridad de las
                                    transacciones y el manejo de los datos personales, especialmente aquellos relacionados con
                                    información bancaria o financiera.
                                </p>


                                <p>¿Cómo utilizar el documento?</p>

                                <p>
                                    El Titular del documento debe rellenar los campos con la información requerida, principalmente
                                    relacionada con la titularidad del Sitio Web, y la forma de establecer vías de comunicación
                                    entre el Sitio Web y sus Usuarios.
                                </p>

                                <p>
                                    Otro punto de capital importancia contenido en el texto hace relación con la implementación de
                                    una política de protección de datos personales, la cual está al día con la legislación vigente
                                    en Chile, así como con las modificaciones del año 2018 al Reglamento en la materia que tiene la
                                    Unión Europea, muchas de las cuales serán adoptadas por nuestro país en la nueva legislación
                                    sobre protección de datos personales actualmente en tramitación en el Congreso.
                                </p>

                                <p>
                                    Adicionalmente, el texto del documento se adapta a la implementación e incorporación de cierta
                                    información relacionada, por ejemplo, con las ya mencionadas formas de comunicación (call
                                    center, correo electrónico), así como también en aquellos casos en que el Sitio Web requiera la
                                    existencia de un Registro y una Contraseña para acceder a todo o parte de su contenido o
                                    servicios ofrecidos, o si acaso existen límites de edad para hacer uso de éstos.
                                </p>

                                <p>
                                    Como ya se mencionó, también existe regulación especial para el caso que el Sitio Web contenga
                                    una plataforma que permita hacer transacciones con el fin de acceder a bienes o servicios. Al
                                    mismo tiempo, el texto también contiene regulación relativa a la incorporación de propiedad
                                    intelectual.
                                </p>

                                <p>
                                    Se considera que el usuario acepta estos términos y condiciones generales de uso a través del
                                    acceso, navegación y uso del sitio web.
                                </p>

                                <p>
                                    Teniendo en cuenta esto último y, especialmente, en aquellos casos en los que exista la
                                    tecnología de cookies, es útil prever un método que llame la atención del usuario inmediatamente
                                    al acceder al sitio web, por ejemplo, con una ventana emergente al acceder y que da la opción de
                                    aceptar y/o consultar los términos y condiciones generales de uso.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalTerms;
