import React, {useState, useRef} from "react"
import { FormWrapper } from "../Form/style"
import {Modal,Button,Toggle} from "rsuite"
import InputComponent from "../../components/input"
import { Form, Input, Schema, SelectPicker, Loader, Placeholder} from "rsuite";
import {postContract, postMapWork, putContract, putMapWork} from "../../features/auth/authSlice"
import { useAppDispatch } from "app/hooks";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);
type FormProps = {
     open?: boolean,
     handleCloseOpen?:any,
     setOpen?: any,
     state?: any,
     setState?: any,
     url: string
}
const FormMapWork:React.FC<FormProps> = (props) => {
     const {open, handleCloseOpen, setOpen, state, setState,url} = props
     const [status, setStatus] = useState(true)

     const data = [
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


     const formRef: any = React.useRef();
const body = () => {
     return <>
          <Form fluid onChange={setState} formValue={state} ref={formRef}>
          <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tổ chức
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Chọn" name="lishMent" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={data}/>
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tên địa điểm
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="name" style={{flexGrow: 1, width: "100%"}}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Tọa độ<span className="text-danger">*</span>
                    <br />
                    <span>(Lat, Long)</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nhập" name="coordinates" style={{flexGrow: 1, width: "100%"}}/>
                </Form.Group >
                <Form.Group  title="status" controlId="name-9" className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "200px"}}>Trạng thái

</Form.ControlLabel>
                <Form.Control  className="me-3 d-inline-block" placeholder="Mô tả" name="status"  accepter={Toggle} />
                Hoạt động
                </Form.Group>
          </Form>
     </>
}
const dispatch = useAppDispatch()
     const handleClickSave = ():any => {
          if(state.lishMent && state.typeContract) {
               dispatch(postMapWork({
                    state: state,
                    url: "mapWork"
               }))
               setOpen(false)
               setState({
                    ...state,
                    lishMent: "",
                    status: false,
                    description: "",
                    typeContract: ""
               })
          }else {
               alert("Mời bạn nhập đầy đủ thông tin")
          }
     }
     const handleClickUpdate = ():any => {
          if(state.name && state.lishMent && state.coordinates) {
               dispatch(putMapWork({
                    obj: state,
                    url: "mapWork",
                    id: state.id
               }))
               setOpen(false)
               setState({
                    ...state,
                    lishMent: "",
                    status: false,
                    coordinates: "",
                    name: "",
                    id: ""
               })
          }else {
               alert("Mời bạn nhập đầy đủ thông tin")
          }
     }
     const handleClickCancel = () => {
          setState({
               ...state,
               lishMent: "",
               status: false,
               coordinates: "",
               name: "",
               id: ""
          })
          setOpen(false)

     }
     return <FormWrapper classNames="frm">
          <Modal open={open} onClose={handleClickCancel}>
        <Modal.Header>
          <Modal.Title>{state.id ? "Chỉnh sửa địa điểm" : "Thêm địa điểm"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {body()}
        </Modal.Body>
        <Modal.Footer>
        {state.id ? <Button  onClick={handleClickUpdate} color="green" appearance="primary">
            Cập nhật
          </Button> : <Button onClick={handleClickSave} color="green" appearance="primary">
            Lưu
          </Button>}

          <Button onClick={handleClickCancel} appearance="subtle">
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
     </FormWrapper>
}
export default FormMapWork;