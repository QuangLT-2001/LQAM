import ButtonComponent from "components/button";
import {Modal, Table} from "rsuite"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faClock} from "@fortawesome/free-regular-svg-icons"
const { Column, HeaderCell, Cell } = Table;
const ModalComponent:React.FC<any> = (props) => {
     const body  = (key:any):any => {
          console.log(key);

          switch(key) {
               case "lstEmployee":
                    return <>
                         <Table  data={props.data} style={{width: "100%"}}>
                              <Column width={70}>
                                   <HeaderCell>STT</HeaderCell>
                                   <Cell dataKey="ind"/>
                              </Column>

                              <Column width={150}>
                                   <HeaderCell>
                                        Mã nhân viên
                                   </HeaderCell>
                                   <Cell dataKey="employeeCode"/>
                              </Column>
                              <Column width={200}>
                                   <HeaderCell>Tên nhân viên</HeaderCell>
                                   <Cell style={{padding: 6}}>
                                        {(rowData:any) => {
                                             return <>
                                                  <img
                                                  width={30}
                                                  height={30}
                                                  className="me-3"
                                                  src={rowData.avatar}
                                                  alt=""
                                                  style={{borderRadius: "50%"}}
                                                  />
                                                  {rowData.name}
                                             </>
                                        }}
                                   </Cell>
                              </Column>
                              <Column width={180}>
                                   <HeaderCell>
                                        UserID
                                   </HeaderCell>
                                   <Cell dataKey="userID"/>
                              </Column>
                         </Table>
                    </>

               case "detailTimeInOut":
               return<>
                    {props.data && <div>
                         <div className="user d-flex">
                         <img src={props.data.avatar} width={30} height={30} style={{borderRadius: "50%"}} className="me-3" alt="" />
                         <div className="info__user">
                              <h6>{props.data.name}</h6>
                              <span>{props.data.employeeCode}</span>
                         </div>
                          </div>
                          <div className="time p-3 d-flex justify-content-between">
                              <p className="time-text m-0">
                                   <FontAwesomeIcon icon={faClock} className="me-3"/>
                                   {props.data.createAt}
                              </p>
                              <p className="time-work m-0">
                                   Thời gian làm việc
                                   <br />
                                   <b>
                                        {props.data.timeWork}
                                   </b>
                              </p>
                              <p className="time-plan m-0">
                                   Thời gian kế hoạch
                                   <br />
                                   <b>{props.data.timePlan}</b>
                              </p>
                          </div>
                          <div className="p-3 d-flex">
                              <span style={{
                                   width: 20,
                                   height: 20,
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   borderRadius: "50%",
                                   background: "green",
                                   color: "#fff"
                              }}>
                                   I
                              </span>
                              <span className="ps-3 pe-3">08 : 00</span>
                              <b>Headquater</b>
                          </div>

                          <div className="p-3 d-flex">
                              <span style={{
                                   width: 20,
                                   height: 20,
                                   minWidth: 20,
                                   minHeight: 20,
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   borderRadius: "50%",
                                   background: "#f35e89",
                                   color: "#fff",
                                   lineHeight: 1
                              }}>
                                   o
                              </span>
                              <span className="ps-3 pe-3" style={{minWidth: 73}}>08 : 00</span>
                              <b>{props.data.map}</b>
                          </div>

                          <div className="p-3 d-flex">
                              <span style={{
                                   width: 20,
                                   height: 20,
                                   minWidth: 20,
                                   minHeight: 20,
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   borderRadius: "50%",
                                   background: "#f35e89",
                                   color: "#fff",
                                   lineHeight: 1
                              }}>
                                   o
                              </span>
                              <span className="ps-3 pe-3" style={{minWidth: 73}}>15 : 30</span>
                              <b>{props.data.branch}</b>
                          </div>
               </div>}
               </>
               default:
          }
     }
     return <Modal open={props.open} onClose={props.close}>
          <Modal.Header className="p-3" style={{background: "rgb(230 230 230)"}}>
               <Modal.Title className="fw-bold">
                    {props.title}
               </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bordered border-bottom p-3">
               { body(props.keyModal)}
          </Modal.Body>
          <Modal.Footer className="p-3">
               <ButtonComponent
               name="Đóng"
               appearance="primary"
               color="green"
               onClick={props.close}
               />
          </Modal.Footer>
     </Modal>
}
export default ModalComponent;