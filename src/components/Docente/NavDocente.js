import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
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
import '../../assets/nav.css';
import logo from '../../assets/img/logoGris.png'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const history = useHistory();
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
      <Navbar className="menuNavBarDocente" expand="md" light>
        <img src={logo}/>
        <NavbarBrand className="colorBrand navbar-brand" href="/rol">MI NUBE AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavbarText className="misCursos color-negro">Mis Escuelas</NavbarText>
            <NavbarText className="misCursos color-negro">|</NavbarText>
          </Nav>
          <Nav navbar>
            <NavItem className="marginMN">
              <ChatLeftTextFill className="icon-menu color-negro" />
            </NavItem>
            <NavItem className="marginMN notif">
              <a href="/notificaciones"> <Bell className="icon-menu color-negro" /></a>
           
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                 <PersonCircle className="icon-perfil color-negro" />
            </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="text-decoration-none" to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link>
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