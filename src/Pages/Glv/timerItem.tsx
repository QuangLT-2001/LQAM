import CheckBoxComponent from "components/checkbox";
import { Slider, RangeSlider, Row, Col, InputGroup, InputNumber } from "rsuite";
import React, {useEffect, useState} from "react"
import PlusIcon from "@rsuite/icons/Plus"
import ButtonComponent from "components/button";
type TTimerItemProps = {
     timerItem: {
          id?:string|number;
          name?: string;
     },
     statusAll?:boolean
}

const TimerItem:React.FC<TTimerItemProps> = (props) => {
     const [status, setStatus] = useState<boolean| undefined>(true)
     const {timerItem} = props;
     const [value, setValue] = useState([0, 0]);
  let [timeStart, setTimeStart] = useState("");
  let [timeEnd, setTimeEnd] = useState("");
  const convertTime = (time:any) => {
     let currentTime = Number(time);
     let hour = Math.floor(currentTime / 60);
     let minute = currentTime - hour * 60;
     let cvHour = hour < 10 ? `0${hour}` : `${hour}`;
     let cvMinute = minute < 10 ? `0${minute}` : `${minute}`;
     return `${cvHour}:${cvMinute}`;
   };
   useEffect(() => {
     setTimeStart(convertTime(value[0]));
     setTimeEnd(convertTime(value[1]));

   }, [value, props.statusAll]);
   const handleChangeCheckBox = () => {
     setStatus(!status);
   }

     return <tr className="mb-3">
          <td>
               <CheckBoxComponent  checked={props.statusAll || status && true} onChange={handleChangeCheckBox}/>
                {timerItem.name}
                </td>
          <td>
          <span>
              {timeStart}{" "}
              {+timeStart.slice(0, timeStart.lastIndexOf(":")) > 12
                ? "PM"
                : "AM"}
            </span>
            &nbsp;
            -
            &nbsp;
            <span>
              {timeEnd}{" "}
              {+timeEnd.slice(0, timeEnd.lastIndexOf(":")) > 12 ? "PM" : "AM"}
            </span>
          </td>
          <td className="d-flex align-items-center">
          <RangeSlider
            max={720}
            progress
            onChange={(value:any) => {
              setValue(value);
            }}
            className="flex-grow-1 me-3 mb-3"
            disabled={props.statusAll || status ? false : true}
          />
          <ButtonComponent disabled={(props.statusAll || status) ? false :true } className="mb-3" icon={<PlusIcon />}/>
          </td>
     </tr>
}
export default TimerItem;