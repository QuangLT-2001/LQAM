import React from "react";
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faWandMagicSparkles, faRepeat, faStreetView, faChartSimple, faGear } from "@fortawesome/free-solid-svg-icons"
import NavbarItem from "./navbarItem";
import { NavLink } from "react-router-dom"
import { NavbarLeftWrapper } from "./style"
const NavbarMenu = () => {
     const lstNavbar = [
          {
               id: uuidv4(),
               path: "/",
               icon: <span>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
               </span>
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <span>
                    <FontAwesomeIcon icon={faRepeat} />
               </span>
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <span>
                    <FontAwesomeIcon icon={faStreetView} />
               </span>
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <span>
                    <FontAwesomeIcon icon={faChartSimple} />
               </span>
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <span>
                    <FontAwesomeIcon icon={faGear} />
               </span>
          },


     ]
     return <NavbarLeftWrapper className="d-flex flex-column bg-success">
          <NavLink to="/" className="nav-link p-2 text-white text-user">
               <span>
                    <FontAwesomeIcon icon={faUser} />
               </span>
          </NavLink>
          <ul className="navbar-nav d-flex flex-column pt-4" style={{ height: "100vh" }}>
               {lstNavbar.map(item => {
                    return <NavbarItem key={item.id} navbarItem={item} />
               })}
          </ul>
     </NavbarLeftWrapper>
}
export default NavbarMenu;