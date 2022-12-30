import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "Pages/KPI Dashboard/modal";
import { PaginationWrapper } from "Pages/LishMent/style";
import React, {useState, useEffect} from "react"
import { Dropdown,Pagination, Table, Progress } from "rsuite";
import {v4 as uuidv4} from "uuid";
const KPIInOutList:React.FC<any> = (props) => {
     let count = props.data.length
    const [limit, setLimit] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [sortBy, setSortBy] = React.useState('');
    const sortLimitValues = [5,10,15,100];
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(limit);
    const [sortDir, setSortDir] = useState('DESC');
     const [detail, setDetail] = useState<any>(null)
     const [open, setOpen] = useState<any>(false)
    useEffect(() => {
     setStart(page*limit - limit)
     setEnd(page*limit)
    }, [page, limit])
    useEffect(() => {
        setLimit(5)
        setPage(1)
       }, [count])


     const selectFilter = [{
          id: 1,
          name: "2022-12-29",
     }, {
          id: 2,
          name: "2022-12-30"
     }]


     const compareByName = (obj1:any, obj2:any) => {
          if(obj1.name > obj2.name) return 1
          else if (obj1.name < obj2.name) return -1
          return 0
     }
     let sortData = [...props.data].sort(compareByName)
     const getCurrentSortBy = () => {
          const col = selectFilter.find(item => item.name == sortBy)
          if(col) return col.name;
          return "2022-02-20"
     }

     const getData = () => {
          switch(sortBy) {
               case "DESC":
                    return sortData.slice(start,end)
               case "ASC":
                    return sortData.reverse().slice(start,end)
               default:
               return props.data.slice(start,end);
          }
     }

         let lstData = getData()


     const handleClickOpenModal = (data:any) => {
          setOpen(true)
          setDetail(data)
     }

     const handleCloseModal = () => {
          setOpen(false);
     }



     return <>
          <ModalComponent
                title="Chi tiết thời gian in/out nhân viên"
                open={open}
                close={handleCloseModal}
                keyModal="detailTimeInOut"
                data={detail}
          />
           <div className="header__table d-flex justify-content-between border-bottom p-3 border-secondary text-dark">
                <div className="sort__by d-flex align-items-center">
          Ngày
          <Dropdown renderToggle={(props: any, ref: any) => {
                            return (
                                <span {...props} >
                                    {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                    <span className="ms-3">{getCurrentSortBy()}   <FontAwesomeIcon icon={faAngleDown}/></span>

                                </span>
                            );
                        }} >

                            {

                                selectFilter.map(item => {

                                    return (<Dropdown.Item onClick={() => setSortBy(item.name)}  key={uuidv4()}
                                        style={{ width: 200 , display: "flex", justifyContent: "space-between" }}
                                        className={sortBy == item.name ? "text-green" : ""}
                                    >
                                        {item.name}
                                        {item.name == sortBy? <FontAwesomeIcon icon={faCheck}/>: <></>}
                                    </Dropdown.Item>)

                                })
                            }






                        </Dropdown>
                </div>

               <div className="pagination__by d-flex align-items-center">
          <span className="text-gray d-flex align-items-center me-3">Hiển thị:</span>
                        <Dropdown renderToggle={(props: any, ref: any) => {
                            return (
                                <span {...props}>
                                    {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                    <span className=" border" style={{padding: ".2rem", display: "block", borderRadius: "5px"
                                }}><span>{limit}  </span>
                                    <span><FontAwesomeIcon icon={faAngleDown} className="ms-2"/></span>
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
                                        style={{ width: 200 , display: "flex", justifyContent: "space-between" }}
                                        className={limit == n ? "text-green" : ""}
                                    >
                                        {n} {limit == n ? <FontAwesomeIcon icon={faCheck}/>: <></>}
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
                            limitOptions={[5,10,15,100]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={(val) => { setLimit(val); setPage(1); }}

                        />
                        </PaginationWrapper>
               </div>
          </div>
          <div className="table__content">
               <Table data={lstData} height={400}>
                            <Table.Column width={250} >
                              <Table.HeaderCell className="fw-bold">
                                   Nhân viên
                              </Table.HeaderCell>
                              <Table.Cell style={{padding: 0}}>
                                   {(rowData:any) => {
                                        return <div className="d-flex align-items-center">
                                             <img width={30} height={30} className="me-3" style={{borderRadius: "50%"}} src={rowData.avatar} alt="" />
                                             <div className="info__user">
                                                  <h6 style={{cursor: "pointer"}} onClick={() => handleClickOpenModal(rowData)}>{rowData.name}</h6>
                                                  <span>{rowData.employeeCode}</span>
                                             </div>
                                        </div>
                                   }}
                              </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                              <Table.HeaderCell className="fw-bold">Nhóm nhân viên</Table.HeaderCell>
                              <Table.Cell dataKey="groupEmployee"/>
                            </Table.Column>
                            <Table.Column width={150}>
                              <Table.HeaderCell className="fw-bold">Giờ check in/out</Table.HeaderCell>
                              <Table.Cell>
                                   {rowData => {
                                        return <>
                                             {rowData.timeCheckIn}/{rowData.timeCheckOut}
                                        </>
                                   }}
                              </Table.Cell>
                            </Table.Column>
                            <Table.Column width={300}>
                              <Table.HeaderCell className="fw-bold">
                                   Thời gian làm việc/Thời gian kế hoạch
                              </Table.HeaderCell >
                              <Table.Cell style={{padding: 0}}>
                                   {rowData => {
                                        return <>
                                             <p>
                                             <span style={{color: "#04AA6D"}}>
                                                  {rowData.timeWork}
                                             </span>
                                             <span>/ {rowData.timePlan}</span>
                                             </p>
                                             <Progress.Line style={{paddingLeft: 0}} percent={rowData.percent} status="success" showInfo={false} />
                                        </>
                                   }}
                              </Table.Cell>
                            </Table.Column>
                            <Table.Column width={150}>
                              <Table.HeaderCell className="fw-bold">
                                   Địa điểm cuối
                              </Table.HeaderCell>
                              <Table.Cell dataKey="branch" />
                            </Table.Column>

                            <Table.Column flexGrow={1} width={150}>
                              <Table.HeaderCell className="fw-bold">
                                   Flag nghỉ phép
                              </Table.HeaderCell>
                              <Table.Cell dataKey="flag" />
                            </Table.Column>
               </Table>
          </div>
     </>
}
export default KPIInOutList;