import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonComponent from "components/button";
import { getLishMentByCode, postLishMent, putLishMent } from "features/auth/authSlice";
import React, {useState, useEffect} from "react"
import {Form, SelectPicker, Input, Toggle} from "rsuite"
import {useParams, useNavigate} from "react-router-dom"
import { selectLishMentDetail } from "features/auth/authSlice";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);
const TTTC = () => {
     const params = useParams();
     const navigate = useNavigate()
     const {id} = params;
     let dispatch = useAppDispatch()

     const [state, setState] = useState<any>({
          orgId: "",
          nameLishMent: "",
          MST: "",
          flagActive: false,
          nameAbb: "",
          typeLishMent: "",
          address: "",
          userContact: "",
          emailContact:"",
          telContact: ""
     })
     let SelectLishMentDetail = useAppSelector(selectLishMentDetail);

     useEffect(():any => {
          if(id) {
               dispatch(getLishMentByCode({
                    id: id,
                    url: "lishMent"
               }))
               setState(SelectLishMentDetail)
          }
     } , [id])



     const formRef:any = React.useRef();
     const data= [{
          label: "ORG1001",
          value: "ORG1001"
     },
     {
          label: "ORG1002",
          value: "ORG1002"
     },
     {
          label: "ORG1003",
          value: "ORG1003"
     },
]
const dataType = [
     {
          id: 1,
          label: "HTML",
          value: "HTML"
     },
     {
          id: 2,
          label: "CSS",
          value: "CSS"
     },
     {
          id: 3,
          label: "Javascript",
          value: "Javascript"
     },
     {
          id: 4,
          label: "ReactJS",
          value: "ReactJS"
     },
     {
          id: 5,
          label: "C#",
          value: "C#"
     },
     {
          id: 6,
          label: "Docker",
          value: "Docker"
     }
]
const handleClickSave = ():any => {
     if( state.orgId && state.MST && state.nameLishMent && state.userContact && state.emailContact && state.telContact && state.nameAbb) {
          dispatch(postLishMent({
               state: state,
               url: "lishMent"
          }))
          setState({
               ...state,
               orgId: "",
          nameLishMent: "",
          MST: "",
          flagActive: false,
          nameAbb: "",
          typeLishMent: "",
          address: "",
          userContact: "",
          emailContact:"",
          telContact: ""
          })
     }else {
          alert("Mời bạn nhập đầy đủ thông tin")
     }
}
const handleClickCancel = () => {
     setState({
          ...state,
          orgId: "",
     nameLishMent: "",
     MST: "",
     flagActive: false,
     nameAbb: "",
     typeLishMent: "",
     address: "",
     userContact: "",
     emailContact:"",
     telContact: ""
     })
}
const handleClickUpdate = ():any => {
     if(state.orgId && state.MST && state.nameLishMent && state.userContact && state.emailContact && state.telContact && state.nameAbb) {
          dispatch(putLishMent({
               state: state,
               url: "lishMent"
          }))

          navigate("/quan-tri/thiet-lap-to-chuc/danh-sach-to-chuc")

     }else {
          alert("Mời bạn nhập đầy đủ thông tin")
     }
}


     return <div>
          <div className="header__form d-flex justify-content-end p-3 bg-white mb-2 mt-2">
              {id ?  <ButtonComponent className="me-3" appearance="primary" color="green" name="Cập nhật" onClick={handleClickUpdate}/> : <ButtonComponent className="me-3" appearance="primary" color="green" name="Lưu" onClick={handleClickSave}/>}
               <ButtonComponent name="Hủy" onClick={handleClickCancel}/>
          </div>
          <Form  fluid onChange={setState} formValue={state} ref={formRef} className="d-flex bg-white p-3" style={{height: "100vh"}}>
          <div className="frm-left me-5 w-50">
          <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>OrgID
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="orgId" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={data}/>
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tên Tổ Chức
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="nameLishMent" style={{flexGrow: 1, width: "100%"}} cols={10} accepter={Textarea}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tên viết tắt
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="nameAbb" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>MST
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="MST" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Loại tổ chức

                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="typeLishMent" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={dataType}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Địa chỉ

                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="address" row={2} style={{flexGrow: 1, width: "100%"}} accepter={Textarea}/>
                </Form.Group >
          </div>
<div className="frm-right ms-5 w-50">

<Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Người liên hệ
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="userContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Email liên hệ
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="emailContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Điện thoại liên hệ
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="telContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Thời gian tạo
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Người  tạo
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Thời gian cập nhật
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Người cập nhật
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group  title="status"  controlId="name-9" className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "200px"}}>Trạng thái

</Form.ControlLabel>
                <Form.Control  placeholder="Mô tả" name="flagActive" className="me-3 d-inline-block"  accepter={Toggle} />
                Hoạt động
                </Form.Group>
</div>



          </Form>
     </div>
}
export default TTTC;