import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BellFill,Calendar2DayFill } from "react-bootstrap-icons";
import logo from '../../assets/img/logoColor.jpeg'
import CheckIcon from '@material-ui/icons/Check';
import eliminarNotificacion from "../../services/notificaciones/eliminarNotificacion";
import { Cookies } from 'react-cookie';
import { Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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
  const [notificaciones, setNotificaciones] = useState([]);
  const cookie = new Cookies();
  const nombre = cookie.get('avatar');
  const jwt = cookie.get('jwt');

  const logout = async () => {
    await fetch(`${url.url}/api/usuario/logout`, {
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
    const urlBase = `${url.url}/api/notificacion/getByUsuario?jwt=`+jwt
    return await fetch(urlBase, {
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
      <Navbar className="menuNavBarReg menuNavBarTutor d-flex justify-content-between p-0" expand="md" light>
        <NavbarBrand className="colorBrand d-flex align-items-center" href="/rol">
          <img className="nav_logo" src={logo} width="100px" /> 
          <span className="d-none d-sm-block pt-2 logo__titulo">MI NUBE AR</span>
        </NavbarBrand>
        <Nav className="d-flex justify-content-center align-items-center pr-2">
            <NavItem className="pt-1 pl-2">
                <Link to="/calendariotutor"> <Calendar2DayFill size={size_icon} color="#5D7392" /></Link>
            </NavItem>
            <NavItem className="marginMN notif mr-1">
              <UncontrolledDropdown nav>
                <DropdownToggle nav className="pt-2 mt-1 pr-0 pl-0">
                  <BellFill size={26} color="#5D7392" />
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
                    }) : <span className="pl-3">No hay notificaciones nuevas</span>}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                <Avatar className={classes.default} style={{ background: "#67a147" }}>{nombre}</Avatar>
              </DropdownToggle>
            <DropdownMenu right>
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