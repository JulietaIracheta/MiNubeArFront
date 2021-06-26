import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import Login from "./Login";
import { ChatSquareQuoteFill, Bell, PersonCircle } from "react-bootstrap-icons";
import Notificacion from "./Notificaciones/notificacion";
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar className="menuNavBarEstudiante" expand="md">
        <NavbarBrand className="colorBrand" href="/">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
            <Nav>
            <NavbarText className="misCursos">Mis Cursos</NavbarText>
            <NavbarText className="misCursos">|</NavbarText>
            </Nav>
            <Nav navbar>
            <NavItem className="marginMN">
              <ChatSquareQuoteFill className="icon-menu"/>
            </NavItem>
            <NavItem className="marginMN">
              <Bell className="icon-menu" />{" "}
            </NavItem>
            <NavItem className="marginMN">
            <PersonCircle className="icon-menu"/>{" "}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar> adss
      <Notificacion/>
    </div>
  );
};

export default NavBar;
