import React, { useState } from "react";
import { Toggle } from "rsuite";
import TimerItem from "./timerItem";
const Timer = () => {
     const [statusAll, setStatusAll] = useState(false);
     const lstTimer = [
          {
               id: 1,
               name: "0AM"
          },
          {
               id: 2,
               name: "1AM"
          },
          {
               id: 3,
               name: "2AM"
          },
          {
               id: 4,
               name: "3AM"
          },
          {
               id: 5,
               name: "4AM"
          },
          {
               id: 6,
               name: "5AM"
          },
          {
               id: 7,
               name: "6AM"
          },
          {
               id: 8,
               name: "7AM"
          },
          {
               id: 9,
               name: "8AM"
          },
          {
               id: 10,
               name: "9AM"
          },
          {
               id: 11,
               name: "10AM"
          },
          {
               id: 12,
               name: "11AM"
          },
          {
               id: 13,
               name: "12AM"
          }
     ]
     const lstDay = [
          {
               id: 1,
               name: "Thứ 2"
          },
          {
               id: 2,
               name: "Thứ 3"
          },
          {
               id: 3,
               name: "Thứ 4"
          },
          {
               id: 4,
               name: "Thứ 5"
          },
          {
               id: 5,
               name: "Thứ 6"
          },
          {
               id: 6,
               name: "Thứ 7"
          },
          {
               id: 8,
               name: "Chủ nhật"
          }
     ]
     return <>
          <div className="p-3">
               <Toggle checked={statusAll} onChange={setStatusAll} className="me-3"/>
                24 giờ x 7 ngày
          </div>
          <div className="table__timer p-3">
               <table className="w-100">
                    <thead>
                       <tr>
                       <th>Office Hours</th>
                         <th></th>
                         <th className="d-flex">
                              {lstTimer.map(item => <span
                              className="pt-3 pb-3"
                              style={{width: "calc(100% / 13)", display: "block"}} key={item.id}>{item.name}</span>)}
                         </th>
                       </tr>
                    </thead>
                    <tbody>
                       {lstDay.map(item => <TimerItem statusAll={statusAll} key={item.id} timerItem={item}/>)}
                    </tbody>
               </table>
          </div>
     </>
}
export default Timer;