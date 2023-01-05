import React, { useState, useEffect } from "react"
import { Pagination, Checkbox, Row, Col, Grid, IconButton, Stack, Divider, Dropdown, ColumnProps, TableProps, Panel, Container, Loader, Whisper, Popover, Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faChevronCircleDown, faPen, faTrash, faAngleDown } from "@fortawesome/free-solid-svg-icons"


import CheckBoxComponent from "../checkbox";
import InputNumerComponent from "../inputNumber";
import { Table } from "reactstrap";
import ButtonComponent from "components/button";
import { useAppDispatch } from "app/hooks";
import authReducer, { authActions, authSlice, deleteContract } from "../../features/auth/authSlice";
import { PaginationWrapper } from "../../Pages/LishMent/style"
import MoreIcon from "@rsuite/icons/More"
import _ from "lodash"
import { v4 as uuidv4 } from "uuid"

const TableStandard = (props) => {
     const { data, handleClickEdit, url } = props;
     let count = data.length
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
     const lstCheckBox = [
          {
               id: 1,
               name: "lishMent",
               value: "Tổ chức",
               width: 300
          },

          {
               id: 3,
               name: "description",
               value: "Mô tả",
               width: 500
          }
     ]
     const [hiddenList, setHiddenList] = useState(lstCheckBox);




     useEffect(() => {
          setStart(page * limit - limit)
          setEnd(page * limit)

     }, [page, limit])
     useEffect(() => {
          setLimit(10)
          setPage(1)
     }, [count])


     const compareByName = (obj1, obj2) => {
          if (obj1.typeContract > obj2.typeContract) return 1
          else if (obj1.typeContract < obj2.typeContract) return -1
          return 0
     }

     let sortData = [...data].sort(compareByName)
     const getData = () => {
          switch (sortBy) {
               case "DESC":
                    return sortData.slice(start, end)
               case "ASC":
                    return sortData.reverse().slice(start, end)
               case "":
                    return data.slice(start, end);
               default:
                    return data.slice(start, end)
          }
     }
     let dispatch = useAppDispatch();
     const handleClickDelete = (id) => {
          dispatch(deleteContract({
               id: id,
               url: url
          }))

          // dispatch(authSlice.actions.getLstContract(id))
     }
     const selectFilter = [{
          id: 1,
          name: "Sắp xếp tăng dần",
          keySelect: "ASC"
     }, {
          id: 2,
          name: "Sắp xếp giảm dần",
          keySelect: "DESC"
     }]
     const getCurrentSortBy = () => {
          const col = selectFilter.find(item => item.keySelect == sortBy)
          if (col) return col.name;
          return "---Default---"
     }
     // let sortData = data.reverse()
     let lstData = getData()

     const handleChangeInput = (v, c, t) => {
          const { name, value, checked, id } = t.target;
          if (checked) {
               setHiddenList([...hiddenList, { id: +id, name: name, value: value, width: 300 }]);
          } else {
               setHiddenList(_.differenceBy(hiddenList, [{ id: +id }], "id"));
          }
     }

     return <div>
          <div className="header__table d-flex justify-content-between p-3 border-bottom border-secondary">
               <div className="sort__by d-flex align-items-center">
                    <CheckBoxComponent />
                    Filter
                    <Dropdown renderToggle={(props, ref) => {
                         return (
                              <span {...props} >
                                   {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                   <span className="ms-3">{getCurrentSortBy()}   <FontAwesomeIcon icon={faAngleDown} /></span>

                              </span>
                         );
                    }} >

                         {

                              selectFilter.map(item => {

                                   return (<Dropdown.Item onClick={() => setSortBy(item.keySelect)} key={uuidv4()}
                                        style={{ width: 200, display: "flex", justifyContent: "space-between" }}
                                        className={sortBy == item.keySelect ? "text-success" : ""}
                                   >
                                        {item.name}
                                        {item.keySelect == sortBy ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                                   </Dropdown.Item>)

                              })
                         }






                    </Dropdown>
               </div>
               <div className="pagination__by d-flex align-items-center">
                    <span className="text-gray d-flex align-items-center me-3">Hiển thị:</span>
                    <Dropdown renderToggle={(props, ref) => {
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


          <div className="flex-grow-1 table-content bg-white">
               <table className="table" cellPadding={30}>
                    <thead>
                         <tr>
                              <th style={{ width: 200 }}></th>
                              <th style={{ width: 300 }}>Loại hợp đồng</th>
                              {hiddenList.map(item => <th style={{ width: item.width && item.width }} className="p-3" key={item.id}>{item.value}</th>)}

                              <th style={{ width: 200 }}>Trạng thái</th>
                              <th>
                                   <Dropdown placement="leftStart" renderToggle={(props, ref) => {
                                        return (
                                             <span {...props}>
                                                  <MoreIcon />
                                             </span>
                                        );
                                   }}>
                                        <div className="d-flex flex-wrap">
                                             {lstCheckBox.map(item => {
                                                  return <Dropdown.Item key={item.id}>
                                                       <CheckBoxComponent
                                                            id={item.id}
                                                            value={item.value}
                                                            name={item.name}
                                                            onChange={handleChangeInput}
                                                            checked={_.intersectionBy([item], hiddenList, "id").length
                                                                 ? true
                                                                 : false}


                                                       />{item.name}
                                                  </Dropdown.Item>
                                             })}
                                        </div>

                                   </Dropdown>
                              </th>
                         </tr>
                    </thead>
                    <tbody>
                         {lstData.length ? lstData.map(item => {
                              const hide = Object.keys(item).map(item => {
                                   return { name: item }
                              })
                              const showColumns = _.differenceBy(hiddenList, { hide }, "name")
                              return <tr key={item.id} >
                                   <td className="p-3">
                                        <CheckBoxComponent />
                                        <ButtonComponent
                                             onClick={() => handleClickEdit(item)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faPen} />}

                                        />
                                        <ButtonComponent
                                             onClick={() => handleClickDelete(item.id)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faTrash} />}

                                        />
                                   </td>
                                   <td className="p-3">{item.typeContract && item.typeContract}</td>
                                   {showColumns.map((s) => {
                                        return <td key={s.id}>
                                             {item[s.name]}
                                        </td>
                                   })}
                                   <td>
                                        {item.status ? <span className="status rounded bg-success text-white">
                                             Hoạt động
                                        </span> : <span className="status rounded bg-warning">Ngừng hoạt động</span>}
                                   </td>
                                   <td></td>
                              </tr>
                         }) : <tr>
                              <td colSpan={30}>
                                   Dữ liệu trống
                              </td>
                         </tr>}
                    </tbody>
               </table>
          </div>
     </div>
}

export default TableStandard;