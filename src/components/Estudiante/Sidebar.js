import React from 'react';
import { SidebarData } from './SidebarData';
import ResponsiveMenu from 'react-responsive-navbar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from '@material-ui/core';

function Sidebar() {
    return (
        <div className="Sidebar">
            <ResponsiveMenu
                menuOpenButton={<FaBars />}
                menuCloseButton={<FaTimes />}
                changeMenuOn="800px"
                largeMenuClassName="large-menu-classname"
                smallMenuClassName="small-menu-classname"
                menu={
                    <ul className="SidebarList">
                        {SidebarData.map((val, key) => {
                            return (
                                <li
                                    key={key}
                                    className="row"
                                    id={window.location.pathname == val.link ? "active" : ""}
                                >
                                    <Link to={val.link} className="text-dark w-100 d-flex justify-content-center text-decoration-none">
                                        <div id="icon">{val.icon}</div><div id="title">{val.title}</div>
                                    </Link>

                                </li>
                            );
                        })}
                    </ul>
                }
            />
        </div>
    );
}

export default Sidebar;