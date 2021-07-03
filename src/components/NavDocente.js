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
import { Link } from 'react-router-dom'
import '../assets/nav.css';
import { useCookies } from 'react-cookie';
import '../../assets/css/notificaciones/css-notificacion.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  setCookie('Name', '', { path: '/' });
  setCookie('img', '', { path: '/' });
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <div className="navBar">
                    <button onClick={toggle}>
                    </button>
                    <ul className={toggle ? "nav-links show-nav" : "nav-links"}>
                        <li href="/docente">Home</li>
                        <li href="#"><ChatSquareQuoteFill className="icon-menu" /></li>
                        <li href="#"><Bell className="icon-menu" /></li>
                        <li href="#">{cookies.img ?
                <img src={cookies.img} className='rounded-circle avatar-logo'>

                </img>
                : <PersonCircle className="icon-menu" />
              }
              </li>
                    </ul>
              </div>
              
    </div>
  );
};

export default NavBar;

// 