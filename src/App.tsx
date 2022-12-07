import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import contractApi from "./services/contractApi"
import SideBar from 'modules/main/header/sidebar/sidebar';
import NavbarMenu from 'modules/main/header/navbar/navbarMenu';
import HeaderMenu from 'modules/main/header/menu/headerMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'
import Contract from 'Pages/typeContract';
import Page404 from 'Pages/page404';
import { RouterList } from 'Routers/configRouter';
import PageOutlet from 'modules/main/PageOutlet';
function App() {
  // useEffect(() => {
  //     contractApi.contractApi.getAll().then(respon => {
  //     })
  // }, [])
  return (
    <div className="App">
      <Router>
        <div className='d-flex'>
          <NavbarMenu />
          <div className='layer__right  d-flex flex-column flex-grow-1'>
          <HeaderMenu />
          <section className='main__body flex-grow-1 d-flex'>
              <SideBar />
              <div className='w-100' style={{ background: "rgb(161 160 159 / 30%)" }}>
              <Routes>
                <Route path="*" element={<Page404 />}/>
                {RouterList.map(item => {
                let page: any = item != null ? <PageOutlet>{item.getPageElement()}</PageOutlet> : null;

                return <Route path={`${item.path}`} element={page != null ? page : <Page404 />} key={item.id} />

              })}

              </Routes>
              </div>
          </section>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
