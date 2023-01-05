import React, {useState, useRef} from "react"
import { FormWrapper } from "./style"
import {Modal,Button,Toggle} from "rsuite"
import InputComponent from "../../components/input"
import { Form, Input, Schema, SelectPicker, Loader, Placeholder} from "rsuite";
import {postContract, putContract} from "../../features/auth/authSlice"
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
const FormComponent:React.FC<FormProps> = (props) => {
     const {open, handleCloseOpen, setOpen, state, setState,url} = props

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
                    <Form.ControlLabel style={{minWidth: "200px"}}>Loại hợp đồng
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Loại hợp đồng" name="typeContract" style={{flexGrow: 1, width: "100%"}}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Mô tả

                    </Form.ControlLabel>
                    <Form.Control placeholder="Mô tả" name="description" rows={2} style={{flexGrow: 1, width: "100%"}} accepter={Textarea}/>
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
               dispatch(postContract({
                    state: state,
                    url: url
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
          if(state.lishMent && state.typeContract) {
               dispatch(putContract({
                    state: state,
                    url: url
               }))
               setOpen(false)
               setState({
                    ...state,
                    lishMent: "",
                    status: false,
                    description: "",
                    typeContract: "",
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
               description: "",
               typeContract: "",
               id: ""
          })
          setOpen(false)

     }
     return <FormWrapper classNames="frm">
          <Modal open={open} onClose={handleClickCancel}>
        <Modal.Header className="p-3">
          <Modal.Title>{state.id ? "Chỉnh sửa loại hợp đồng" : "Thêm loại hợp đồng"}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-3">

          {body()}
        </Modal.Body>
        <Modal.Footer className="p-3">
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
export default FormComponent