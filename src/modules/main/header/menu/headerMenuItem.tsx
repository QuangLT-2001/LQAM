import React from "react";
import {NavLink} from "react-router-dom"
import {HeaderMenuItems} from "./style"
type HeaderMenuItemProps = {
     path: string,
          id: string,
          key: string,
          pageTitle: string
}
const HeaderMenuItem = ({headerMenuItem, menuKey} : {headerMenuItem: HeaderMenuItemProps, menuKey: string}) => {

     return <HeaderMenuItems className="nav-item">
          <NavLink className={`nav-link ${menuKey == headerMenuItem.key ? "active" : ""}`} to={headerMenuItem.path || "/"}>
               {headerMenuItem.pageTitle}
          </NavLink>
     </HeaderMenuItems>
}
export default HeaderMenuItem;