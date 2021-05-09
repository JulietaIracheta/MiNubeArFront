import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { ChatSquareQuoteFill, Bell, PersonCircle } from "react-bootstrap-icons";
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar className="menuNavBarDocente" expand="md">
        <NavbarBrand className="colorBrand" href="/">Mi Nube AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto"></Nav>
           <Link to='/docente' className="text-decoration-none misCursos text-white">Mis Escuelas</Link>
            <Nav>
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
      </Navbar>
    </div>
  );
};

export default NavBar;