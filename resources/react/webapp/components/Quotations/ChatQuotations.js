import React, {useContext, useEffect, useState} from 'react';
import SendMessage from "./SendMessage";
import MessageBox from "./MessageBox";
import * as Services from "../../Services";
import LazyLoading from "../LazyLoading";
import {AuthContext} from "../../context/AuthProvider";
import {Card} from "react-bootstrap";
import {PUSHER} from "../../Globals";
import {AppContext} from "../../context/AppProvider";

const ChatQuotations = ({professional_id, company_id, quotation_id, disabled = true}) => {

    const {authType} = useContext(AuthContext);
    const {pusherNotifyChannel} = useContext(AppContext);

    const [loaded, setLoaded] = useState(false);
    const [loadedMessage, setLoadedMessages] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (authType) {
            getMessages()
            setLoaded(true)
        }
    }, [authType])

    useEffect(() =>{
        pusherNotifyChannel.bind('chat-quotation', function (data) {
            getMessages()
        });
    }, [])

    const getMessages = () => {

        let url = Services.ENDPOINT.PANEL.COMMON.QUOTATIONS.CHAT.GET_MESSAGES;
        let data = {
            professional_id: professional_id,
            company_id: company_id,
            quotation_id: quotation_id
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    // console.log((response.data.messages));
                    setMessages(response.data.messages)
                    setLoadedMessages(true)
                }
            });
            // setLoadedMessages(true)
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        loaded ?
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-signika font-20 bold text-secondary mb-4">Mensajes</h2></div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            {
                                loadedMessage ? <MessageBox type={authType} messages={messages}/> :
                                    <LazyLoading height={496}/>
                            }
                            {
                                loadedMessage && disabled ? <SendMessage type={authType}
                                                             professional_id={professional_id}
                                                             company_id={company_id}
                                                             quotation_id={quotation_id}
                                                             getMessages={getMessages}
                                /> : null
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card> :
            <LazyLoading height={500}/>
    );
};

export default ChatQuotations;
