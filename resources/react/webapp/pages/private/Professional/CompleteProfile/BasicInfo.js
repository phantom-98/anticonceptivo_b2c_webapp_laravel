import React, {useState, useContext} from 'react';
import DivCheckBox from "../../../../components/DivCheckBox";
import * as Services from "../../../../Services";
import { AuthContext } from "../../../../context/AuthProvider"

const BasicInfo = ({professional, setProfessional, setShowingSection}) => {

    const { updateAuth } = useContext(AuthContext);

    const noAvatar = '/themes/web/assets/images/short-profile/no-avatar.svg';
    const avatarFemale = '/themes/web/assets/images/short-profile/male-avatar.svg';
    const avatarMale = '/themes/web/assets/images/short-profile/female-avatar.svg';
    const types = [
        {
            id: 1,
            name: 'Profesional',
            subtitle: 'Trabajo por mi cuenta'
        },
        {
            id: 2,
            name: 'Agencia',
            subtitle: 'Trabajo en equipo y represento una empresa'
        },
    ];

    const [model, setModel] = useState({
        avatar: professional.public_image,
        professional_id: professional.id,
        professional_description: professional.professional_description,
        type: professional.is_freelance == 1 ? 1 : (professional.is_agency == 1 ? 2 : 0)
    });

    const [uploadFile, setUploadFile] = useState(false);
    const [uploadLink, setUploadLink] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleForm = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatar = (e) => {
        setUploadFile(true)
        setUploadLink(false)
        setAvatarFile(e.target.files[0])
        setModel({
            ...model,
            avatar: URL.createObjectURL(e.target.files[0])
        })
    }

    const setDefaultAvatar = (type) => {
        setUploadFile(false)
        setUploadLink(true)
        setAvatarFile(null)

        if (type == 'male') {
            setModel({
                ...model,
                avatar: avatarMale
            })
        }

        if (type == 'female') {
            setModel({
                ...model,
                avatar: avatarFemale
            })
        }
    }

    const handleDivCheckBox = (typeId) => {
        setModel({
            ...model,
            type: typeId
        })
    }

    const store = () => {

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.COMPLETE_PROFILE.BASIC_INFO;

        const formData = new FormData();

        formData.append('professional_id', model.professional_id);
        formData.append('professional_description', model.professional_description);
        formData.append('type', model.type);
        formData.append('avatar', model.avatar);
        formData.append('upload_file', uploadFile);
        formData.append('upload_link', uploadLink);
        formData.append('avatar_file', avatarFile ? avatarFile : '');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        Services.DoPost(url, formData, config).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional)
                    updateAuth(response.data.auth);
                    setShowingSection('extraInfo');
                    setAvatarFile(null)
                    setUploadFile(false)
                    setUploadLink(false)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const back = () => {
        setShowingSection('abilities')
    }

    const controlNext = () => {
        if (model.professional_description && model.type > 0 && (model.avatar || avatarFile)) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <form noValidate className="form needs-validation av-invalid" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="font-signika font-25 bold text-primary mb-4">
                        {professional.full_name}, ¿Cómo te presentas al resto?
                    </h4>
                </div>
                <div className="col-12 py-3">
                    <div className="row">
                        <div className="col-md-8 pr-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="font-epilogue font-14 light color-3C3C3E lh-25 mb-1">
                                        Profesionales con perfiles completos tienen más chances de conseguir objetivos
                                    </p>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group form-group-w2 mb-1">
                                        <textarea
                                            rows={1}
                                            name="professional_description"
                                            id="professional_description"
                                            value={model.professional_description}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.professional_description &&
                                                model.professional_description.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="professional_description">Descripción corta de tu
                                            profesión</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <p className="font-epilogue font-12 light color-3C3C3E mb-4">
                                        <span className="bold">Ejemplos:</span> Diseñador web y especialista en UX,
                                        Javascript programmer (React, Angular and Vue), Redactor y corrector de estilos
                                    </p>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <div className="font-epilogue font-14 light color-121212 mb-2">
                                            ¿Qué tipo de profesional eres?
                                        </div>
                                    </div>
                                </div>
                                {
                                    types.map((type, index) => {
                                        return <div className="col-md-6 mb-3" key={index}
                                                    onClick={() => handleDivCheckBox(type.id)}>
                                            <DivCheckBox subtitle={type.subtitle} title={type.name}
                                                         active={model.type == type.id ? true : false}
                                            />
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-4  justify-content-end">
                            <div className="row">
                                <div className="col-auto">
                                    <label htmlFor="avatar">
                                        <img

                                            className="pointer"
                                            src={model.avatar ? model.avatar : noAvatar}
                                            rel="nofollow"
                                            style={{
                                                width: '115px',
                                                height: '115px',
                                                objectFit: 'cover',
                                                borderRadius: '50%'
                                            }}/>
                                    </label>
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        style={{height: '0px', width: '0px'}}
                                        id="avatar"
                                        name="avatar"
                                        onChange={handleAvatar}
                                    />
                                </div>
                                <div className="col">
                                    <div className="font-epilogue font-12 light mb-4">
                                        <span className="d-block bold">Formatos permitidos:</span>
                                        <span className="d-block"> JPG / GIF / PNG.</span>
                                        <span className="d-block"> Tamaño máx: 4MB.</span>
                                        <span className="d-block"> La imagen que subas debe</span>
                                        <span className="d-block"> tener una relación cuadrada</span>
                                        <span className="d-block"> (400x400)</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="font-epilogue font-12 light mb-2">
                                                <span className="d-block bold">o Selecciona un avatar</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <img
                                                        onClick={() => setDefaultAvatar('male')}
                                                        src={avatarMale}
                                                        className="pointer"
                                                        rel="nofollow"/>
                                                </div>
                                                <div className="col">
                                                    <img
                                                        onClick={() => setDefaultAvatar('female')}
                                                        src={avatarFemale}
                                                        className="pointer"
                                                        rel="nofollow"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <button type="button" onClick={back}
                                    className="btn btn-form btn-outline-primary btn-rounded px-4">
                                <span>Anterior</span>
                            </button>
                        </div>
                        <div className="col-6 text-right">
                            {
                                controlNext()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BasicInfo;
