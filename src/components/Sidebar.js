import React, {useState} from 'react';
import ResponsiveMenu from 'react-responsive-navbar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { List } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import {
    NavbarToggler,
  } from "reactstrap";
import { Style } from '@material-ui/icons';

function Sidebar({ data }) {

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    let btn_class = isOpen ? "Sidebar ancho1" : "Sidebar ancho2"
    return (
        
        <div className={btn_class}>
            <ul className="SidebarList">
                <span className="m-0 p-0 d-flex flex-row-reverse pr-2 btn pl-3 pr-2" onClick={toggle}><List className="text-center" size={32} color="#5D7392" /></span>
                {data.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="row pt-2 pb-2"
                            id={window.location.pathname == val.link ? "active" : ""}
                        >
                            <Link to={val.link} className="pl-2 pr-2 w-100 d-flex justify-content-center align-items-center text-decoration-none text-left">
                                <div id="icon">{val.icon}</div>
                                {isOpen === true && <div id="title" className="pl-2">{val.title}</div>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;