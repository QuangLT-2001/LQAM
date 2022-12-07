import { useEffect, useState } from "react";
import { TimerWorkEditWrapper } from "./style";
import InputComponent from "components/input";
import { Toggle } from "rsuite";
import Timer from "./time";
import Hodiday from "./holiday";
import ButtonComponent from "components/button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { select } from "redux-saga/effects";
import { getTimerWorkByCode, postTimerWork, putTimerWork, selectIsLoading, selectTimeDetail } from "features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom"
type TimerWorkEditProps = {
     statusChilrent?: any
}
const TimerWorkEdit:React.FC<TimerWorkEditProps>  =  (props) => {
     const {statusChilrent} = props;
     const [name, setName] = useState("")
     const [status, setStatus] = useState(true);
     const [isDefault, setIsDefault] = useState(true);
     const dispatch = useAppDispatch()
     let SelectTimerDetail = useAppSelector(selectTimeDetail)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     let {id} = useParams()
     const navigate = useNavigate()

     const handleClickBack = () => {
          statusChilrent(false)
     }
     useEffect(() => {
         if(id) {
          dispatch(getTimerWorkByCode({
               url: "timer",
               id: id
          }))
         }
     }, [])
     useEffect(() => {
        if(!SelectIsLoading && SelectTimerDetail && id) {
          setName(SelectTimerDetail.name)
          setStatus(SelectTimerDetail.status)
          setIsDefault(SelectTimerDetail.isDefault)
        }
     }, [SelectIsLoading, id, SelectTimerDetail])
     const handleClickUpdate = () => {
          dispatch(putTimerWork({
               url: "timer",
               id: id,
               object: {
                    isDefault: isDefault,
                    status: status,
                    type: "Business Hours",
                    name: name
               }
          }))
          setName("");
          setStatus(true);
          setIsDefault(true)
          navigate("/quan-tri/thiet-lap-to-chuc/gio-lam-viec/")
     }
     const handleClickCancel = () => {
          setName("");
          setStatus(true);
          setIsDefault(true)
          navigate("/quan-tri/thiet-lap-to-chuc/gio-lam-viec/")
          statusChilrent(false)
     }
     const handleClickAdd = () => {
          if(!name) {
               alert("Mời bạn nhập lại thông tin");

          }else {
               dispatch(postTimerWork({
                    url: "timer",
                    object: {
                         name: name,
                         type: "Bussiness Hours",
                         status: status,
                         isDefault: isDefault
                    }
               }))
               statusChilrent(false)
          }

     }

     if(SelectIsLoading) return <>Loading...</>
     return <TimerWorkEditWrapper className="page__edit">
          <div className="title__tab text-secondary d-flex justify-content-between  bg-white p-3 fs-3">
               <div className="d-flex align-items-center"><span className="me-2" style={{cursor: "pointer"}} onClick={handleClickBack}>Giờ làm việc  </span> {' > '} <h3 className="ms-2">Chi tiết giờ làm việc</h3></div>
               <div className="btn-tab">
                    {id ? <ButtonComponent className="me-3"  name="Cập nhật" appearance="primary" color="green" onClick={handleClickUpdate}/> : <ButtonComponent className="me-3"  name="Lưu" appearance="primary" color="green" onClick={handleClickAdd}/>}
                    <ButtonComponent name="Hủy"  onClick={handleClickCancel}/>
               </div>
          </div>
<div className="form__page d-flex justify-content-around w-100 p-3 bg-white align-items-center">
               <InputComponent value={name} onChange={setName} placeholder="Nhập"  label="Name"  style={{width: "450px"}}/>
               <span>Hoạt động <Toggle className="ms-3" checked={status} onChange={setStatus}/></span>
               <span>Is Default <Toggle className="ms-3" checked={isDefault} onChange={setIsDefault}/></span>

          </div>
          <div className="edit__content bg-white mt-3" style={{height: "calc(100vh - 130px)", overflow: "auto"}}>
               <ul className="nav nav-tabs border-bottom border-secondary">
                    <li className="nav-item" role="presentation">
                         <button className="nav-link active " data-bs-toggle="tab" id="time-tab" type="button" data-bs-target="#time" aria-controls="time" role="tab" aria-selected="true" >
                              Thời gian làm việc
                         </button>
                    </li>
                    <li className="nav-item" role="presentation">
                         <button className="nav-link" data-bs-toggle="tab" id="day-tab" type="button" data-bs-target="#day" aria-controls="day" role="tab" aria-selected="true" >
                              Ngày nghỉ lễ
                         </button>
                    </li>
               </ul>
               <div className="tab-content"  id="myTabControl">
                    <div className="tab-pane fade show active" role="tabpanel" id="time" aria-labelledby="time-tab">
                         <Timer />
                    </div>
                    <div className="tab-pane fade show p-3" role="tabpanel" id="day" aria-labelledby="day-tab">
                          <Hodiday />
                    </div>
               </div>
          </div>
     </TimerWorkEditWrapper>
}
export default TimerWorkEdit;