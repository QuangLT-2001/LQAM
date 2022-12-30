import ButtonComponent from 'components/button';
import MoreIcon from '@rsuite/icons/More';
import React, { useState } from 'react';
import { Form, SelectPicker, DatePicker, InputGroup, Input } from 'rsuite';

const Textarea = React.forwardRef((props: any, ref: any) => (
  <Input {...props} as="textarea" ref={ref} />
));

const RegisterKpiInOut = () => {
  const [state, setState] = useState<any>({
    name: '',
    numberPaper: '',
    typePaper: '',
    tel: '',
    email: '',
    company: '',
    partner: '',
    timeWorkStart: '',
    timeWorkEnd: '',
    note: '',
    status: 0,
  });

  const formRef: any = React.useRef();

  const data = [
    {
      id: 1,
      label: 'HTML',
      value: 'HTML',
    },
    {
      id: 2,
      label: 'CSS',
      value: 'CSS',
    },
    {
      id: 3,
      label: 'Javascript',
      value: 'Javascript',
    },
    {
      id: 4,
      label: 'ReactJS',
      value: 'ReactJS',
    },
    {
      id: 5,
      label: 'C#',
      value: 'C#',
    },
    {
      id: 6,
      label: 'Docker',
      value: 'Docker',
    },
  ];

  const typeActive = (type: any) => {
    switch (type) {
      case 0:
        return 'Chờ duyệt';
      case 1:
        return 'Đã duyệt';
      case 2:
        return 'Đã check-in';
      case 3:
        return 'Đã check-out';
      case 4:
        return 'Đã từ chối';
      default:
    }
  };

  return (
    <>
      <div className="header__tab p-3 d-flex justify-content-between align-items-center bg-white">
        <div className="title__tab text-secondary fs-5 d-flex align-items-center">
          <span>Quản lý in/out cho khách {'>'}</span>
          <h5 className="name__tab">Đăng ký in/out cho khách</h5>
        </div>
        <div className="btn__tab d-flex">
          <ButtonComponent
            name="Lưu và duyệt"
            color="green"
            appearance="primary"
            className="me-3"
            onClick={null}
          />
          <ButtonComponent name="Lưu" className="me-3" onClick={null} />

          <ButtonComponent icon={<MoreIcon />} />
        </div>
      </div>
      <div className="body__tab">
        <div className="form__tab">
          <Form
            fluid
            formValue={state}
            className="d-flex justify-content-between p-3"
            onChange={setState}
          >
            <div className="form-left" style={{ width: '45%' }}>
              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '100px' }}>
                  Tên khách
                  <span className="text-danger">*</span>
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Nhập"
                  name="name"
                  style={{ flexGrow: 1, width: '100%' }}
                />
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <div className="d-flex w-100">
                  <Form.ControlLabel style={{ minWidth: '100px' }}>
                    Số giấy tờ
                    <span className="text-danger">*</span>
                  </Form.ControlLabel>
                  <Form.Control
                    placeholder="Nhập"
                    name="numberPaper"
                    style={{ flexGrow: 1, width: '100%' }}
                    className="me-3"
                  />
                  <span className="ms-3 me-3"></span>
                  <Form.Control
                    placeholder="Chọn loại giấy tờ"
                    name="typePaper"
                    style={{ flexGrow: 1, width: '100%' }}
                    accepter={SelectPicker}
                    data={data}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '100px' }}>Email</Form.ControlLabel>
                <Form.Control
                  placeholder="Nhập"
                  name="email"
                  style={{ flexGrow: 1, width: '100%' }}
                />
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '100px' }}>Điện thoại</Form.ControlLabel>
                <Form.Control
                  placeholder="Nhập"
                  name="tel"
                  style={{ flexGrow: 1, width: '100%' }}
                />
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '100px' }}>Công ty</Form.ControlLabel>
                <Form.Control
                  placeholder="Nhập"
                  name="company"
                  style={{ flexGrow: 1, width: '100%' }}
                />
              </Form.Group>
            </div>

            <div className="form-right " style={{ width: '45%' }}>
              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '130px' }}>Đối tác của</Form.ControlLabel>
                <Form.Control
                  placeholder="Chọn"
                  name="partner"
                  style={{ flexGrow: 1, width: '100%' }}
                  accepter={SelectPicker}
                  data={data}
                />
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <div className="d-flex w-100">
                  <Form.ControlLabel style={{ minWidth: '130px' }}>
                    Thời gian làm việc
                    <span className="text-danger">*</span>
                  </Form.ControlLabel>
                  <InputGroup>
                    <DatePicker
                      format="yyyy-MM-dd HH:mm:ss"
                      block
                      appearance="subtle"
                      style={{ width: '100%' }}
                    />
                  </InputGroup>

                  <span className="ms-3 me-3"></span>
                  <InputGroup>
                    <DatePicker
                      format="yyyy-MM-dd HH:mm:ss"
                      block
                      appearance="subtle"
                      style={{ width: '100%' }}
                    />
                  </InputGroup>
                </div>
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '130px' }}>Ghi chú</Form.ControlLabel>
                <Form.Control
                  placeholder="Nhập"
                  name="note"
                  style={{ flexGrow: 1, width: '100%' }}
                  accepter={Textarea}
                />
              </Form.Group>

              <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                <Form.ControlLabel style={{ minWidth: '130px' }}>Trạng thái</Form.ControlLabel>
                <ButtonComponent name={typeActive(state.status)} className="w-100 text-start" />
              </Form.Group>
            </div>
          </Form>
        </div>

        <div className="lst-relate">
          <h4 className="text-uppercase">
            Danh sách người làm việc cùng: <span style={{ color: '#04AA6D' }}>0</span>
          </h4>
        </div>
      </div>
    </>
  );
};
export default RegisterKpiInOut;
