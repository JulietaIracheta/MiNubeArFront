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
import { Calendar2Event, Bell, PersonCircle } from "react-bootstrap-icons";
import logo from '../../assets/img/logoGris.png'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const logout = async () => {
    await fetch('http://localhost:60671/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    window.localStorage.setItem('logged', false);
    window.location.reload();
    window.location.assign("/login")
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
             <a href="/notificaciones"> <Bell className="icon-menu" /></a>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
            <PersonCircle className="icon-perfil"/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                <Link onClick={logout}>Logout</Link> 
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