import React from 'react';
import {SidebarData} from './SidebarData';
import ResponsiveMenu from 'react-responsive-navbar';
import { FaBars,FaTimes } from 'react-icons/fa';

function Sidebar () {
    return(
        <div className="Sidebar">
            <ResponsiveMenu
              menuOpenButton={<FaBars/>}
              menuCloseButton={<FaTimes/>}
              changeMenuOn="800px"
              largeMenuClassName="large-menu-classname"
              smallMenuClassName="small-menu-classname"
              menu={
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return(
                        <li 
                        key={key}
                        className="row"
                        id={window.location.pathname == val.link ? "active" : ""}
                        onClick={() => {
                            window.location.pathname = val.link;
                        }}
                        >
                            <div id="icon">{val.icon}</div><div id="title">{val.title}</div> 
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