import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar2Event, Bell } from "react-bootstrap-icons";
import { Cookies, useCookies } from 'react-cookie';
import logo from '../../assets/img/logoGris.png'
import "../../assets/css/css-estudiante.css";
import { Avatar } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import eliminarNotificacion from "../../services/notificaciones/eliminarNotificacion";
import { Business, Group } from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat';
import '../../assets/css/notificaciones/css-notificacion.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const toggle = () => setIsOpen(!isOpen);
  const cookieNombreEstudiante = new Cookies();
  const nombreAvatar = cookieNombreEstudiante.get('avatarNombre');
  const nombrePath = cookieNombreEstudiante.get('avatarPath');
  const nombrePathGoogle = cookieNombreEstudiante.get('avatarPathGoogle');
  const [notificaciones, setNotificaciones] = useState([]);
  const jwt = cookieNombreEstudiante.get('jwt');

  const logout = async () => {
    await fetch('http://134.209.120.136:4000/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookieNombreEstudiante.remove("nombrePersona");
    cookieNombreEstudiante.remove("apellidoPersona");
    cookieNombreEstudiante.remove("email");
    cookieNombreEstudiante.remove("jwt");

    setCookie('nombreAvatar', '', { path: '/' });
    setCookie('avatarPath', '', { path: '/' });
    setCookie('avatarPathGoogle', '', { path: '/' });

    window.localStorage.clear();
   
  }

  useEffect(async function () {
    const url = 'http://134.209.120.136:4000/api/notificacion/getByUsuario?jwt='+jwt
    return await fetch(url, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    }).then(res => {
      setNotificaciones(res);
    });
  }, [])

  const marcarComoLeido = (i, notificacion) => {
    var array = [...notificaciones];
    const id = notificacion.idNotificacion;
    eliminarNotificacion(id).then(res => {
      var index = array.indexOf(notificacion)
      if (index !== -1) {
        array.splice(index, 1);
        setNotificaciones(array);
      }
    })
  }

  return (
    <div>
      <Navbar className="menuNavBarEstudiante" expand="md" light>
        <img src={logo} />
        <NavbarBrand className="colorBrand" href="/rol">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto"></Nav>
          <Nav navbar>
            <NavItem className="marginMN">
              <Link to="/estudiante/calendario"> <Calendar2Event className="icon-menu color-negro" /></Link>
            </NavItem>
            <NavItem className="marginMN notif">
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <Bell className="icon-menu" />
                  <span id="notificacion-numero" className="badge rounded-circle">{notificaciones.length}</span>
                </DropdownToggle>
                <DropdownMenu right className="notificaciones-modal notificaciones-overflow">
                  {notificaciones.length ?
                    notificaciones.map((notificacion, index) => {
                      return <div key={index}>
                        <Link to={"/estudiante/" + notificacion.urlTipoNotificacion} className="d-block text-decoration-none">
                          <p className="text-estudiante font-weight-bold">{notificacion.descripcion}</p>
                          <span>{notificacion.mensaje}</span>
                        </Link>
                        <div className="w-100 mt-4 d-flex justify-content-end text-dark" onClick={() => marcarComoLeido(index, notificacion)}>
                          <u style={{ cursor: "pointer" }}>
                            <span>Marcar como leído</span>
                            <CheckIcon />
                          </u>
                        </div>
                        <hr />
                      </div>
                    }) : "No hay notificaciones nuevas"}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <UncontrolledDropdown nav >
              <DropdownToggle nav>
                {nombrePathGoogle ?
                  <Avatar className="icon-perfil text-white" style={{ background: "#B0211D" }}>
                    <img className="w-100 h-100"
                      src={nombrePathGoogle}
                      style={{ objectFit: "cover" }} />
                  </Avatar>
                  :
                  <Avatar className="icon-perfil text-white" style={{ background: "#B0211D" }}>
                    {nombreAvatar ? nombreAvatar :
                      <img className="w-100 h-100"
                        src={"http://134.209.120.136:4000/Avatares/" + nombrePath}
                        style={{ objectFit: "cover" }} />
                    }</Avatar>
                }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to='/estudiante/cuenta' className="color-negro text-decoration-none">Mi cuenta</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div className="row d-flex flex-direction-column w-100 pl-1 pr-1 justify-content-between sidebar-responsive">
            <div className="marginMN">
              <Link to="/estudiante/chat">
                <ChatIcon className="icon-menu color-negro"
                  style={{ height: "3rem", width: "3rem" }} />
              </Link>
            </div>
            <div className="marginMN">
              <Link to="/estudiante/comunicado">
                <Group className="icon-menu color-negro"
                  style={{ height: "3rem", width: "3rem" }} />
              </Link>
            </div>
            <div className="marginMN text-decoration-none mt-2">
              <Link to="/rol">
                <Business className="color-negro"
                  style={{ height: "3rem", width: "3rem" }} />
              </Link>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;