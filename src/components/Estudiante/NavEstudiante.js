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

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Navbar className="menuNavBarEstudiante" expand="md">
        <NavbarBrand className="colorBrand" href="/estudiante">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
            <Nav>
            <NavbarText className="misCursos">Mis Cursos</NavbarText>
            <NavbarText className="misCursos">|</NavbarText>
            </Nav>
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
                <a href="/estudiante/1">Ver Perfil</a> 
                </DropdownItem>
                <DropdownItem divider />
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
