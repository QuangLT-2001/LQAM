import { KPIDashboardWrapper } from "./style";
import CalendarIcon from '@rsuite/icons/Calendar'
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faClock} from "@fortawesome/free-regular-svg-icons"
import {faRotateRight} from "@fortawesome/free-solid-svg-icons"
import ModalComponent from "./modal";
import { useState } from "react";
const KPIDashboard = () => {
     const [open, setOpen] = useState<any>(false);
     const handleClickClose = () => {
          setOpen(false)
     }
     const handleClickOpenModal = () => {
          setOpen(true)
     }

     const lstObj = [
          {
               id: 1,
               name: "Nguyễn Văn Hương",
               employeeCode: "NV001",
               userID: "ID200010",
               avatar: "/assets/images/user/user-1.png"
          },
          {
               id: 2,
               name: "Nguyễn Thị Đông",
               employeeCode: "NV002",
               userID: "ID200011",
               avatar: "/assets/images/user/user-2.jpg"
          }
     ]

     const data = lstObj.map((item:any, index:any) => {
          return {
               ...item,
               ind: index + 1
          }
     })

     return <KPIDashboardWrapper className="page-kpi">
          <ModalComponent
          title="Danh sách nhân viên nghỉ phép"
          open={open}
          close={handleClickClose}
          keyModal="lstEmployee"
          data={data}
          />
          <div className="header_page p-3 d-flex justify-content-center fs-5">
               <div className="timer-item d-flex">
                    <span className="me-3 text-uppercase">
                         <CalendarIcon className="me-3"/>
                         ngày
                    </span>
                    <p>
                    <span><ArrowLeftLineIcon /></span>
                    <span className="ms-3 me-3 text-dark fw-bold">
                         2022-12-29
                    </span>
                    <span><ArrowRightLineIcon /></span>
                    </p>
               </div>
               <span className="ms-3 me-3">|</span>
               <div className="timer-item d-flex">
                    <span className="me-3 text-uppercase">
                         <FontAwesomeIcon icon={faClock} className="me-3"/>
                         thời gian
                    </span>
                    <p>
                    <span className="ms-3 me-3 text-dark fw-bold">
                         10:30:00
                    </span>

                    </p>
               </div>
          </div>
          <div className="body_page p-3 d-flex flex-column align-items-center">
               <div className="kpi-item mb-3 w-75 p-3 ps-5 pe-5 d-flex">
                    <p className="kpi-item-left w-50 fw-bold text-warning d-flex align-items-center">
                         <span className="counter me-3">
                              80
                         </span>
                         <span>Nhân sự</span>
                    </p>
                    <div className="kpi-item-right w-50 d-flex flex-column">
                         <span>
                              <b className="me-3">78</b>
                              Đi làm
                         </span>
                         <span className="text-decoration-underline d-flex" style={{color: "#04AA6D", cursor: "pointer"}} onClick={handleClickOpenModal}>
                              <span className="me-3"> 2</span>
                              Nghỉ phép
                              <span className="ms-3">
                                   <FontAwesomeIcon icon={faRotateRight}/>
                              </span>
                              </span>

                    </div>


               </div>

               <div className="kpi-item mb-3 w-75 p-3 ps-5 pe-5 d-flex">
                    <p className="kpi-item-left w-50 fw-bold d-flex align-items-center" style={{color: "#298ef2"}}>
                         <span className="counter me-3">
                              75
                         </span>
                         <span>Đã check in</span>
                    </p>
               </div>

               <div className="kpi-item mb-3 w-75 p-3 ps-5 pe-5 d-flex">
                    <p className="kpi-item-left w-50 fw-bold d-flex align-items-center" style={{color: "#e84343"}}>
                         <span className="counter me-3">
                              5
                         </span>
                         <span>Chưa check in</span>
                    </p>
               </div>

               <div className="kpi-item mb-3 w-75 p-3 ps-5 pe-5 d-flex">
                    <p className="kpi-item-left w-50 fw-bold  d-flex align-items-center" style={{color: "#1bc236"}}>
                         <span className="counter me-3">
                              60
                         </span>
                         <span>Đang làm việc</span>
                    </p>
                    <div className="kpi-item-right w-50 d-flex flex-column">
                         <span>
                              <b className="me-3">50</b>
                              HeadQuarter
                         </span>

                         <span>
                              <b className="me-3">5</b>
                              Chi nhánh miền nam
                         </span>

                         <span>
                              <b className="me-3">5</b>
                              Outside
                         </span>


                    </div>


               </div>

               <div className="kpi-item mb-3 w-75 p-3 ps-5 pe-5 d-flex">
                    <p className="kpi-item-left w-50 fw-bold d-flex align-items-center" style={{color: "#818181"}}>
                         <span className="counter me-3">
                              15
                         </span>
                         <span>Đã check out</span>
                    </p>
               </div>
          </div>
     </KPIDashboardWrapper>
}
export default KPIDashboard;