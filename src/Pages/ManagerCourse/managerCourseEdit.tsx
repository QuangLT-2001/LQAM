import { useAppDispatch, useAppSelector } from "app/hooks";
import {useParams, useNavigate} from "react-router-dom"
import React, {useState, useEffect, useRef, memo} from "react"
import { getManagerCourseByCode, putManagerCourse, selectIsLoading, selectLstChapter, selectManagerCourceDetail } from "features/auth/authSlice";
import { FormManagerCourseEditWrapper } from "./style";
import ButtonComponent from "components/button";
import {Form, InputGroup, Toggle, Button, SelectPicker, Input} from "rsuite"
import FormAddContent from "./formAddContent.js";
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileWord } from "@fortawesome/free-solid-svg-icons"
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);
const ManagerCourseEdit = () => {
     const {id} = useParams();
     const dispatch:any = useAppDispatch();
     const SelectIsLoading = useAppSelector(selectIsLoading);

     const SelectLstChapter = useAppSelector(selectLstChapter)
     const formRef:any = useRef();
     let [state, setState] = useState<any>({
          name: "",
          department: "",
          rank: "",
          description: "",
          type: "",
          checkFinish: "",
          status: true,
          lstStudent: [],
          endDate: "",
          contentCourse: []
     })
     const [multipleFile, setMultipleFile] = useState([])
     const [lstContentSource, setLstContentSource] = useState<any>([])
     const [stateFormAdd, setStateFormAdd] = useState<any>({
          chapter: "",
          finish: "",
          desc: "",
          file: "",
          slideShow: [],
          infoContent: "",
          id: uuidv4()
     })

     const navigate = useNavigate()
     const [open, setOpen] = useState(false);
     const lstDepartment = [
          {
               label: "Nhân sự",
               value: "Nhân sự"
          },
          {
               label: "Chăm sóc khách hàng",
               value: "Chăm sóc khách hàng"
          },
          {
               label: "Kỹ thuật",
               value: "Kỹ thuật"
          },
          {
               label: "Kinh doanh",
               value: "Kinh doanh"
          },
          {
               label: "Kế toán",
               value: "Kế toán"
          },
          {
               label: "Thiết kế",
               value: "Thiết kế"
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
               label: "Đào tạo nội bộ",
               value: "Đào tạo nội bộ"
          },
          {
               label: "Khóa đào tạo ngoài",
               value: "Khóa đào tọa ngoài"
          },
          {
               label: "Đào tạo cao cấp",
               value: "Đào tạo cao cấp"
          }
     ]
     const SelectManagerCourseDetail = useAppSelector(selectManagerCourceDetail);
     useEffect(() => {
          dispatch(getManagerCourseByCode({
               url: "managerCourse",
               id: id
          }))
     }, [])
     useEffect(() => {
          setState(SelectManagerCourseDetail);
     }, [id, SelectIsLoading])
     const lstHeaderTable = [
         {
          id: 1,
          name: "Chương"
         },
         {
          id: 2,
          name: "Mô tả tóm tắt"
         },
         {
          id: 3,
          name: "Chi tiết"
         }
     ]

     const handleClickOpen = () => {
          setOpen(true)
     }

     const handleClickSave = () => {
          if(state.name && state.department) {
               dispatch(putManagerCourse({
                    url: "managerCourse",
                    id: id,
                    object: {
                        ...state,
                        contentCourse: SelectManagerCourseDetail.contentCourse
                    }
               }))
               navigate("/dao-tao/quan-ly-khoa-dao-tao/")

          }else {
               alert("Mời bạn nhập thông tin!!!")
          }
     }

     const handleClickCancel = () => {
          setOpen(false)
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
               contentCourse: []
          })
          setStateFormAdd({
               chapter: "",
               finish: "",
               desc: "",
               file: "",
               slideShow: [],
               infoContent: "",
               id: uuidv4()
          })
     }
     const handleClickToDT = () => {
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
               contentCourse: []
          })
          setStateFormAdd({
               chapter: "",
               finish: "",
               desc: "",
               file: "",
               slideShow: [],
               infoContent: "",
               id: uuidv4()
          })
          navigate("/dao-tao/quan-ly-khoa-dao-tao/")
     }

     if(SelectIsLoading) return <>Loading ...</>
     return <FormManagerCourseEditWrapper className="form-edit">
          {open && <FormAddContent
           multipleFile={multipleFile}
           setMultipleFile={setMultipleFile}
           handleClickCancel={handleClickCancel} lstContentSource={lstContentSource} setLstContentSource={setLstContentSource} open={open} setOpen={setOpen} state={stateFormAdd} setState={setStateFormAdd}/>}
          <div className="header-page p-3 bg-white d-flex justify-content-between">
               <div className="d-flex align-items-center fs-4">
                    <span className="text-secondary">
                         Đào tạo {">"}
                    </span>
                    <h3>Thêm mới khóa đào tạo</h3>

               </div>
               <div className="btn__frm">
                    <ButtonComponent name="Lưu" className="me-3" appearance="primary" color="green" onClick={handleClickSave}/>
                    <ButtonComponent name="Hủy" onClick={handleClickToDT} />
               </div>
          </div>
          <div className="frm__content mt-2 mb-2">
          <Form fluid onChange={setState} formValue={state} ref={formRef} className="d-flex w-100 p-3 bg-white">
          <div className="frm__left w-50 me-5">
          <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tên khóa
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="name" style={{flexGrow: 1, width: "100%"}}/>
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Phòng ban
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="department" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstDepartment}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Rank
                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="rank" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstRank}/>
                </Form.Group >

                <Form.Group  title="status" controlId="name-9" className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "200px"}}>Sử dụng

     </Form.ControlLabel>
                <Form.Control  className="me-3 d-inline-block" placeholder="status" name="status"  accepter={Toggle}  defaultChecked/>
                Hoạt động
                </Form.Group>
          </div>

                <div className="frm__right w-50 ms-5">
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-start">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Mô tả

                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="description" style={{flexGrow: 1, width: "100%"}} accepter={Textarea}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Loại
                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="type" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={lstType}/>
                </Form.Group >


                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Kiểm tra hoàn thành
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="checkFinish" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                </div>

          </Form>
          </div>
          <div className="course__content p-3 bg-white">
               <div className="header__page pt-3 pb-3 d-flex justify-content-between">
                    <h3 className="text-uppercase fs-4">
                         nội dung khóa học
                    </h3>
                    <ButtonComponent name="Thêm nội dung" onClick={handleClickOpen}/>

               </div>
               <table className="table w-100">
                         <thead>
                          <tr>
                              {lstHeaderTable.map(item => <th style={{width: "calc(100% / 3)"}}  key={item.id}>{item.name}</th>)}
                          </tr>
                         </thead>
                              {
                              SelectManagerCourseDetail.contentCourse.length ? <tbody>
                                   {SelectManagerCourseDetail.contentCourse.map((item:any) => {
                                   return <tr key={item.id}>
                                   <td>{item.chapter}</td>
                                   <td>{item.desc}</td>
                                   <td><span className="text-primary me-2">
                                        <FontAwesomeIcon icon={faFileWord}/>
                                        </span> {item.file}</td>
                              </tr>
                              })}
                              </tbody> : ""
                              }

                    </table>
          </div>
     </FormManagerCourseEditWrapper>
}
export default memo(ManagerCourseEdit);