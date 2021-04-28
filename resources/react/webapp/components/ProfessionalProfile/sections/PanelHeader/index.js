import React, {useState, useEffect, useContext} from 'react';
import {Card} from "react-bootstrap";
import Form from "./Form";
import Info from "./Info";
import * as Services from "../../../../Services";
import toastr from "toastr";
import {AuthContext} from "../../../../context/AuthProvider"

const PanelHeader = ({professional, setProfessional, editable = true}) => {

    const {updateAuth} = useContext(AuthContext);
    
    const [editMode, setEditMode] = useState(false);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (avatar) {
            updateAvatar();
        }
    },[avatar])

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }

    const updateAvatar = () => {

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_AVATAR;

        const formData = new FormData();

        formData.append('professional_id', professional.id);
        formData.append('avatar', avatar);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        Services.DoPost(url, formData, config).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional);
                    updateAuth(response.data.auth);
                    toastr.success(response.message);
                    setAvatar(null);
                },
                error: () => {
                    toastr.error(response.message);
                }
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
                        {/* <div className="col-auto">
                            <img
                                className="avatar avatar-big"
                                src={
                                    professional.public_image ? 
                                    professional.public_image : 
                                    "/themes/web/assets/images/default-profile.svg"
                                }
                                alt=""
                            />
                        </div> */}
                        <div className="col-auto">
                            <label htmlFor="avatar">
                                <img
                                    className="pointer avatar avatar-big"
                                    src={
                                        professional.public_image ? 
                                        professional.public_image : 
                                        "/themes/web/assets/images/default-profile.svg"
                                    }
                                    rel="nofollow"
                                />
                            </label>
                            <input
                                type="file"
                                className="custom-file-input"
                                style={{height: '0px', width: '0px'}}
                                id="avatar"
                                name="avatar"
                                onChange={(handleAvatar)}
                            />
                        </div>
                        <div className="col">
                            {
                                editMode ?
                                    <Form
                                        professional={professional}
                                        setProfessional={setProfessional}
                                        setEditMode={setEditMode}/>
                                    :
                                    <Info
                                        professional={professional}
                                        setProfessional={setProfessional}
                                        editable={editable}
                                        editMode={editMode}
                                        setEditMode={setEditMode}/>
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PanelHeader;

