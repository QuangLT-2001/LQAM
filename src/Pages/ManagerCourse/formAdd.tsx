import { useAppDispatch } from "app/hooks";
import { postManagerCourse } from "features/auth/authSlice";
import React, {useState, useEffect, useRef} from "react";
import {Modal,Button,Toggle} from "rsuite"
import { Form, Input, Schema, SelectPicker, Loader, Placeholder} from "rsuite";
type FormAddProps = {
     open?: boolean
     handleCloseOpen?:any,
     setOpen?: any,
     state?: any,
     setState?: any
}
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);
const FormAdd:React.FC<FormAddProps> = (props) => {
     const {open, handleCloseOpen, setOpen, state, setState} = props;
     const formRef:any = useRef();
     const dispatch = useAppDispatch();

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
     }

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
     const handleClickSave = () => {
          if(state.name && state.department) {
               dispatch(postManagerCourse({
                    url: "managerCourse",
                    object: state
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
                    contentCourse: []
               })
               setOpen(false)
          }else {
               alert("Mời bạn nhập lại thông tin!!!")
          }
     }
     return <>
 <Modal open={open} onClose={handleClickCancel}>
        <Modal.Header className="p-3">
          <Modal.Title>Thêm khóa đào tạo</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-3">

        <Form fluid onChange={setState} formValue={state} ref={formRef}>
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

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
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
                <Form.Group  title="status" controlId="name-9" className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "200px"}}>Sử dụng

     </Form.ControlLabel>
                <Form.Control  className="me-3 d-inline-block" placeholder="status" name="status"  accepter={Toggle}  defaultChecked/>
                Hoạt động
                </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="p-3">
        <Button  color="green" appearance="primary" onClick={handleClickSave}>
            Lưu
          </Button>

          <Button appearance="subtle" onClick={handleClickCancel}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
     </>
}
export default FormAdd;