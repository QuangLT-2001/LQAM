import React, { useEffect, useState } from "react";
import { RouterList } from "../../../../Routers/configRouter";
import { NavLink, useLocation } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import HeaderMenuItem from "./headerMenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"
import Button from "rsuite/Button"
import { faBell } from "@fortawesome/free-solid-svg-icons"
const HeaderMenu = () => {
     let [menu, setMenu] = useState([])
     const location = useLocation();
     const pathName = location.pathname;
     const [sideBar, setSideBar] = useState([]);
     const [mainMenuKey, setMainMenuKey] = useState("");
     const [active, setActive] = useState("");
     useEffect(() => {
          const currentRoute = RouterList.find(item => item.path == pathName);
          if (currentRoute) {
               setMainMenuKey(currentRoute.mainMenuKey)
          }
     }, [pathName])
     useEffect(() => {
          const lstRoute = RouterList.filter(item => item.mainMenuKey == mainMenuKey)
          setSideBar(lstRoute);
     }, [mainMenuKey])
     const lstMenuRight = [
          {
               id: uuidv4(),
               path: "/",
               icon: <Button appearance="primary" color="orange">
                    <FontAwesomeIcon icon={faFacebookMessenger} />
               </Button>
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <Button appearance="subtle">
                    <FontAwesomeIcon icon={faBell} />
               </Button>,
               border: 1
          },
          {
               id: uuidv4(),
               path: "/",
               icon: <img src="/assets/images/user.jpg" alt="user" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
          }
     ]
     useEffect(() => {
          let lstMenu = [];
          for (let item of RouterList) {
               if (item.mainMenuTitle) {
                    lstMenu.push({
                         path: item.path,
                         id: item.id,
                         key: item.mainMenuKey,
                         pageTitle: item.mainMenuTitle
                    })
               }
          }
          setMenu(lstMenu)
     }, [])

     return <>
          <nav className="p-0 navbar navbar-expand-md navbar-light bg-light">
               <div className="container-fluid pe-5 ps-5" style={{ boxShadow: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px" }}>
                    <NavLink className="navbar-brand p-0" to="/">
                         <img src="/assets/images/logo.png" alt="logo" className="me-2" />
                         HRM+
                    </NavLink>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-header">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar-header">
                         <ul className="navbar-nav nav-auto">
                              {menu.map(item => {
                                   return <HeaderMenuItem menuKey={mainMenuKey} key={item.id} headerMenuItem={item} />
                              })}
                         </ul>
                    </div>
                    <ul className="navbar-nav">
                         {lstMenuRight.map(item => {
                              return <li className="nav-item" key={item.id}>
                                   <NavLink to={item.path || "/"} className={`nav-link ${item.button ? "border-right border-secondary" : ""} `}>
                                        {item.icon}
                                   </NavLink>
                              </li>
                         })}
                    </ul>
               </div>
          </nav>
     </>
}
export default HeaderMenu;