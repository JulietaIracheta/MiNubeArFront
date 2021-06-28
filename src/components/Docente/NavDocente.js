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
import { Business } from "@material-ui/icons";
import ChatIcon from '@material-ui/icons/Chat';

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
    <div>
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
              <Link to="#">
                <Bell className="icon-menu color-negro" />
              </Link>
            </NavItem>
            <UncontrolledDropdown nav >
              <DropdownToggle nav>
                <Avatar className="icon-perfil text-white" style={{background:"#212888"}}>{cookies.avatar}</Avatar>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="color-negro text-decoration-none" onClick={logout}>Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div className="row d-flex flex-direction-column w-100 pl-1 pr-1 justify-content-between sidebar-responsive">
          <div className="marginMN text-decoration-none mt-2">
              <Link to="/docente/chat"> 
                <ChatIcon className="color-negro" 
                  style={{height:"3rem",width:"3rem"}}/>
                </Link>
            </div>
            <div className="marginMN text-decoration-none mt-2">
              <Link to="/rol"> 
                <Business className="color-negro" 
                  style={{height:"3rem",width:"3rem"}}/>
                </Link>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;