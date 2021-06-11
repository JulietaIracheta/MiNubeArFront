import ChatRoom from "./ChatRoom";
import Sidebar from "../Sidebar";
import {SidebarDataDocente} from '../sideBar/SidebarDataDocente';
import NavDocente from "../Docente/NavDocente";

export default function ChatMiNube(){
 return (
 <div>
 <NavDocente></NavDocente>
 <div className="d-flex mt-1">
     <Sidebar data={SidebarDataDocente}/>
     <div className="container">
         <ChatRoom />
</div>
</div>
</div>
);
}