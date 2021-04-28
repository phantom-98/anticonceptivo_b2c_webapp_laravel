import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import * as Services from "../../Services";
import toastr from "toastr";
import {Card} from "react-bootstrap";

const GeneralSectionEdit = ({title, urlPost, professionalId, initialText, editable = true}) => {

    const [text, setText] = useState('')
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setText(initialText)
    }, [initialText]);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const store = () => {
        setEdit(false)
        Services.DoPost(urlPost, {
            professional_id: professionalId,
            text: text
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    setEdit(false)
                },
                error: () => {
                    toastr.error(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="mb-3">
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="font-24 bold text-primary">{title}</h2>
                                </div>
                                <div className="col-12 font-14 light color-3C3C3E">
                                    {
                                        !edit ?
                                            <div dangerouslySetInnerHTML={{__html: text}} style={{
                                                whiteSpace: 'pre-line'
                                            }}/> :
                                            <div className="row">
                                                <div className="col-12">
                                                    <textarea
                                                        id="text"
                                                        name={text}
                                                        className="form-control form-control-custom"
                                                        rows="7"
                                                        onChange={handleChange}
                                                        value={text}
                                                    />
                                                    <div className="text-right mt-4">
                                                        <button className="btn btn-outline-dark btn-rounded btn-form"
                                                                onClick={() => setEdit(false)}>
                                                            <span className="font-12 regular">CANCELAR</span>
                                                        </button>
                                                        <button className="btn btn-primary btn-rounded btn-form ml-3"
                                                                onClick={store}>
                                                            <span className="font-12 regular">GUARDAR</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                    }
                                </div>
                            </div>

                        </div>
                        {
                            editable && !edit ?
                                <div className="col-auto pl-0">
                                    <div className="my-auto pointer" onClick={() => setEdit(true)}>
                                        <div className="text-center">
                                            <img src="/themes/web/assets/images/icons/edit-secondary.svg"
                                                 rel="nofollow"/>
                                        </div>
                                        <div className="font-12 light color-939292 text-center">
                                            Editar
                                        </div>
                                    </div>
                                </div> :
                                null
                        }
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default GeneralSectionEdit;
