import React, {useEffect, useState} from 'react';
import moment from "moment";

const UserButton = ({chat, type, getMessages, active = false, setActive}) => {

    const [image, setImage] = useState('/themes/web/assets/images/default-profile.svg');
    const [name, setName] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    const [time, setTime] = useState('5 min');


    useEffect(() => {
        if (type === 'company') {
            setImage(chat.professional.public_image ? chat.professional.public_image : '/themes/web/assets/images/default-profile.svg')
            setName(chat.professional.full_name)
            setLastMessage(trimLength(chat.message))
            setTime(humanizeTime(chat.created_at))
        }

        if (type === 'professional') {
            setImage(chat.company.public_image ? chat.company.public_image : '/themes/web/assets/images/default-profile.svg')
            setName(chat.company.name)
            setLastMessage(trimLength(chat.message))
            setTime(humanizeTime(chat.created_at))
        }

    }, [])

    const trimLength = (str, length = 30) => {
        return str.substring(0, length) + '...'
    }

    const humanizeTime = (date) => {
        return moment(date).lang("es").fromNow();
    }

    const selectChat = () => {
        setActive(chat.id)
        getMessages(chat.professional_id, chat.company_id)
    }

    return (
        <div className={`row py-3 chat-user-button ${active ? 'active' : ''}`} onClick={() => selectChat()}>
            <div className="col-auto px-3">
                <img className="avatar-small" src={image} rel="nofollow"/>
            </div>
            <div className="col d-flex px-0">
                <div className="my-auto">
                    <div className="font-16 bold text-primary">{name}</div>
                    <div className="font-12 light color-3C3C3E">{lastMessage}</div>
                </div>
            </div>
            <div className="col-auto d-flex px-3">
                <div className="mt-auto font-12 light color-939292">{time}</div>
            </div>
        </div>
    );
};

export default UserButton;
