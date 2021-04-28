import React from 'react';

const MessageFrom = ({message, avatar}) => {
    return (
        <div className="col-12">
            <div className="message-box-from">
                <div className="row">

                    <div className="col">
                        <div className="font-14 light">
                            {message}
                        </div>
                    </div>
                    <div className="col-auto">
                        <img className="avatar-small"
                             style={{width: '32px', height: '32px'}}
                             src={avatar} rel="nofollow"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageFrom;
