import React, { useState } from "react";
import {Link} from 'react-router-dom';
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
import { Calendar2Event, Bell, PersonCircle } from "react-bootstrap-icons";
import { Cookies, useCookies } from 'react-cookie';
import logo from '../../assets/img/logoGris.png'
import "../../assets/css/css-estudiante.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const toggle = () => setIsOpen(!isOpen);
  const cookieNombreEstudiante = new Cookies();

  const logout = async () => {
    await fetch('http://localhost:60671/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookieNombreEstudiante.remove("nombrePersona");
  }

  return (
    <div>
      <Navbar className="menuNavBarEstudiante" expand="md">
      <img src={logo} />
        <NavbarBrand className="colorBrand" href="/estudiante">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
            <Nav navbar>
            <NavItem className="marginMN">
            <Link to="/calendarioestudiante"> <Calendar2Event className="icon-menu color-negro" /></Link>
            </NavItem>
            <NavItem className="marginMN notif"> 
             <a href="/notificaciones"> <Bell className="icon-menu" /></a>
              <span id="notificacion-numero" className="badge rounded-circle">2</span>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
            <PersonCircle className="icon-perfil"/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                <Link to='/login' onClick={logout}>Logout</Link> 
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