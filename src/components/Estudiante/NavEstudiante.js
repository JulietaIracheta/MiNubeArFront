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
import { Calendar2Event, Bell, Calendar2DayFill, BellFill } from "react-bootstrap-icons";
import { Cookies, useCookies } from 'react-cookie';
import logo from '../../assets/img/logoColor.png'
import "../../assets/css/css-estudiante.css";
import { Avatar } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import eliminarNotificacion from "../../services/notificaciones/eliminarNotificacion";
import { Business, Group } from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from '@material-ui/core/styles';
import '../../assets/css/notificaciones/css-notificacion.css';
import url from "../../url"


let size_icon = 25

const useStyles = makeStyles(theme => ({
  default: {
    width: theme.spacing(7/2),
    height: theme.spacing(7/2),
    color: "#fff",
    backgroundColor: "#212888",
    marginTop: theme.spacing(1/2),
    fontSize: theme.spacing(2),
  },
}));



const NavBar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const toggle = () => setIsOpen(!isOpen);
  const cookieNombreEstudiante = new Cookies();
  const nombreAvatar = cookieNombreEstudiante.get('avatarNombre');
  const nombrePath = cookieNombreEstudiante.get('avatarPath');
  const nombrePathGoogle = cookieNombreEstudiante.get('avatarPathGoogle');
  const [notificaciones, setNotificaciones] = useState([]);
  const jwt = cookieNombreEstudiante.get('jwt');
  const rol = cookieNombreEstudiante.get('rol');
  const rolId = cookieNombreEstudiante.get('rolId');

  const logout = async () => {
    await fetch( `${url.url}/api/usuario/logout`, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookieNombreEstudiante.remove("nombrePersona");
    cookieNombreEstudiante.remove("apellidoPersona");
    cookieNombreEstudiante.remove("email");
    cookieNombreEstudiante.remove("jwt");
    cookieNombreEstudiante.remove("rol");
    cookieNombreEstudiante.remove("rolId");

    setCookie('nombreAvatar', '', { path: '/' });
    setCookie('avatarPath', '', { path: '/' });
    setCookie('avatarPathGoogle', '', { path: '/' });
    setCookie('jwt', '', { path: '/' });

    window.localStorage.clear();
   
  }

  useEffect(async function () {
    const urlB =  `${url.url}/api/notificacion/getByUsuario?jwt=`+jwt
    return await fetch(urlB, {
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
      <Navbar className="menuNavBarReg menuNavBarEstudiante d-flex justify-content-between p-0 bg-white" expand="md" light>
        <NavbarBrand className="colorBrand d-flex align-items-center" href="/rol">
          <img className="nav_logo" src={logo} width="100px" /> 
          <span className="d-none d-sm-block pt-2 logo__titulo">MI NUBE AR</span>
        </NavbarBrand>
          <Nav className="d-flex justify-content-center align-items-center pr-2">
            <NavItem className="pt-1 pl-2">
              <Link to="/estudiante/calendario"> <Calendar2DayFill size={size_icon} color="#5D7392" /></Link>
            </NavItem>
            <NavItem className="marginMN notif">
              <UncontrolledDropdown nav>
                <DropdownToggle nav className="pt-2 mt-1 pr-0 pl-0">
                  <BellFill size={26} color="#5D7392" />
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
                    }) : <span className="pl-3">No hay notificaciones nuevas</span>}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="p-0 pr-2 pl-2">
                {nombrePathGoogle ?
                  <Avatar className={classes.default} style={{ background: "#B0211D" }}>
                    <img className="w-100 h-100"
                      src={nombrePathGoogle}
                      style={{ objectFit: "cover" }} />
                  </Avatar>
                  :
                  <Avatar className={classes.default} style={{ background: "#B0211D" }}>
                    {nombreAvatar ? nombreAvatar :
                      <img className="w-100 h-100"
                        src={ `${url.url}/Avatares/` + nombrePath}
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
      </Navbar>
    </div>
  );
};

export default NavBar;