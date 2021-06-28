const MessageContainer = ({messages}) => {
    return <div className="message-container">
        {messages.map((m,index)=>
            <div key={index} className="user-message">
                <div className={index%2===0 ? "message messageFirst" :"message messageLast"}>{m.msj}</div>
                <div className="from-user">{m.user}</div>
            </div>
        )}
    </div>
}

export default MessageContainer; 