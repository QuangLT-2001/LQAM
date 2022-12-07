
import { deleteTimerWork, getTimerWorkByCode, ITimerState } from "features/auth/authSlice";
import { TimerWorkListContainer } from "./style";
import React, {useState, useEffect} from "react"
import { Pagination, Checkbox, Row, Col, Grid, IconButton, Stack, Divider, Dropdown, ColumnProps, TableProps, Panel, Container, Loader, Whisper, Popover, Button, Toggle } from "rsuite";
import CheckBoxComponent from "../../components/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faChevronCircleDown, faPen, faTrash, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import {v4 as uuidv4} from "uuid"
import {PaginationWrapper} from "../LishMent/style"
import ButtonComponent from "components/button";
import { useAppDispatch } from "app/hooks";
import {useNavigate} from "react-router-dom"
type TimerWorkListProps = {
     timer: ITimerState[],
     statusChildrent: any
}
const TimerWorkList:React.FC<TimerWorkListProps> = (props) => {
     const {timer, statusChildrent}  = props;
     let count = timer.length
     const [loading, setLoading] = React.useState(false);
     const [limit, setLimit] = React.useState(10);
     const [page, setPage] = React.useState(1);
     const [sortBy, setSortBy] = React.useState('');

     const sortLimitValues = [10, 20, 30, 50, 100];
     const [sortColumn, setSortColumn] = React.useState();
     const [sortType, setSortType] = React.useState();
     const [start, setStart] = useState(0);
     const [end, setEnd] = useState(limit);
     const [sortDir, setSortDir] = useState('DESC');
     const dispatch = useAppDispatch()
     const navigate = useNavigate()
     useEffect(() => {
          setStart(page * limit - limit)
          setEnd(page * limit)

     }, [page, limit])
     useEffect(() => {
          setLimit(10)
          setPage(1)
     }, [count])
     const compareByName = (obj1:any, obj2:any) => {
          if (obj1.typeContract > obj2.typeContract) return 1
          else if (obj1.typeContract < obj2.typeContract) return -1
          return 0
     }

     let sortData = [...timer].sort(compareByName)
     const getData = () => {
          switch (sortBy) {
               case "DESC":
                    return sortData.slice(start, end)
               case "ASC":
                    return sortData.reverse().slice(start, end)
               case "":
                    return timer.slice(start, end);
               default:
                    return timer.slice(start, end)
          }
     }
     const selectFilter = [{
          id: 1,
          name: "ASC",
     }, {
          id: 2,
          name: "DESC"
     }]
     const getCurrentSortBy = () => {
          const col = selectFilter.find(item => item.name == sortBy)
          if (col) return col.name;
          return "Tên tổ chức"
     }
     // let sortData = data.reverse()
     let lstData = getData()
     const lstHeaderTable = [
          {
               id: 1,
               name: "",
               width: 100
          },
          {
               id:2,
               name: "ID",
               width: 160
          },
          {
               id: 3,
               name: "Name",
               width: 500
          },
          {
               id: 4,
               name: "Type",
               width: 300
          },
          {
               id: 5,
               name: "Status",
               width: 210
          },
          {
               id: 6,
               name: "isDefault",
               width: 210
          }
     ]
     const handleClickDelete = (id:any) => {
          dispatch(deleteTimerWork({
               url: "timer",
               id: id
          }))
     }
     const handleClickToDetail = (id:any) => {

          navigate(`/quan-tri/thiet-lap-to-chuc/gio-lam-viec/${id}`)

     }
     return <TimerWorkListContainer className="timer-container">
              <div className="header__table d-flex justify-content-between p-3 border-bottom border-secondary">
               <div className="sort__by d-flex align-items-center">
                    <Dropdown renderToggle={(props:any, ref:any) => {
                         return (
                              <span {...props} >
                                   {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                   <span className="ms-3">{getCurrentSortBy()}   <FontAwesomeIcon icon={faAngleDown} /></span>

                              </span>
                         );
                    }} >

                         {

                              selectFilter.map(item => {

                                   return (<Dropdown.Item onClick={() => setSortBy(item.name)} key={uuidv4()}
                                        style={{ width: 200, display: "flex", justifyContent: "space-between" }}
                                        className={sortBy == item.name ? "text-green" : ""}
                                   >
                                        {item.name}
                                        {item.name == sortBy ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                                   </Dropdown.Item>)

                              })
                         }






                    </Dropdown>
               </div>
               <div className="pagination__by d-flex align-items-center">
                    <span className="text-gray d-flex align-items-center me-3">Hiển thị:</span>
                    <Dropdown renderToggle={(props:any, ref:any) => {
                         return (
                              <span {...props}>

                                   <span className=" border bg-white" style={{
                                        padding: ".2rem", display: "block", borderRadius: "5px"
                                   }}><span>{limit}  </span>
                                        <span><FontAwesomeIcon icon={faAngleDown} className="ms-2" /></span>
                                   </span>

                              </span>
                         );
                    }} >

                         {

                              sortLimitValues.map(n => {

                                   return (<Dropdown.Item onClick={() => {
                                        setPage(1);
                                        setLimit(n);

                                   }} key={uuidv4()}
                                        style={{ width: 200, display: "flex", justifyContent: "space-between" }}
                                        className={limit == n ? "text-green" : ""}
                                   >
                                        {n} {limit == n ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                                   </Dropdown.Item>);

                              })
                         }






                    </Dropdown>
                    <PaginationWrapper className="pagination-wrapper" pages={Math.ceil(count / limit)} page={page}>
                         <Pagination
                              prev
                              next
                              // first
                              // last
                              ellipsis
                              boundaryLinks
                              maxButtons={3}
                              size="xs"
                              //layout={['total', '-', 'limit', '|', 'pager', 'skip']}


                              total={10}
                              pages={Math.ceil(count / limit)}
                              limitOptions={[10, 20, 25, 50, 100]}
                              limit={limit}
                              activePage={page}
                              onChangePage={setPage}
                              onChangeLimit={(val) => { setLimit(val); setPage(1); }}

                         />
                    </PaginationWrapper>

               </div>

          </div>
          <div className="table__lst " style={{height: "calc(100vh - 200px)", overflow: "auto"}}>
                         <table className="table">
                              <thead>
                                   <tr>
                                        {lstHeaderTable.map(item => {
                                             return <th key={item.id} style={{width: item.width}}>{item.name}</th>
                                        })}
                                   </tr>
                              </thead>
                              <tbody>
                                        {lstData.length ? lstData.map(item => {
                                             return <tr key={item.id}>
                                                  <td>
                                                  <ButtonComponent
                                             onClick={() => handleClickToDetail(item.id)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faPen} />}

                                        />
                                        <ButtonComponent
                                             onClick={() => handleClickDelete(item.id)}
                                             appearance="ghost"
                                             color="red"
                                             style={{border: "none"}}
                                             icon={<FontAwesomeIcon icon={faTrash} />}

                                        />
                                                  </td>
                                                  <td>{item.id}</td>
                                                  <td>{item.name}</td>
                                                  <td>{item.type}</td>
                                                  <td>
                                                  {item.status ? <span className="status rounded bg-success text-white">
                                             Hoạt động
                                        </span> : <span className="status rounded bg-warning">Ngừng hoạt động</span>}
                                                  </td>
                                                  <td>
                                                  <Toggle checked={item.isDefault}/>
                                                  </td>
                                             </tr>
                                        }) : <tr>
                                                  <td className="text-center" colSpan={6}>Dữ liệu trống</td>
                                             </tr>}
                              </tbody>
                         </table>
                    </div>
     </TimerWorkListContainer>
}
export default TimerWorkList;