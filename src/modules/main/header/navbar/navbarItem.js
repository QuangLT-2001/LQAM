import React from "react";
import { NavLink } from "react-router-dom"

const NavbarItem = (props) => {
     const { navbarItem } = props

     return <li className="nav-item">
          <NavLink to={navbarItem.path || "/"} className="nav-link p-3 text-white fs-4">
               {navbarItem.icon}
          </NavLink>
     </li>
}
export default NavbarItem;