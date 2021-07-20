import React, { useEffect, useRef } from "react";

const MessageContainer = ({messages}) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return <div className="message-container mb-2 pt-md-3">
        {messages.map((m,index)=>
            <div key={index} className="user-message p-0">
                <p className={index%2===0 ? "message messageFirst" :"message messageLast"}>{m.msj}</p>
                <div className="from-user">{m.user}</div>
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
}

export default MessageContainer; 