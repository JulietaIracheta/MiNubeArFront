import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Calendar2Event, Bell, PersonCircle } from "react-bootstrap-icons";
import logo from '../../assets/img/logoGris.png'
import CheckIcon from '@material-ui/icons/Check';
import eliminarNotificacion from "../../services/notificaciones/eliminarNotificacion";
import { Cookies } from 'react-cookie';
import { Avatar } from "@material-ui/core";


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const cookie = new Cookies();
  const nombre = cookie.get('avatar');
  const jwt = cookie.get('jwt');

  const toggle = () => setIsOpen(!isOpen);
  const logout = async () => {
    await fetch('http://134.209.120.136:4000/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookie.remove("nombrePersona");
    cookie.remove("apellidoPersona");
    cookie.remove("email");
    cookie.remove("avatarNombre");
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
    <div >
      <Navbar className="menuNavBarTutor" expand="md" light>
        <img src={logo}/>
        <NavbarBrand className="colorBrand navbar-brand" href="/tutor">MI NUBE AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
            <Nav>
            <NavbarText className="misCursos">Mis Estudiantes</NavbarText>
            <NavbarText className="misCursos">|</NavbarText>
            </Nav>
            <Nav navbar>
            <NavItem className="marginMN">
            <Link to="/calendariotutor"> <Calendar2Event className="icon-menu color-negro" /></Link>
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
                        <Link to={"/estudiante/"+notificacion.urlTipoNotificacion} className="d-block text-decoration-none">
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

            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                <Avatar className="icon-perfil text-white" style={{ background: "#67a147" }}>{nombre}</Avatar>
              </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                <Link to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link> 
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;