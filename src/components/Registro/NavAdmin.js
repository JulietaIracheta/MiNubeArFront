import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../assets/css/admin/admin.css'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {  PersonCircle } from "react-bootstrap-icons";
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
          <span className="d-none d-sm-block pt-2 logo__titulo">MI NUBE AR</span>
        </NavbarBrand>
          <Nav className="iconos-navTODO d-flex justify-content-center align-items-center pr-2">
            {/* <NavItem className="pt-1 pr-2 pl-2">
              <ChatLeftTextFill size={size_icon} color="#5D7392" />
            </NavItem>
            <NavItem className="notif pr-2 pl-2">
              <a href="/notificaciones"> <BellFill size={size_icon} color="#5D7392" /></a>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="p-0 pr-2 pl-2">
                  <PersonCircle  size={size_icon} color="#5D7392"/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to='/login' className="color-negro text-decoration-none" onClick={logout}>Logout</Link>  
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;