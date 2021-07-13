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
        console.log(isOpen)
    }

    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {/* <NavbarToggler className="bg-secondary text-black" onClick={toggle} /></li> */}
                <span className="m-0 p-0 btn pb-3 float-right pr-0" onClick={toggle}><List className="text-center" size={32} color="black" /></span>
                {data.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="row p-2"
                            id={window.location.pathname == val.link ? "active" : ""}
                        >
                            <Link to={val.link} className="text-dark w-100 d-flex justify-content-center align-items-center text-decoration-none text-left">
                                <div id="icon">{val.icon}</div>
                                    {isOpen === true && <div id="title">{val.title}</div>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;