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
import { IconContext } from "react-icons";
import { ChatLeftTextFill, Bell, BellFill, PersonCircle, PersonCheckFill } from "react-bootstrap-icons";
// import logo from '../../assets/img/logoGris.png'
import logo from '../../assets/img/logoColor.jpeg'
import { BorderColor, Business, Group } from "@material-ui/icons";

let size_icon = 25

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
      <Navbar className="menuNavBarReg d-flex justify-content-between p-0" expand="md" light>
        
        <NavbarBrand className="colorBrand d-flex align-items-center" href="/rol">
          <img className="nav_logo" src={logo} width="100px" /> 
          <span className="d-none d-sm-block">MI NUBE AR</span>
        </NavbarBrand>
        {/* <NavbarToggler className="" onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar> */}
          {/* <Nav className="mr-auto"></Nav> */}
          <Nav className="iconos-navTODO d-flex justify-content-center align-items-center pr-2">
            <NavItem className="pt-1 pr-2 pl-2">
              <ChatLeftTextFill size={size_icon}  />
            </NavItem>
            <NavItem className="notif pr-2 pl-2">
              <a href="/notificaciones"> <BellFill size={size_icon} color="black" /></a>
              {/* <a href="/notificaciones"> <Bell className="icon-menu" /></a> */}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="p-0 pr-2 pl-2">
                  <PersonCircle  size={size_icon} color="black"/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link>  
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          {/* <NavItem className="marginMN sidebarResponsive">
            <a href="/Instituciones"> <Business className="icon-menu" /></a>
          </NavItem>
          <NavItem className="marginMN sidebarResponsive">
            <a href="/usuarios"> <Group className="icon-menu" /></a>
          </NavItem>
          <NavItem className="marginMN sidebarResponsive">
            <a href="/video"> <BorderColor className="icon-menu" /></a>
          </NavItem> */}
          </Nav>
        {/* </Collapse> */}
      </Navbar>
    </div>
  );
};

export default NavBar;