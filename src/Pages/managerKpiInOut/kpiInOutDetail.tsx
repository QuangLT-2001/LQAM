import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deleteKpi,
  getKpiByCode,
  getLstKpi,
  putKpi,
  selectIsLoading,
  selectKpiDetail,
  selectLstKpi,
} from 'features/auth/authSlice';
import ButtonComponent from 'components/button';
import { Dropdown, Table, Form, DatePicker } from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import moment from 'moment';
import ModalComponent from './modal';

const { Column, HeaderCell, Cell } = Table;
const KpiInOutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const SelectKpiDetail = useAppSelector(selectKpiDetail);
  const SelectIsLoading = useAppSelector(selectIsLoading);
  const SelectLstKpi = useAppSelector(selectLstKpi);
  const [valueDateStart, setValueDateStart] = useState<any>(null);
  const [valueDateEnd, setValueDateEnd] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  useEffect(() => {
    dispatch(
      getLstKpi({
        url: 'kpi',
      })
    );
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(
        getKpiByCode({
          url: 'kpi',
          id: id,
        })
      );
    }
  }, [id]);
  const SelectControlEdit = [
    {
      id: 1,
      name: 'Từ chối',
      keySelect: 4,
    },
    {
      id: 2,
      name: 'Xóa',
      keySelect: 5,
    },
  ];

  const handleClickControl = (key: any) => {
    switch (key) {
      case 4: {
        dispatch(
          putKpi({
            url: 'kpi',
            id: id,
            obj: {
              ...SelectKpiDetail,
              status: SelectKpiDetail.status !== 1 ? key : SelectKpiDetail.status,
            },
          })
        );
        navigate('/KPI/quan-ly-in-out-cho-khach/');
        return;
      }
      case 5: {
        dispatch(
          deleteKpi({
            url: 'kpi',
            id: id,
          })
        );
        navigate('/KPI/quan-ly-in-out-cho-khach/');
        return;
      }

      default:
    }
  };

  const handleClickApprove = () => {
    if (SelectKpiDetail.status !== 4) {
      dispatch(
        putKpi({
          url: 'kpi',
          id: id,
          obj: {
            ...SelectKpiDetail,
            status: 1,
          },
        })
      );
      navigate('/KPI/quan-ly-in-out-cho-khach/');
    }
  };
  const handleClickToEdit = () => {
    navigate(`/KPI/quan-ly-in-out-cho-khach/dang-ky-in-out-cho-khach/${id}`);
  };

  const status = (status: any) => {
    switch (status) {
      case 1:
        return (
          <span
            className="p-1 d-inline-block text-white text-center"
            style={{ background: '#298ef2', borderRadius: 5, minWidth: 100 }}
          >
            Đã duyệt
          </span>
        );
      case 0:
        return (
          <span
            className="p-1 d-inline-block  text-white text-center"
            style={{ background: '#e5a800', borderRadius: 5, minWidth: 100 }}
          >
            Chờ duyệt
          </span>
        );
      case 2:
        return (
          <span
            className="p-1 d-inline-block text-white text-center"
            style={{ background: '#00703c', borderRadius: 5, minWidth: 100 }}
          >
            Đã check-in
          </span>
        );
      case 3:
        return (
          <span
            className="p-1 d-inline-block text-white text-center"
            style={{ background: 'rgb(229 56 192)', borderRadius: 5, minWidth: 100 }}
          >
            Đã check-out
          </span>
        );
      case 4:
        return (
          <span
            className="p-1 d-inline-block text-white text-center"
            style={{ background: '#818181', borderRadius: 5, minWidth: 100 }}
          >
            Từ chối
          </span>
        );
      default:
        return (
          <span
            className="p-1 d-inline-block text-white text-center"
            style={{ background: '#818181', borderRadius: 5, minWidth: 100 }}
          >
            Từ chối
          </span>
        );
    }
  };

  const bodyModal = () => {
    return (
      <>
        <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
          <div className="d-flex w-100 align-items-center">
            <Form.ControlLabel style={{ minWidth: '130px' }}>Thời gian làm việc</Form.ControlLabel>
            <DatePicker
              format="yyyy-MM-dd HH:mm:ss"
              className="w-100"
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
            <span className="me-3 ms-3">-</span>
            <DatePicker
              format="yyyy-MM-dd HH:mm:ss"
              className="w-100"
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
      </>
    );
  };
  const handleClickExtend = () => {
    setOpen(true);
  };

  const handleClickCancel = () => {
    setValueDateEnd(null);
    setValueDateStart(null);
    setOpen(false);
  };

  const handleClickOK = () => {
    dispatch(
      putKpi({
        url: 'kpi',
        id: id,
        obj: {
          ...SelectKpiDetail,
          timeWorkStart: valueDateStart ? valueDateStart : SelectKpiDetail.timeWorkStart,
          timeWorkEnd: valueDateEnd ? valueDateEnd : SelectKpiDetail.timeWorkEnd,
        },
      })
    );
    setValueDateEnd(null);
    setValueDateStart(null);
    setOpen(false);
    navigate('/KPI/quan-ly-in-out-cho-khach/');
  };

  if (SelectIsLoading) return <>Loading...</>;
  return (
    <>
      <ModalComponent
        open={open}
        title="Thông báo gia hạn"
        handleClickCancel={handleClickCancel}
        body={bodyModal}
        handleClickOK={handleClickOK}
      />
      {SelectKpiDetail && (
        <>
          <div className="header__tab p-3 d-flex justify-content-between align-items-center bg-white">
            <div className="title__tab text-secondary fs-5 d-flex align-items-center">
              <span>Quản lý in/out cho khách {'>'}</span>
              <h5 className="name__tab">Chi tiết in/out cho khách</h5>
            </div>
            <div className="btn__tab d-flex">
              <>
                {SelectKpiDetail.status !== 1 ? (
                  <>
                    <ButtonComponent
                      name="Duyệt"
                      appearance="primary"
                      color="green"
                      onClick={handleClickApprove}
                    />
                    <ButtonComponent
                      name="Chỉnh sửa"
                      className="ms-3 me-3"
                      appearance="default"
                      onClick={handleClickToEdit}
                    />
                    <Dropdown title={<MoreIcon />} noCaret placement="bottomEnd">
                      {SelectControlEdit.map((item) => (
                        <Dropdown.Item
                          key={item.id}
                          onClick={() => handleClickControl(item.keySelect)}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <ButtonComponent
                      name="Gia hạn"
                      appearance="primary"
                      color="green"
                      onClick={handleClickExtend}
                    />
                  </>
                )}
              </>
            </div>
          </div>

          <div className="detail__content d-flex justify-content-between p-3">
            <div className="detail__left" style={{ width: '45%' }}>
              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 100,
                  }}
                >
                  Tên khách
                  <span className="text-danger">*</span>
                </span>
                {SelectKpiDetail.name}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 100,
                  }}
                >
                  Số giấy tờ
                </span>
                {SelectKpiDetail.numberPaper ? SelectKpiDetail.numberPaper : '---'}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 100,
                  }}
                >
                  Email
                </span>
                {SelectKpiDetail.email ? SelectKpiDetail.email : '---'}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 100,
                  }}
                >
                  Điện thoại
                </span>
                {SelectKpiDetail.tel ? SelectKpiDetail.tel : '---'}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 100,
                  }}
                >
                  Công ty
                </span>
                {SelectKpiDetail.company ? SelectKpiDetail.company : '---'}
              </p>
            </div>

            <div className="detail__right" style={{ width: '45%' }}>
              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 150,
                  }}
                >
                  Đối tác của
                </span>
                {SelectKpiDetail.partner ? SelectKpiDetail.partner : '---'}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 150,
                  }}
                >
                  Thời gian làm việc
                  <span className="text-danger">*</span>
                </span>{' '}
                {moment(SelectKpiDetail.timeWorkStart).format('DD-MM-YYYY h:mm:ss')} -{' '}
                {moment(SelectKpiDetail.timeWorkEnd).format('DD-MM-YYYY h:mm:ss')}
              </p>

              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 150,
                  }}
                >
                  Ghi chú
                </span>
                {SelectKpiDetail.note ? SelectKpiDetail.note : '---'}
              </p>
              <p>
                <span
                  className="d-inline-block text-secondary"
                  style={{
                    minWidth: 150,
                  }}
                >
                  Trạng thái
                </span>
                {status(SelectKpiDetail.status)}
              </p>
            </div>
          </div>

          <div className="relate">
            <h4>
              Danh sách người làm việc cùng:{' '}
              <span style={{ color: '#04AA6D' }}>{SelectLstKpi.length}</span>
            </h4>

            <Table data={SelectLstKpi} bordered={false} autoHeight={true}>
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
          </div>
        </>
      )}
    </>
  );
};
export default KpiInOutDetail;
