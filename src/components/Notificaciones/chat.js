import MessageContainer from "./messageContainer";
import SendMessageForm from "./sendMessageForm";
import UsuariosConectados from './usuariosConectados';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Chat = ({ messages, sendMessage, closeConnection, users }) => <div>
    <div className="leave-room">
        <button className="btn btn-danger" onClick={() => closeConnection()}><ExitToAppIcon/>Abandonar sala</button>
    </div>
    <div className="d-flex w-100 mt-2 container-message">
        <UsuariosConectados users={users} />
        <div className="chat w-100 text-dark">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage}>
            </SendMessageForm>
        </div>
    </div>
</div>

export default Chat;