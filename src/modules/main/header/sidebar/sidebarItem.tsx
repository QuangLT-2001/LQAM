import React, { useLayoutEffect } from "react"
import {RouterItem} from "../../../../Routers/configRouter"
import {NavLink} from "react-router-dom"
type SideBarItemProps = {
     sideBarItem: RouterItem;
     sideBar: RouterItem[]
}

const SideBarItem:React.FC<SideBarItemProps> = (props) => {
     const {sideBarItem, sideBar} = props;
     return <>
          {sideBarItem.subMenuTitle ? <li className={`nav-item ${sideBarItem.subMenuDrop ? "p-2" : ""}`}>
          {!sideBarItem.subMenuDrop ? <NavLink className="nav-link ps-2" to={sideBarItem.path || "/"}>
               {sideBarItem.subMenuTitle}
          </NavLink> : sideBarItem.subMenuTitle}
          {sideBarItem.subMenuDrop ? <ul className="navbar-nav p-3">
                    {
                         sideBar.map(item => {

                              return <React.Fragment key={item.id}>
                                   {item.subMenuDrop ? <li className="nav-item" key={item.id}>
                                   <NavLink className="nav-link ps-2 pe-2" to={item.path || "/"} key={item.id}>
                                        {item.subMenuDrop}
                                   </NavLink>
                              </li> : ""}
                              </React.Fragment>
                         })
                    }
               </ul> : ""}
     </li> : ""}
     </>
}
export default SideBarItem;