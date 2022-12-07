import React, {useState, useEffect} from "react"
import { TimerWorkWrapper } from "./style"
import {ButtonToolbar,IconButton} from "rsuite"
import AddOutLineIcon from "@rsuite/icons/AddOutline"
import InputComponent from "components/input"
import TimerWorkList from "./timerWorkList"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { getListTimerWork, selectIsLoading, selectListTimer } from "features/auth/authSlice"
import TimerWorkEdit from "./timerWorkEdit"
import { removeVietnameseTones } from "utils/utils"
const TimerWork = () => {
     const [value, setValue] = useState("")
     const [dataFilter, setDataFilter] = useState([])
     let [keyword, setKeyword] = useState("");
     const dispatch  = useAppDispatch();
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const SelectListTimer = useAppSelector(selectListTimer)
     const [status, setStatus] = useState(false);
     useEffect(() => {
          dispatch(getListTimerWork({
               url: "timer"
          }))
     }, [])
     useEffect(() => {
          setKeyword(value)
          const convertUpperCase = removeVietnameseTones(keyword.toUpperCase())
          let data = SelectListTimer.filter((item:any) => removeVietnameseTones(item.name).toUpperCase().includes(convertUpperCase));
          setDataFilter(data)

     }, [keyword, value])
     let data = keyword ? dataFilter : SelectListTimer
     const handleClickAdd = () => {
          setStatus(true)
     }
     if(SelectIsLoading) return <>Loading...</>
     if(status) return <TimerWorkEdit statusChilrent={setStatus}/>
     return <TimerWorkWrapper className="__page__timer flex-grow-1">
              <div className="form__page d-flex justify-content-center w-100 p-3 bg-white">
               <InputComponent value={value} onChange={setValue} placeholder="Tìm kiếm" style={{width: "450px", marginBottom: 10}}/>
               {/* <ButtonToolbar>
                    <IconButton icon={AddOutLineIcon} placement="left">Thêm mới</IconButton>
               </ButtonToolbar> */}
               <ButtonToolbar className="ms-3" onClick={handleClickAdd}>
                    <IconButton icon={<AddOutLineIcon />} placement="left">Thêm mới</IconButton>
               </ButtonToolbar>
          </div>
          <div className="table bg-white">
               <TimerWorkList statusChildrent={setStatus} timer={data}/>
          </div>
     </TimerWorkWrapper>
}
export default TimerWork;