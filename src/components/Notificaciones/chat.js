import MessageContainer from "./messageContainer";
import SendMessageForm from "./sendMessageForm";
import UsuariosConectados from './usuariosConectados';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Chat = ({ messages, sendMessage, closeConnection, users }) => 
<div className="bg-white p-0 p-md-3 pt-4 chat-container" style={{border:"1px solid #edf2f9"}}>
    <div className="leave-room pr-3 mb-3 mb-md-0">
        <button className="btn btn-outline-danger" onClick={() => closeConnection()}><ExitToAppIcon/>Abandonar sala</button>
    </div>
    <div className="d-flex w-100 container-message p-0 p-md-3">
        <UsuariosConectados users={users} />
        <div className="chat w-100 text-dark">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage}>
            </SendMessageForm>
        </div>
    </div>
</div>

export default Chat;