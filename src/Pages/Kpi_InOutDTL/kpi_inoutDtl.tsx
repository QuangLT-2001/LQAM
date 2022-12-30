import InputComponent from "components/input"
import { KPIInOutDTLWrapper } from "./style"
import { IconButton, ButtonToolbar, InputGroup } from "rsuite";
import AddOutLineIcon from "@rsuite/icons/AddOutline"
import SearchIcon from "@rsuite/icons/Search"
import { useState, useEffect } from "react";
import ButtonComponent from "components/button";
import MoreIcon from '@rsuite/icons/More';
import KPIInOutList from "./kpi_inoutList";
import {data as dataKPI} from "./data"
import { removeVietnameseTones } from "utils/utils";
const KPIInOutDTL = () => {

     const [value, setValue] = useState<any>("")
     let [keyword, setKeyword] = useState<any>("");
     const [dataFilter, setDataFilter] = useState<any>([])
     useEffect(() => {
          setKeyword(value)
          const convertUpperCase = removeVietnameseTones(keyword.toUpperCase())
          let dataSearch = dataKPI.filter(item => removeVietnameseTones(item.name).toUpperCase().includes(convertUpperCase));
          setDataFilter(dataSearch)
     }, [value, keyword])
     const data = keyword ? dataFilter : dataKPI

     return <KPIInOutDTLWrapper>
           <div className="form__page d-flex justify-content-center align-items-center w-100 border bg-white pt-3 pb-3">
               <InputComponent
               value={value}
               onChange={setValue}
               placeholder="Tìm kiếm"
               icon={<InputGroup.Addon>
          <SearchIcon />
          </InputGroup.Addon>} style={{width: "450px", marginBottom: 10}}/>
               <ButtonComponent icon={<MoreIcon />} style={{marginBottom: 10}} className="ms-3"/>

          </div>
          <KPIInOutList data={data}/>
     </KPIInOutDTLWrapper>
}
export default KPIInOutDTL