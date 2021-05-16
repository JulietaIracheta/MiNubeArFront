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
import { ChatSquareQuoteFill, Bell, PersonCircle } from "react-bootstrap-icons";
import { useCookies } from 'react-cookie';
import '../../assets/nav.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const history = useHistory();
  console.log(cookies);
  const toggle = () => setIsOpen(!isOpen);
  const logout = async () => {
    setCookie('Name', '', { path: '/' });
    setCookie('img', '', { path: '/' });
    history.push('/login')

    /*await fetch('http://localhost:60671/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });*/
  }

  return (
    <div >
      <Navbar className="menuNavBarDocente" expand="md">
        <NavbarBrand className="colorBrand color-negro" href="/docente">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavbarText className="misCursos color-negro">Mis Escuelas</NavbarText>
            <NavbarText className="misCursos color-negro">|</NavbarText>
          </Nav>
          <Nav navbar>
            <NavItem className="marginMN">
              <ChatSquareQuoteFill className="icon-menu color-negro" />
            </NavItem>
            <NavItem className="marginMN notif">
              <a href="/notificaciones"> <Bell className="icon-menu color-negro" /></a>
              <span id="notificacion-numero" className="badge rounded-circle">2</span>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                 <PersonCircle className="icon-perfil color-negro" />
            </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="text-decoration-none" to='/login' onClick={logout}>Logout</Link>
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

