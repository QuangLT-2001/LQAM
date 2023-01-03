import { Checkbox, Dropdown } from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { deleteKpi, putKpi } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const TableKpiItem: React.FC<any> = (props) => {
  const [statusKpi, setStatusKpi] = useState<any>(props.tableKpiItem.status);
  const [idKpi, setIdKpi] = useState<any>(0);
  const [keyKpi, setKeyKpi] = useState<any>(null);

  const navigate = useNavigate();

  const subDropdown = [
    {
      id: 5,
      name: 'Sửa',
      keySelect: 5,
    },
    {
      id: 1,
      name: 'Xóa',
      keySelect: 2,
    },
    {
      id: 2,
      name: 'Duyệt',
      keySelect: 1,
    },
    {
      id: 3,
      name: 'Từ chối',
      keySelect: 4,
    },
  ];

  useEffect(() => {
    if (props.tableKpiItem.status !== 1) {
      if (keyKpi && keyKpi !== 2) {
        dispatch(
          putKpi({
            url: 'kpi',
            id: idKpi,
            obj: {
              ...props.tableKpiItem,
              status: statusKpi,
            },
          })
        );
      }
    }
  }, [keyKpi]);
  useEffect(() => {
    if (props.tableKpiItem.status !== 1) {
      if (keyKpi && keyKpi == 2) {
        dispatch(
          deleteKpi({
            url: 'kpi',
            id: idKpi,
          })
        );
      }
    }
  }, [keyKpi]);
  useEffect(() => {
    if (keyKpi && keyKpi == 5) {
      navigate(`/KPI/quan-ly-in-out-cho-khach/dang-ky-in-out-cho-khach/${idKpi}`);
    }
  }, [keyKpi]);

  useEffect(() => {
    if (statusKpi !== 1) {
      setStatusKpi(props.tableKpiItem.status);
    }
  }, [props.tableKpiItem.status]);
  const dispatch = useAppDispatch();

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

  const handleClickControl = (key: any, id: any) => {
    switch (key) {
      case 1:
      case 4: {
        if (statusKpi !== 1) {
          setStatusKpi(key);
          setIdKpi(id);
          setKeyKpi(key);
        }
        return;
      }
      case 5:
      case 2: {
        setKeyKpi(key);
        setIdKpi(id);
        return;
      }
      default:
    }
  };

  const handleClickToDetail = (id: any) => {
    navigate(`/KPI/quan-ly-in-out-cho-khach/${id}`);
  };

  return (
    <tr>
      <td>
        <Checkbox />
        <Dropdown title={<MoreIcon />} noCaret placement="bottomStart">
          {subDropdown.map((item: any) => {
            return (
              <Dropdown.Item
                onClick={() => handleClickControl(item.keySelect, props.tableKpiItem.id)}
                key={item.id}
              >
                {item.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </td>
      <td>
        <h5
          className="fs-6"
          style={{ cursor: 'pointer' }}
          onClick={() => handleClickToDetail(props.tableKpiItem.id)}
        >
          {props.tableKpiItem.name}
        </h5>
      </td>
      <td>{props.tableKpiItem.numberPaper}</td>
      <td>{props.tableKpiItem.typePaper}</td>
      <td>{props.tableKpiItem.company}</td>
      <td>{props.tableKpiItem.partner}</td>
      <td>
        <p className="m-0">
          {moment(props.tableKpiItem.timeWorkStart).format('DD-MM-YYYY h:mm:ss')}
        </p>
        <p className="m-0">{moment(props.tableKpiItem.timeWorkEnd).format('DD-MM-YYYY h:mm:ss')}</p>
      </td>

      <td>
        <p className="m-0">
          {moment(props.tableKpiItem.timeWorkStart).format('DD-MM-YYYY h:mm:ss')}
        </p>
      </td>
      <td>{status(statusKpi)}</td>
    </tr>
  );
};
export default TableKpiItem;
