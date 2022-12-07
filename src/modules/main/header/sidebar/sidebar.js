import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { SideBarWrapper } from "./style";
import { RouterList } from "./../../../../Routers/configRouter"
import SideBarItem from "./sidebarItem";
const SideBar = () => {
     const location = useLocation();

     const pathName = location.pathname.slice(0, location.pathname.lastIndexOf("/")) + "/";
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

     return <SideBarWrapper className="sidebar p-3 border-right border-secondary">
          <ul className="lst-sidebar navbar-nav">
               {sideBar.map(item => {

                    return <SideBarItem key={item.id} sideBarItem={item} sideBar={sideBar} />
               })}
          </ul>
     </SideBarWrapper>
}
export default SideBar;