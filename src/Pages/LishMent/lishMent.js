import React, { useEffect, useState } from "react"
import InputComponent from "components/input";
import FormComponent from "../Form/form";
import { IconButton, ButtonToolbar, InputGroup } from "rsuite";
import AddOutLineIcon from "@rsuite/icons/AddOutline"
import SearchIcon from "@rsuite/icons/Search"
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getLishMent, selectLishMent } from "features/auth/authSlice";
import LishList from "./lishList";
import { useNavigate } from "react-router-dom"
import { removeVietnameseTones } from "utils/utils";
const LishMent = () => {
     const [value, setValue] = useState("")
     const dispatch = useAppDispatch()
     const SelectLishMent = useAppSelector(selectLishMent)
     const [dataFilter, setDataFilter] = useState([])
     let [keyword, setKeyword] = useState("");

     useEffect(() => {
          dispatch(getLishMent("lishMent"))
     }, [])
     useEffect(() => {
          setKeyword(value)
          const convertUpperCase = removeVietnameseTones(keyword.toUpperCase())
          let data = SelectLishMent.filter(item => removeVietnameseTones(item.nameLishMent).toUpperCase().includes(convertUpperCase));
          setDataFilter(data)
     }, [keyword, value])
     let data = keyword ? dataFilter : SelectLishMent
     const navigate = useNavigate()
     const handleClickToTTTC = () => {
          navigate(`/quan-tri/thiet-lap-to-chuc/thong-tin-to-chuc`)
     }
     return <div className="page__lisnment">
          <div className="form__page d-flex justify-content-center w-100 border bg-white pt-3 pb-3">
               <InputComponent value={value} onChange={setValue} placeholder="Tìm kiếm" icon={<InputGroup.Addon>
          <SearchIcon />
     </InputGroup.Addon>} style={{width: "450px", marginBottom: 10}}/>
               {/* <ButtonToolbar>
                    <IconButton icon={AddOutLineIcon} placement="left">Thêm mới</IconButton>
               </ButtonToolbar> */}
               <ButtonToolbar className="ms-3" onClick={handleClickToTTTC}>
                    <IconButton icon={<AddOutLineIcon />} placement="left">Thêm mới</IconButton>
               </ButtonToolbar>
          </div>
          <LishList data={data} />
     </div>
}
export default LishMent