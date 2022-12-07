import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonComponent from "components/button";
import InputComponent from "components/input";
import { deleteHoliday, getListHoliday, postHoliday, selectHoliday, selectIsLoading } from "features/auth/authSlice";
import React, { useEffect, useState } from "react"
import { SelectPicker } from "rsuite";
import HolidayItem from "./holidayItem";
const Hodiday = () => {
     const months = [
          {
               label: 1,
               value: 1
          },
          {
               label: 2,
               value: 2
          },
          {
               label: 3,
               value: 3
          },
          {
               label: 4,
               value: 4
          },
          {
               label: 5,
               value: 5
          },
          {
               label: 6,
               value: 6
          },
          {
               label: 7,
               value: 7
          },
          {
               label: 8,
               value: 8
          },
          {
               label: 9,
               value: 9
          },
          {
               label: 10,
               value: 10
          },
          {
               label: 11,
               value: 11
          },
          {
               label: 12,
               value: 12
          }
     ]
     const days = [
          {
               label: 1,
               value: 1
          },
          {
               label: 2,
               value: 2
          },
          {
               label: 3,
               value: 3
          },
          {
               label: 4,
               value: 4
          },
          {
               label: 5,
               value: 5
          },
          {
               label: 6,
               value: 6
          },
          {
               label: 7,
               value: 7
          },
          {
               label: 8,
               value: 8
          },
          {
               label: 9,
               value: 9
          },
          {
               label: 10,
               value: 10
          },
          {
               label: 11,
               value: 11
          },
          {
               label: 12,
               value: 12
          },
          {
               label: 13,
               value: 13
          },
          {
               label: 14,
               value: 14
          },
          {
               label: 15,
               value: 15
          },
          {
               label: 16,
               value: 16
          },
          {
               label: 17,
               value: 17
          },
          {
               label: 18,
               value: 18
          },
          {
               label:19,
               value: 19
          },
          {
               label: 20,
               value: 20
          },
          {
               label: 21,
               value: 21
          },
          {
               label: 22,
               value: 22
          },
          {
               label: 23,
               value: 23
          },
          {
               label: 24,
               value: 24
          },
          {
               label: 25,
               value: 25
          },
          {
               label: 26,
               value: 26
          },
          {
               label: 27,
               value: 27
          },
          {
               label: 28,
               value: 28
          },
          {
               label: 29,
               value: 29
          },
          {
               label: 30,
               value: 30
          }
     ]
     const dispatch = useAppDispatch()
     const SelectHoliday = useAppSelector(selectHoliday)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const [day,setDay]  = useState(0)
     const [month, setMonth] = useState(0)
     const [name, setName] = useState("")
     useEffect(() => {
          dispatch(getListHoliday({
               url: "holiday"
          }))
     }, [])
     const handleChangeInputDay = (value:any) => {
          setDay(value)
     }
     const handleChangeInputMonth = (value: any) => {
          setMonth(value);
     }
     const handleClickPostHoliday = () => {
          if(!day || !month || !name ) {
               alert("Mời bạn nhập lại thông tin!!!")
          }else {
               dispatch(postHoliday({
                    url: "holiday",
                    object: {
                         day: day,
                         month: month,
                         name:name
                    }
               }))
          }
     }

     const handleClickDelete = (id: string|number) => {
          dispatch(deleteHoliday({
               url: "holiday",
               id: id
          }))
     }
     if(SelectIsLoading) return <>Loading...</>
     return <>
          <h3 className="text-uppercase">Holidays</h3>
          <div className="form__edit d-flex">
               <SelectPicker data={months} placeholder="Tháng" style={{width: 124}} onChange={handleChangeInputMonth} />
               <SelectPicker onChange={handleChangeInputDay} data={days} placeholder="Ngày" style={{width: 124}} className="ms-3 me-3"/>
               <InputComponent placeholder="Tên ngày nghỉ lễ" style={{width: 440, marginRight: 16}} value={name} onChange={setName}/>
               <ButtonComponent onClick={handleClickPostHoliday} name="Thêm" />
          </div>
          <div className="table__list mt-3">
                    <table className="w-100">
                         <thead>
                              <tr>
                                   <th style={{width: 100}}></th>
                                   <th style={{width: 200}}>
                                        Ngày - Tháng
                                   </th>
                                   <th>Tên ngày nghỉ lễ</th>
                              </tr>
                         </thead>
                         <tbody>
                              {SelectHoliday.map((item:any) => <HolidayItem holidayItem={item} key={item.id}
                              handleClickDelete={handleClickDelete}
                              />)}
                         </tbody>
                    </table>
          </div>
     </>
}
export default  Hodiday;