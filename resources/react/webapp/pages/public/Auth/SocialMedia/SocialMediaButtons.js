import React from 'react';
import * as Services from "../../../../Services";
import toastr from "toastr";


const SocialMediaButtons = ({authType, actionType}) => {

    const redirectSocialMedia = (authType, network) => {

        let url = Services.ENDPOINT.AUTH.SOCIAL_MEDIA.REDIRECT;

        let data = {
            network: network,
            auth_action: actionType,
            auth_type: authType,
            auth_mode: 'social_media'
        }

        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success('Redirigiendo a ' + network)
                        window.location.href = response.data.url;
                    },
                    error: () => {
                        toastr.error('Error al intentar enlazar con Github.')
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <div className="col-12">
            <div className="row py-2">
                <div className="col">
                    <button
                        type="button"
                        onClick={() => redirectSocialMedia(authType, 'github')}
                        className="btn btn-primary btn-block font-12">
                        <i className="fa fa-github"/> Github
                    </button>
                </div>
                <div className="col">
                    <button
                        type="button"
                        onClick={() => redirectSocialMedia(authType, 'google')}
                        className="btn btn-primary btn-block font-12">
                        <i className="fa fa-google"/> Google
                    </button>
                </div>
                {/*<div className="col-md-4">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={() => redirectSocialMedia(type, 'facebook)}*/}
                {/*        className="btn btn-primary btn-block font-12">*/}
                {/*        <i className="fa fa-facebook"/> Facebook*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SocialMediaButtons;
