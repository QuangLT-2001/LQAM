import { useAppDispatch, useAppSelector } from "app/hooks";
import authReducer, { authActions, authSlice, deleteContract } from "../features/auth/authSlice";
import { selectContract, selectIsLoading } from "../features/auth/authSlice";
import React, { useEffect, useState } from "react";
import contractApi from "services/contractApi";
import deleteApi from "./../services/contractApi"
import { ContractWrapper } from "./style";
import InputComponent from "components/input";
import CheckBoxComponent from "components/checkbox";
import InputNumerComponent from "components/inputNumber";
import { Table } from "reactstrap";
import ButtonComponent from "components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import FormComponent from "./Form/form";
import { authSlice as ContractSlice } from "../features/auth/authSlice";
import { getAll as fetData } from "../services/helper"
import { getContract } from "../features/auth/authSlice";
import TableStandard from "./Table/tableStandard";
import { IconButton, ButtonToolbar, InputGroup } from "rsuite";
import AddOutLineIcon from "@rsuite/icons/AddOutline"
import SearchIcon from "@rsuite/icons/Search"
import { removeVietnameseTones } from "utils/utils";
const Contract = () => {
     let [lstContract, setLstContract] = useState([])
     const [dataFilter, setDataFilter] = useState([])
     let [keyword, setKeyword] = useState("");
     const [value, setValue] = useState("")
     const [open, setOpen] = useState(false)
     const dispatch = useAppDispatch();

     const SelectContract = useAppSelector(selectContract)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const [state, setState] = useState({
          lishMent: "",
          typeContract: "",
          status: 0,
          description: "",
          id: ""
     })
     useEffect(() => {
          dispatch(getContract("contract"))
     }, [])
     useEffect(() => {
          setKeyword(value)
          const convertUpperCase = removeVietnameseTones(keyword.toUpperCase())
          let data = SelectContract.filter(item => removeVietnameseTones(item.typeContract).toUpperCase().includes(convertUpperCase));
          setDataFilter(data)
     }, [keyword, value])
     let data = keyword ? dataFilter : SelectContract
     const handleCloseOpen = () => {
          setOpen(state => !state)
     }
     const handleClickEdit = obj => {
          setOpen(true)
          setState(obj)
     }
     if (SelectIsLoading) return <>Loading...</>
     return <ContractWrapper className="main__body flex-grow-1">

          <FormComponent url="contract" state={state} setState={setState} open={open} handleCloseOpen={handleCloseOpen} setOpen={setOpen} />
          <div className="form__page d-flex justify-content-center w-100 p-3 bg-white">
               <InputComponent value={value} onChange={setValue} placeholder="Tìm kiếm" icon={<InputGroup.Addon>
                    <SearchIcon />
               </InputGroup.Addon>} style={{width: "450px", marginBottom: 10}}/>
               {/* <ButtonToolbar>
                    <IconButton icon={AddOutLineIcon} placement="left">Thêm mới</IconButton>
               </ButtonToolbar> */}
               <ButtonToolbar className="ms-3" onClick={handleCloseOpen}>
                    <IconButton icon={<AddOutLineIcon />} placement="left">Thêm mới</IconButton>
               </ButtonToolbar>
          </div>
          <div className="table">

               <TableStandard url="contract" data={data} handleClickEdit={handleClickEdit} />
          </div>
     </ContractWrapper>
}
export default Contract;