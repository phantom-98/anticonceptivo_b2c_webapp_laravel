import React, {useRef, useEffect, Fragment} from 'react';
import MessageTo from "./MessageTo";
import MessageFrom from "./MessageFrom";
import LazyLoading from "../LazyLoading";
import NoRegisterExits from "../NoRegisterExists";

const MessageBox = ({messages, type}) => {

    useEffect(() => {
        scrollCanvas();
    }, [messages])

    const canvas = useRef()

    const scrollCanvas = () => {
        const scroll = canvas.current.scrollHeight - canvas.current.clientHeight;
        canvas.current.scrollTo(0, scroll);
    }

    return (
        <div className="row message-box d-block py-3" ref={canvas}>

            {
                messages.length > 0 ?
                    <Fragment>
                        {
                            messages.map(message => {

                                const avatarProfessional = message.professional.public_image ? message.professional.public_image : '/themes/web/assets/images/default-profile.svg';
                                const avatarCompany = message.company.public_image ? message.company.public_image : '/themes/web/assets/images/default-profile.svg';

                                if (type == 'professional') {
                                    if (message.who_send == 'PROFESSIONAL') {
                                        return <MessageFrom key={message.id} message={message.message}
                                                            avatar={avatarProfessional}/>
                                    } else {
                                        return <MessageTo key={message.id} message={message.message}
                                                          avatar={avatarCompany}/>
                                    }
                                }

                                if (type == 'company') {
                                    if (message.who_send == 'COMPANY') {
                                        return <MessageFrom key={message.id} message={message.message}
                                                            avatar={avatarCompany}/>
                                    } else {
                                        return <MessageTo key={message.id} message={message.message}
                                                          avatar={avatarProfessional}/>
                                    }
                                }

                            })
                        }
                    </Fragment> :
                    <div className="col-12">
                        {/*<NoRegisterExits*/}
                        {/*    message="Ud. no tiene mensajes"*/}
                        {/*/>*/}
                    </div>
            }
        </div>
    );
};

export default MessageBox;
