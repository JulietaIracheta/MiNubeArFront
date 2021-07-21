import React, { useState } from "react";
import { Link } from 'react-router-dom';
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
import { Calendar2DayFill ,BellFill} from "react-bootstrap-icons";
import '../../assets/nav.css';
import logo from '../../assets/img/logoColor.png'
import { Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Cookies, useCookies } from 'react-cookie';
import '../../assets/css/css-docente.css'
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
  const toggle = () => setIsOpen(!isOpen);
  const [cookies, setCookie] = useCookies(['usuario']);
  const cookieNombreEstudiante = new Cookies();
  const nombreAvatar = cookieNombreEstudiante.get('avatarNombre');
  const nombrePath = cookieNombreEstudiante.get('avatarPath');
  const nombrePathGoogle = cookieNombreEstudiante.get('avatarPathGoogle');

  const logout = async () => {
    await fetch(`${url.url}/api/usuario/logout`, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookieNombreEstudiante.remove("nombrePersona");
    cookieNombreEstudiante.remove("apellidoPersona");
    cookieNombreEstudiante.remove("jwt");
    cookieNombreEstudiante.remove("email");
    cookieNombreEstudiante.remove("rol");
    cookieNombreEstudiante.remove("rolId");

    cookieNombreEstudiante.remove("nombrePersona");
    cookieNombreEstudiante.remove("apellidoPersona");
    cookieNombreEstudiante.remove("email");
    cookieNombreEstudiante.remove("jwt");
    cookieNombreEstudiante.remove("rol");
    cookieNombreEstudiante.remove("rolId");
    cookieNombreEstudiante.remove("avatarNombre");
    cookieNombreEstudiante.remove("nombreAvatar");
    cookieNombreEstudiante.remove("email");
    cookieNombreEstudiante.remove("avatarPathGoogle");
    cookieNombreEstudiante.remove("avatarPath");

    /*setCookie('nombreAvatar', '', { path: '/' });
    setCookie('avatarNombre', '', { path: '/' });
    setCookie('email', '', { path: '/' });
    setCookie('rol', '', { path: '/' });
    setCookie('apellidoPersona', '', { path: '/' });
    setCookie('nombrePersona', '', { path: '/' });
    setCookie('avatarPath', '', { path: '/' });
    setCookie('avatarPathGoogle', '', { path: '/' });
    setCookie('jwt', '', { path: '/' });*/
  }

  return (
    <div>
      <Navbar className="menuNavBarReg menuNavBarDocente d-flex justify-content-between p-0 bg-white" expand="md" light>
        <NavbarBrand className="colorBrand d-flex align-items-center" href="/rol">
          <img className="nav_logo" src={logo} width="100px" /> 
          <span className="d-none d-sm-block pt-2 logo__titulo">MI NUBE AR</span>
        </NavbarBrand>
          <Nav className="d-flex justify-content-center align-items-center pr-2">
            <NavItem className="pt-1 pr-2 pl-2">
              <Link to="/calendario"> <Calendar2DayFill  size={size_icon} color="#5D7392" /></Link>
            </NavItem>
             {/* <NavItem className="pt-1 pr-2 pl-2">
              <Link to="#">
                <BellFill size={26} color="#5D7392"/>
              </Link>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="p-0 pr-2 pl-2">
                {nombrePathGoogle ?
                  <Avatar className={classes.default} style={{ background: "#B0211D" }}>
                    <img className="w-100 h-100"
                      src={nombrePathGoogle}
                      style={{ objectFit: "cover" }} />
                  </Avatar>
                  :
                  <Avatar className={classes.default}>
                    {nombreAvatar ? nombreAvatar :
                      <img className="w-100 h-100"
                        src={`${url.url}/Avatares/` + nombrePath}
                        style={{ objectFit: "cover" }} />
                    }</Avatar>
                }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to='/docente/cuenta' className="color-negro text-decoration-none">Mi cuenta</Link>
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