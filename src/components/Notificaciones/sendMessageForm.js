import { useState } from "react";
import SendIcon from '@material-ui/icons/Send';
const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <form onSubmit={e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <div class="input-group mb-3">
            <input className="form-control" type="text" placeholder="Mensaje.."
                onChange={e => setMessage(e.target.value)} value={message}>
            </input>
            <div class="input-group-append">
                <button className="input-group-text bg-primary text-light cursor-pointer" type="submit" disabled={!message}>
                    <SendIcon>
                        </SendIcon>Enviar
                </button>
            </div>
        </div>
    </form>
}

export default SendMessageForm;