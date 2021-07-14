import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../assets/css/admin/admin.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChatLeftTextFill, Bell, PersonCircle } from "react-bootstrap-icons";
import logo from '../../assets/img/logoGris.png'
import { BorderColor, Business, Group } from "@material-ui/icons";


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
      <Navbar className="menuNavBarReg" expand="md" light>
        <img src={logo} />
        <NavbarBrand className="colorBrand" href="/rol">MI NUBE AR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto"></Nav>
          <Nav navbar className="iconos-nav nav-responsive-sidebar">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <PersonCircle className="icon-perfil" />

              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link>  
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          <NavItem className="marginMN sidebarResponsive">
            <a href="/Instituciones"> <Business className="icon-menu" /></a>
          </NavItem>
          <NavItem className="marginMN sidebarResponsive">
            <a href="/usuarios"> <Group className="icon-menu" /></a>
          </NavItem>
          <NavItem className="marginMN sidebarResponsive">
            <a href="#"> <BorderColor className="icon-menu" /></a>
          </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;