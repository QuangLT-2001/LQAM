import { IHolidayState } from "features/auth/authSlice"
import React from "react"
import TrashIcon from "@rsuite/icons/Trash"
import ButtonComponent from "components/button"
type HolidayItemProps = {
     holidayItem: IHolidayState,
     handleClickDelete?: any
}

const HolidayItem:React.FC<HolidayItemProps> = (props) => {
     const {holidayItem}  = props;
     return <tr>
          <td>
               <ButtonComponent onClick={() => props.handleClickDelete(holidayItem.id)} className="mb-3" name={<TrashIcon />} color="red" appearance="ghost" style={{border: "none"}}/>
          </td>
          <td>
               <span className="text-danger">
                    {holidayItem.day} - {holidayItem.month}
               </span>
          </td>
          <td>
               {holidayItem.name}
          </td>
     </tr>
}
export default HolidayItem;