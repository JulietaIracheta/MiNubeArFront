import React, { useState } from "react";
import { Link} from 'react-router-dom';
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
import {  Bell, Calendar2Event} from "react-bootstrap-icons";
import '../../assets/nav.css';
import logo from '../../assets/img/logoGris.png'
import { Avatar } from "@material-ui/core";
import { Cookies, useCookies } from 'react-cookie';
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [cookies, setCookie] = useCookies(['usuario']);
  const cookieNombreEstudiante = new Cookies();

  const logout = async () => {
    await fetch('http://localhost:60671/api/usuario/logout', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    cookieNombreEstudiante.remove("nombrePersona");
    window.localStorage.setItem('logged', false);
    window.location.reload();

  }

  return (
    <div >
      <Navbar className="menuNavBarDocente" expand="md" light>
        <img src={logo} />
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
              <Link to="/calendario"> <Calendar2Event className="icon-menu color-negro" /></Link>
            </NavItem>
            <NavItem className="marginMN notif">
              <Link to="#"> <Bell className="icon-menu color-negro" /></Link>

            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <Avatar className="icon-perfil text-white" style={{background:"#212888"}}>{cookies.avatar}</Avatar>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link  className="color-negro text-decoration-none" onClick={logout}>Logout</Link>
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