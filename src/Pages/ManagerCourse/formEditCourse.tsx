import ButtonComponent from "components/button";
import { FormEditCourseWrapper } from "./style"
import {useParams, useNavigate} from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import { deleteCourse, getManagerCourseByCode, putManagerCourseAll, selectImageSlide, selectIsLoading, selectLstChapter, selectLstChapterBackup, selectLstFile, selectLstQuestion, selectManagerCourceDetail } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import moment from "moment";
import { Button, Form, Modal, SelectPicker, Table, Toggle , List} from "rsuite";
import { FormGroup } from "reactstrap";
import { Textarea } from "./managerCourseEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import FormAddContent from "./formAddContent";
import {v4 as uuidv4} from "uuid"
import { authSlice } from "features/auth/authSlice";
import RemindIcon from '@rsuite/icons/legacy/Remind';
import TrashIcon from '@rsuite/icons/Trash'
import InputComponent from "components/input";
const {
     Column,
     HeaderCell,
     Cell
} = Table
const FormEditCourse = () => {
     const [state, setState] = useState<any>({
          name: "",
          department: "",
          rank: "",
          description: "",
          type: "",
          checkFinish: "",
          status: true,
          lstStudent: [],
          endDate: "",
          contentCourse: [],
          createdAt: ""
     })
     const navigate = useNavigate()
     const [open, setOpen] = useState(false)
     const [openPop, setOpenPop] = useState(false)
     const {id} = useParams();
     const dispatch = useAppDispatch();
     const SelectManagerCourseDetail = useAppSelector(selectManagerCourceDetail)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const formRef:any = useRef();
     const SelectLstChapterBackup = useAppSelector(selectLstChapterBackup)
     let SelectLstQuestion = useAppSelector(selectLstQuestion)
     const [stateFormAdd, setStateFormAdd] = useState<any>({
          chapter: "",
          finish: "",
          desc: "",
          file: "",
          slideShow: [],
          infoContent: "",
     })
     const [question, setQuestion] = useState<any>([]);
     const [openQuestion, setOpenQuestion]  = useState<any>(false);
     let [data,setData] = React.useState<any>(SelectManagerCourseDetail.lstQuestion);
     const type = ["Ki???m tra ch????ng", "Ki???m tra k???t th??c"].map(item => ({label: item, value: item}))
     const chapter  = SelectLstChapterBackup.map((item:any) => ({label: item.chapter, value: item.chapter}))
     useEffect(() => {
          dispatch(getManagerCourseByCode({
               url: "managerCourse",
               id: id
          }))
     }, [])
     useEffect(() => {
          setState(SelectManagerCourseDetail)
          dispatch(authSlice.actions.addLstChapterBackup(SelectManagerCourseDetail.contentCourse))
          dispatch(authSlice.actions.addListQuestion(SelectManagerCourseDetail.lstQuestion))
     }, [id, SelectIsLoading])
     const lstDepartment = [
          {
               label: "Nh??n s???",
               value: "Nh??n s???"
          },
          {
               label: "Ch??m s??c kh??ch h??ng",
               value: "Ch??m s??c kh??ch h??ng"
          },
          {
               label: "K??? thu???t",
               value: "K??? thu???t"
          },
          {
               label: "Kinh doanh",
               value: "Kinh doanh"
          },
          {
               label: "K??? to??n",
               value: "K??? to??n"
          },
          {
               label: "Thi???t k???",
               value: "Thi???t k???"
          }
     ]
     const lstRank  = [
          {
               label: "E1",
               value: "E1"
          },
          {
               label: "M1",
               value: "M1"
          }
     ]
     const lstType = [
          {
               label: "????o t???o n???i b???",
               value: "????o t???o n???i b???"
          },
          {
               label: "Kh??a ????o t???o ngo??i",
               value: "Kh??a ????o t???a ngo??i"
          },
          {
               label: "????o t???o cao c???p",
               value: "????o t???o cao c???p"
          }
     ]

     const handleClickEdit = (data:any) => {
          setOpen(true)
          setStateFormAdd(data)
     }
     const handleClickCancel = () => {
          dispatch(authSlice.actions.updateFileSource())
          setOpen(false)
          setStateFormAdd({
               chapter: "",
               finish: "",
               desc: "",
               file: "",
               slideShow: [],
               infoContent: "",
          })

     }
     const handleClickAdd = () => {
          setOpen(true)
     }

     const handleClickDeleteChapter = (id:any) => {
          dispatch(authSlice.actions.deleteChapterBackup({
               id: id
          }))

     }
     const handleClickUpdate = () => {
          dispatch(putManagerCourseAll({
               url: "managerCourse",
               id: id,
               object: {
                    ...state,
                    contentCourse: SelectLstChapterBackup,
                    lstQuestion: [...data, ...question]
               }
          }))
          setState({
               name: "",
               department: "",
               rank: "",
               description: "",
               type: "",
               checkFinish: "",
               status: true,
               lstStudent: [],
               endDate: "",
               contentCourse: [],
               createdAt: ""
          })
          navigate("/dao-tao/quan-ly-khoa-dao-tao/")
     }
     const handleClickDeleteCourse = (id: any) => {
          dispatch(deleteCourse({
               url: "managerCourse",
               id: id
          }))
          setState({
               name: "",
               department: "",
               rank: "",
               description: "",
               type: "",
               checkFinish: "",
               status: true,
               lstStudent: [],
               endDate: "",
               contentCourse: [],
               createdAt: ""
          })

          setStateFormAdd({
               chapter: "",
               finish: "",
               desc: "",
               file: "",
               slideShow: [],
               infoContent: "",
          })
          navigate("/dao-tao/quan-ly-khoa-dao-tao/")

     }
     const handleClickCancelEdit = () => {
          setOpenPop(true)
     }
     const handleClose  = () => {
          setOpenPop(false)
     }
     const handleOK = () => {
          setState(SelectManagerCourseDetail)
          dispatch(authSlice.actions.addLstChapterBackup(SelectManagerCourseDetail.contentCourse))
          setOpenPop(false)
     }
     const handleOpenQuestion = () => {
          setOpenQuestion(true)
     }
     const handleChangeType = (event:any) => {
     }
     const handleClickAddQuestion = () => {
          setQuestion([...question, {
               nameQuestion: "",
               nameAnswer: "",
               id: uuidv4()
          }])

     }
     const handleSortEnd = ({ oldIndex, newIndex }: any) =>
     setQuestion((prvData:any) => {
       let moveData = prvData.splice(oldIndex, 1);
       let newData = [...prvData];
       newData.splice(newIndex, 0, moveData[0]);
       return newData;
     });


     const handleClickDeleteQuestion = (id: any) => {
          let dataQuestion = data.filter((item:any) => item.id !== id);
          setData(dataQuestion)
     }

     if(SelectIsLoading) return <>Loading...</>
     return <FormEditCourseWrapper className="page__edit">
          <Modal className="p-3" backdrop="static" role="alertdialog" open={openPop} onClose={handleClose} size="xs">
        <Modal.Body className="p-3">
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          B???n c?? mu???n h???y kh??ng ???
        </Modal.Body>
        <Modal.Footer className="p-3">
          <Button onClick={handleOK} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

          {open && <FormAddContent
          open={open}
          setOpen={setOpen}
          state={stateFormAdd}
          setState={setStateFormAdd}
          handleClickCancel={handleClickCancel}
          />}

           <div className="header__tab p-3 d-flex justify-content-between align-items-center bg-white">
               <div className="title__tab text-secondary fs-5 d-flex align-items-center">
                    <span>????o t???o {">"}</span>
                    <h5 className="name__tab">
                         Ch???nh s???a kh??a ????o t???o
                    </h5>
               </div>
               <div className="btn__tab d-flex">
                    <ButtonComponent name="C???p nh???t" appearance="primary" color="green" className="me-3" onClick={handleClickUpdate}/>

                    <ButtonComponent name="X??a" className="me-3" onClick={() => handleClickDeleteCourse(id)}/>
                    <ButtonComponent name="C??u h???i ki???m tra" onClick={handleOpenQuestion} className="me-3"/>
                    <ButtonComponent name="H???y" onClick={handleClickCancelEdit}/>
               </div>
          </div>


         {openQuestion &&  <>
               <div className="frm-select d-flex">
                    <div className="form-group w-50 d-flex align-items-center p-3">
                         <span className="me-3">Lo???i: </span>
                         <SelectPicker onChange={handleChangeType} data={type} style={{flexGrow: 1}} placeholder="Ch???n"/>
                    </div>
                    <div className="form-group w-50 d-flex align-items-center p-3">
                         <span className="me-3">Ch????ng: </span>
                         <SelectPicker data={chapter} placeholder="Ch???n" style={{flexGrow: 1}}/>
                    </div>
               </div>
               <div className="frm-edit d-flex justify-content-end p-3">
                    <ButtonComponent name="Th??m c??u h???i" color="green" appearance="primary" onClick={handleClickAddQuestion}/>

                    <ButtonComponent name="Import Excel" className="me-3 ms-3"  appearance="subtle" />


                    <ButtonComponent name="Export Excel"  appearance="subtle" />
               </div>

               <div className="frm-question-content p-3">
                    <List style={{boxShadow: "none"}} sortable onSort={handleSortEnd}>
                    {data.length ? data.map(({ nameQuestion, nameAnswer, id }:any, index:any) => (
                              <List.Item disabled  style={{boxShadow: "none"}} className="p-3 d-flex align-items-start" key={index} index={index}>
                                   <ButtonComponent
                                        icon={<TrashIcon />}
                                        onClick={() => handleClickDeleteQuestion(id)}
                                   />
                                   <span className="pt-2 pb-2 pe-3 ps-3 d-inline-block">
                                   {index + 1}
                                   </span>
                                   <div className="question-content w-100">
                                        <InputComponent className="form-control" value={nameQuestion ? nameQuestion : "Nh???p c??u h???i..."}/>
                                        <br />
                                        <InputComponent className="form-control" value={nameAnswer ? nameAnswer : "Nh???p c??u tr??? l???i m???u..."}/>
                                   </div>
                              </List.Item>
                    )) : ""}

               {question.length ? question.map(({ nameQuestion, nameAnswer }:any, index:any) => (
                              <List.Item   style={{boxShadow: "none"}} className="p-3 d-flex align-items-start" key={index} index={index}>
                                   <ButtonComponent
                                        icon={<TrashIcon />}
                                   />
                                   <span className="pt-2 pb-2 pe-3 ps-3 d-inline-block">
                                   {index + 1 + SelectLstQuestion.length}
                                   </span>
                                   <div className="question-content w-100">
                                        <InputComponent className="form-control" value={nameQuestion ? nameQuestion : "Nh???p c??u h???i..."}/>
                                        <br />
                                        <InputComponent className="form-control" value={nameAnswer ? nameAnswer : "Nh???p c??u tr??? l???i m???u..."}/>
                                   </div>
                              </List.Item>
                    )) : ""}
                    </List>
               </div>
          </>}


        {!openQuestion &&  <>
         <div className="desc__course d-flex p-3 bg-white mt-2 flex-wrap flex-md-row flex-column justify-content-between">
               <Form fluid onChange={setState} formValue={state} ref={formRef} className="d-flex bg-white mt-2 mb-2 flex-wrap flex-md-row flex-column justify-content-between w-100">
               <div className="left pe-3" style={{width: "45%"}}>
                    <FormGroup  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "100px"}}>T??n kh??a
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="name" style={{flexGrow: 1, width: "100%"}}/>
                    </FormGroup>
                    <FormGroup  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "100px"}}>Ph??ng ban
                    </Form.ControlLabel>
                    <Form.Control placeholder="Ch???n" name="department" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstDepartment}/>
                    </FormGroup>

                    <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "100px"}}>Rank
                    </Form.ControlLabel>
                    <Form.Control placeholder="Ch???n" name="rank" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstRank}/>
                </Form.Group >

                <Form.Group  className="d-flex w-100 align-items-start">
                    <Form.ControlLabel style={{minWidth: "100px"}}>M?? t???

                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="description" style={{flexGrow: 1, width: "100%"}} accepter={Textarea}/>
                </Form.Group >

                <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "100px"}}>Lo???i
                    </Form.ControlLabel>
                    <Form.Control placeholder="Ch???n" name="type" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstType}/>
                </Form.Group >

                <Form.Group  title="status"  className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "100px"}}>Tr???ng th??i

               </Form.ControlLabel>
                <Form.Control  className="me-3 d-inline-block" placeholder="status" name="status"  accepter={Toggle} checked={state.status}/>
                Ho???t ?????ng
                </Form.Group>
               </div>

               <div className="right ps-3" style={{width: "45%"}}>
               <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Ki???m tra ho??n th??nh
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="checkFinish" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Th???i gian t???o
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="createdAt" style={{flexGrow: 1, width: "100%"}}  disabled/>
                </Form.Group >

                <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>C???p nh???t
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="createdAt" style={{flexGrow: 1, width: "100%"}}  disabled/>
                </Form.Group >
                <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>T???ng h???c vi??n
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" value={90} name="createdAt" style={{flexGrow: 1, width: "100%"}}  disabled/>
                </Form.Group >

                <Form.Group  className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>T???ng ho??n th??nh
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" value={6} name="createdAt" style={{flexGrow: 1, width: "100%"}}  disabled/>
                </Form.Group >

                <div className="d-flex align-items-center fs-6 mb-2">
                         <label style={{minWidth: 200}}>
                             ??ang h???c

                         </label>
                         <p className="text-decoration-underline text-primary ">
                              84
                         </p>
                    </div>
               </div>
               </Form>
          </div>

          <div className="course__content p-3 bg-white">
               <div className="header__page pt-3 pb-3 d-flex justify-content-between">
                    <h3 className="text-uppercase fs-5">
                         n???i dung kh??a h???c
                    </h3>
                    <ButtonComponent name="Th??m n???i dung" onClick={handleClickAdd}/>

               </div>

               <Table data={SelectLstChapterBackup} className="bg-white" style={{width: "100%"}} autoHeight={true}>SelectManagerCourseDetail.contentCourse
                    <Column align="center"  width={170}>
                         <HeaderCell className="fw-bold fs-6">{null}</HeaderCell>
                         <Cell style={{padding: 6}}  className="hover-underline">
                              {rowData => (
                                   <>
                                   <ButtonComponent
                                   style={{background: "transparent !important"}}
                                   className="me-3"
                                   name={<FontAwesomeIcon
                                   icon={faPencil}/>}
                                   onClick={() => handleClickEdit(rowData)}
                                   />
                                   <ButtonComponent style={{background: "transparent !important"}}   name={<FontAwesomeIcon icon={faTrashCan}/> }
                                   onClick={() => handleClickDeleteChapter(rowData.id)}
                                   />

                                   </>
                              )}
                         </Cell>
                    </Column>
                    <Column width={300}>
                                   <HeaderCell className="fw-bold fs-6">
                                        Ch????ng
                                   </HeaderCell>
                                   <Cell dataKey="chapter"/>
                    </Column>

                    <Column width={250}>
                                   <HeaderCell className="fw-bold fs-6">
                                        M?? t??? t??m t???t
                                   </HeaderCell>
                                   <Cell dataKey="desc"/>
                    </Column>

                    <Column width={150}>
                                   <HeaderCell className="fw-bold fs-6">
                                        T???ng h???c vi??n
                                   </HeaderCell>
                                   <Cell>100</Cell>
                    </Column>

                    <Column width={150}>
                                   <HeaderCell className="fw-bold fs-6">
                                        ??ang h???c
                                   </HeaderCell>
                                   <Cell>100</Cell>
                    </Column>
                    <Column width={200}>
                         <HeaderCell className="fw-bold fs-6">Chi ti???t</HeaderCell>
                         <Cell dataKey="file"/>
                    </Column>

               </Table>

          </div>
         </>}


     </FormEditCourseWrapper>
}
export default FormEditCourse;