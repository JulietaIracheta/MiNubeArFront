import React, { useState } from "react";
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
import { ChatLeftTextFill, Bell, PersonCircle } from "react-bootstrap-icons";
import { useCookies } from 'react-cookie';
import logo from '../../assets/img/logoGris.png'
import "../../assets/css/css-estudiante.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const toggle = () => setIsOpen(!isOpen);
  const logout = async () => {
    await fetch('http://localhost:60671/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
  }

  return (
    <div >
      <Navbar className="menuNavBarEstudiante" expand="md" light>
        <img src={logo}/>
        <NavbarBrand className="colorBrand navbar-brand" href="/estudiante/Materias">MI NUBE AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
            <Nav navbar>
            <NavItem className="marginMN">
              <ChatLeftTextFill className="icon-menu"/>
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