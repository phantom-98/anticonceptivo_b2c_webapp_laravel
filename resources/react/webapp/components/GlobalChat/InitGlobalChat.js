import React, {useContext, useEffect, useState} from 'react';
import UserButton from "./UserButton";
import SearchUser from "./SearchUser";
import SendMessage from "./SendMessage";
import MessageBox from "./MessageBox";
import * as Services from "../../Services";
import LazyLoading from "../LazyLoading";
import NoRegisterExits from "../NoRegisterExists";
import {AppContext} from "../../context/AppProvider";

const InitGlobalChat = ({type, professional_id, company_id}) => {

    const {pusherNotifyChannel} = useContext(AppContext);

    const [loaded, setLoaded] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [active, setActive] = useState(0);

    const [loadedMessage, setLoadedMessages] = useState(true);
    const [messages, setMessages] = useState([]);

    const [chatSelected, setChatSelected] = useState({});

    useEffect(() => {
        pusherNotifyChannel.bind('chat-global', function (data) {
            getMessages(data.professional_id, data.company_id)
        });
        index(true)
    }, [])


    const index = (loadFirst = false) => {

        let url = '';
        let data = {};

        if (type === 'professional') {
            url = Services.ENDPOINT.PANEL.GLOBAL_CHAT.GET_CONTACTS_BY_PROFESSIONAL_ID
            data = {professional_id: professional_id}
        }

        if (type === 'company') {
            url = Services.ENDPOINT.PANEL.GLOBAL_CHAT.GET_CONTACTS_BY_COMPANY_ID
            data = {company_id: company_id}
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setContacts(response.data.chats)
                    if (loadFirst) {
                        if ((response.data.chats).length > 0) {
                            const chat = response.data.chats[0];
                            getMessages(chat.professional_id, chat.company_id);
                            setActive(chat.id);
                        }
                    }
                    setLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const getMessages = (professional_id, company_id) => {
        // setLoadedMessages(false)


        let url = Services.ENDPOINT.PANEL.GLOBAL_CHAT.GET_MESSAGES;
        let data = {
            professional_id: professional_id,
            company_id: company_id
        }

        setChatSelected(data);

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    // console.log((response.data.messages));
                    setMessages(response.data.messages)
                    // setLoadedMessages(true)
                }
            });
            // setLoadedMessages(true)
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        loaded ? <div className="row mx-0">
            <div className="col-4" style={{background: '#F2F7FD'}}>

                <SearchUser/>

                <div className="row">
                    <div className="col-12 user-list">
                        {
                            contacts.length > 0 ? contacts.map(contact => {
                                    return <UserButton
                                        key={contact.id}
                                        active={active === contact.id}
                                        setActive={setActive}
                                        type={type}
                                        chat={contact}
                                        getMessages={getMessages}/>
                                }) :
                                <NoRegisterExits
                                    message="Ud no tiene mensajes."
                                />
                        }

                    </div>
                </div>

            </div>
            <div className="col-8">
                {
                    loadedMessage ? <MessageBox type={type} messages={messages}/> : <LazyLoading height={496}/>
                }
                {
                    loadedMessage ? <SendMessage type={type}
                                                                        professional_id={chatSelected.professional_id}
                                                                        company_id={chatSelected.company_id}
                                                                        getMessages={getMessages}
                    /> : null
                }
            </div>
        </div> : <LazyLoading height={500}/>
    );
};

export default InitGlobalChat;
