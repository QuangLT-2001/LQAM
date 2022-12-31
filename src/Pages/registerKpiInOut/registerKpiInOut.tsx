import ButtonComponent from 'components/button';
import MoreIcon from '@rsuite/icons/More';
import React, { useState, useEffect } from 'react';
import { Form, SelectPicker, DatePicker, InputGroup, Input, Table } from 'rsuite';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deleteKpi,
  getLstKpi,
  postKpi,
  selectIsLoading,
  selectLstKpi,
} from 'features/auth/authSlice';
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
const { Column, HeaderCell, Cell } = Table;
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
    note: '',
    status: 0,
  });
  const [valueDateStart, setValueDateStart] = useState<any>(null);
  const [valueDateEnd, setValueDateEnd] = useState<any>(null);

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
  const dispatch = useAppDispatch();
  const SelectLstKpi = useAppSelector(selectLstKpi);
  const SelectIsLoading = useAppSelector(selectIsLoading);
  useEffect(() => {
    dispatch(
      getLstKpi({
        url: 'kpi',
      })
    );
  }, []);

  const handleClickSave = () => {
    if (state.name && valueDateStart && valueDateEnd) {
      dispatch(
        postKpi({
          url: 'kpi',
          obj: {
            ...state,
            timeWorkStart: valueDateStart,
            timeWorkEnd: valueDateEnd,
          },
        })
      );
      setState({
        name: '',
        numberPaper: '',
        typePaper: '',
        tel: '',
        email: '',
        company: '',
        partner: '',
        note: '',
        status: 0,
      });
      setValueDateStart(null);
      setValueDateEnd(null);
    } else {
      alert('Mời bạn nhập đầy đủ thông tin!!!');
    }
  };

  const handleClickDelete = (id: any) => {
    dispatch(
      deleteKpi({
        url: 'kpi',
        id: id,
      })
    );
  };
  if (SelectIsLoading) return <>Loading...</>;
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
          <ButtonComponent name="Lưu" className="me-3" onClick={handleClickSave} />

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
                  <DatePicker
                    format="yyyy-MM-dd HH:mm:ss"
                    style={{ width: 260 }}
                    locale={{
                      sunday: 'Su',
                      monday: 'Mo',
                      tuesday: 'Tu',
                      wednesday: 'We',
                      thursday: 'Th',
                      friday: 'Fr',
                      saturday: 'Sa',
                      ok: 'OK',
                      today: 'Today',
                      yesterday: 'Yesterday',
                      hours: 'Hours',
                      minutes: 'Minutes',
                      seconds: 'Seconds',
                    }}
                    value={valueDateStart}
                    name="timeWorkStart"
                    onChange={setValueDateStart}
                  />

                  <span className="ms-3 me-3"></span>
                  <DatePicker
                    format="yyyy-MM-dd HH:mm:ss"
                    style={{ width: 260 }}
                    locale={{
                      sunday: 'Su',
                      monday: 'Mo',
                      tuesday: 'Tu',
                      wednesday: 'We',
                      thursday: 'Th',
                      friday: 'Fr',
                      saturday: 'Sa',
                      ok: 'OK',
                      today: 'Today',
                      yesterday: 'Yesterday',
                      hours: 'Hours',
                      minutes: 'Minutes',
                      seconds: 'Seconds',
                    }}
                    placement="bottomEnd"
                    value={valueDateEnd}
                    name="timeWorkEnd"
                    onChange={setValueDateEnd}
                  />
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
            Danh sách người làm việc cùng:{' '}
            <span style={{ color: '#04AA6D' }}>{SelectLstKpi.length}</span>
          </h4>

          <Table data={SelectLstKpi}>
            <Column>
              <HeaderCell>{''}</HeaderCell>
              <Cell style={{ padding: 6 }}>
                {(rowData) => {
                  return (
                    <ButtonComponent
                      icon={<TrashIcon />}
                      style={{ background: 'transparent', color: 'red' }}
                      onClick={() => handleClickDelete(rowData.id)}
                    />
                  );
                }}
              </Cell>
            </Column>
            <Column width={200}>
              <HeaderCell className="fw-bold">Tên khách</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell className="fw-bold">ID thẻ khách</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200}>
              <HeaderCell className="fw-bold">Ghi chú</HeaderCell>
              <Cell dataKey="note" />
            </Column>
          </Table>
          <ButtonComponent
            name="Thêm khách hàng"
            icon={<PlusIcon />}
            style={{ background: 'transparent', color: '#04AA6D' }}
          />
        </div>
      </div>
    </>
  );
};
export default RegisterKpiInOut;
