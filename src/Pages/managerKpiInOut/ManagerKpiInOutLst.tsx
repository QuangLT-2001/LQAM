import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationWrapper } from 'Pages/LishMent/style';
import { Pagination, Dropdown, Table, Checkbox, Whisper, Popover, IconButton } from 'rsuite';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MoreIcon from '@rsuite/icons/More';
import moment from 'moment';
const ManagerKpiInOutLst: React.FC<any> = (props) => {
  const { data } = props;
  let count = data.length;
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('');
  const defaultHList: any[] = [];
  const [hiddenList, setHiddenList] = useState(defaultHList);

  const defaultCheckKeys: any[] = [];
  const [checkedKeys, setCheckedKeys] = React.useState(defaultCheckKeys);
  const sortLimitValues = [10, 20, 30, 50, 100];
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(limit);
  const [sortDir, setSortDir] = useState('DESC');
  useEffect(() => {
    setStart(page * limit - limit);
    setEnd(page * limit);
  }, [page, limit]);
  useEffect(() => {
    setLimit(10);
    setPage(1);
  }, [count]);

  const compareByName = (obj1: any, obj2: any) => {
    if (obj1.typeContract > obj2.typeContract) return 1;
    else if (obj1.typeContract < obj2.typeContract) return -1;
    return 0;
  };

  let sortData = [...data].sort(compareByName);
  const getData = () => {
    switch (sortBy) {
      case 'DESC':
        return sortData.slice(start, end);
      case 'ASC':
        return sortData.reverse().slice(start, end);
      default:
        return data.slice(start, end);
    }
  };

  const selectFilter = [
    {
      id: 1,
      name: 'ASC',
    },
    {
      id: 2,
      name: 'DESC',
    },
  ];
  const getCurrentSortBy = () => {
    const col = selectFilter.find((item) => item.name == sortBy);
    if (col) return col.name;
    return 'Name';
  };
  // let sortData = data.reverse()
  let lstData = getData();

  const selectControl = [
    {
      id: 1,
      name: 'Sửa',
      keyControl: 1,
    },
    {
      id: 2,
      name: 'Xóa',
      keyControl: 2,
    },
    {
      id: 3,
      name: 'Duyệt',
      keyControl: 3,
    },
    {
      id: 4,
      name: 'Từ chối',
      keyControl: 4,
    },
  ];

  const handleClickControl = (key: any) => {
    console.log('key', key);
  };

  const speaker = (
    <Popover>
      {selectControl.map((item) => (
        <p onClick={() => handleClickControl(item.keyControl)} key={item.id}>
          {item.name}
        </p>
      ))}
    </Popover>
  );

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      onClose();
      console.log(eventKey);
      console.log('row');
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>Sửa</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Xóa</Dropdown.Item>
          <Dropdown.Item eventKey={3}>Duyệt</Dropdown.Item>
          <Dropdown.Item eventKey={4}>Từ chối</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    return (
      <Table.Cell {...props} className="link-group" style={{ padding: 6 }}>
        <Checkbox />
        <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
          <IconButton
            style={{ background: 'transparent' }}
            appearance="subtle"
            icon={<MoreIcon />}
          />
        </Whisper>
      </Table.Cell>
    );
  };

  const status = (status: any) => {
    switch (status) {
      case 1:
        return (
          <span
            className="p-1 d-inline-block text-white"
            style={{ background: '#298ef2', borderRadius: 5 }}
          >
            Đã duyệt
          </span>
        );
      case 0:
        return (
          <span
            className="p-1 d-inline-block  text-white"
            style={{ background: '#e5a800', borderRadius: 5 }}
          >
            Chờ duyệt
          </span>
        );
      case 2:
        return (
          <span
            className="p-1 d-inline-block text-white"
            style={{ background: '#00703c', borderRadius: 5 }}
          >
            Đã check-in
          </span>
        );
      case 3:
        return (
          <span
            className="p-1 d-inline-block text-white"
            style={{ background: 'rgb(229 56 192)', borderRadius: 5 }}
          >
            Đã check-out
          </span>
        );
      case 4:
        return (
          <span
            className="p-1 d-inline-block text-white"
            style={{ background: '#818181', borderRadius: 5 }}
          >
            Từ chối
          </span>
        );
    }
  };

  return (
    <>
      <div className="header__table d-flex justify-content-between border-bottom p-3 border-secondary text-dark">
        <div className="sort__by d-flex align-items-center">
          <Checkbox />
          Sort By
          <Dropdown
            renderToggle={(props: any, ref: any) => {
              return (
                <span {...props}>
                  {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                  <span className="ms-3">
                    {getCurrentSortBy()} <FontAwesomeIcon icon={faAngleDown} />
                  </span>
                </span>
              );
            }}
          >
            {selectFilter.map((item) => {
              return (
                <Dropdown.Item
                  onClick={() => setSortBy(item.name)}
                  key={uuidv4()}
                  style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
                  className={sortBy == item.name ? 'text-green' : ''}
                >
                  {item.name}
                  {item.name == sortBy ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <div className="pagination__by d-flex align-items-center">
          <span className="text-gray d-flex align-items-center me-3">Hiển thị:</span>
          <Dropdown
            renderToggle={(props: any, ref: any) => {
              return (
                <span {...props}>
                  {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                  <span
                    className=" border"
                    style={{ padding: '.2rem', display: 'block', borderRadius: '5px' }}
                  >
                    <span>{limit} </span>
                    <span>
                      <FontAwesomeIcon icon={faAngleDown} className="ms-2" />
                    </span>
                  </span>
                </span>
              );
            }}
          >
            {sortLimitValues.map((n) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    setPage(1);
                    setLimit(n);
                  }}
                  key={uuidv4()}
                  style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
                  className={limit == n ? 'text-green' : ''}
                >
                  {n} {limit == n ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
          <PaginationWrapper
            className="pagination-wrapper"
            pages={Math.ceil(count / limit)}
            page={page}
          >
            <Pagination
              prev
              next
              // first
              // last
              ellipsis
              boundaryLinks
              maxButtons={3}
              size="xs"
              //layout={['total', '-', 'limit', '|', 'pager', 'skip']}

              total={10}
              pages={Math.ceil(count / limit)}
              limitOptions={[10, 20, 25, 50, 100]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={(val) => {
                setLimit(val);
                setPage(1);
              }}
            />
          </PaginationWrapper>
        </div>
      </div>
      <div className="content__table">
        <Table data={lstData}>
          <Table.Column fixed="left">
            <Table.HeaderCell>{''}</Table.HeaderCell>
            <ActionCell dataKey="id" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell className="fw-bold">{'Tên khách'}</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell className="fw-bold">{'Số giấy tờ'}</Table.HeaderCell>
            <Table.Cell dataKey="numberPaper" />
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell className="fw-bold">{'Loại giấy tờ'}</Table.HeaderCell>
            <Table.Cell dataKey="typePaper" />
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell className="fw-bold">{'Công ty'}</Table.HeaderCell>
            <Table.Cell dataKey="company" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell className="fw-bold">{'Đối tác của'}</Table.HeaderCell>
            <Table.Cell dataKey="partner" />
          </Table.Column>

          <Table.Column width={200} align="center">
            <Table.HeaderCell className="fw-bold">{'Thời gian làm việc'}</Table.HeaderCell>
            <Table.Cell style={{ padding: 6 }}>
              {(rowData) => {
                return (
                  <>
                    <p className="m-0">
                      {moment(rowData.timeWorkStart).format('DD-MM-YYYY h:mm:ss')}
                    </p>
                    <p className="m-0">
                      {moment(rowData.timeWorkEnd).format('DD-MM-YYYY h:mm:ss')}
                    </p>
                  </>
                );
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column width={200} align="center">
            <Table.HeaderCell className="fw-bold">{'Thực tế in/out'}</Table.HeaderCell>
            <Table.Cell style={{ padding: 6 }}>
              {(rowData) => {
                return (
                  <>
                    <p className="m-0">
                      {moment(rowData.timeWorkStart).format('DD-MM-YYYY h:mm:ss')}
                    </p>
                    <p className="m-0">
                      {moment(rowData.timeWorkEnd).format('DD-MM-YYYY h:mm:ss')}
                    </p>
                  </>
                );
              }}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={200} align="center">
            <Table.HeaderCell className="fw-bold">{'Trạng thái'}</Table.HeaderCell>
            <Table.Cell style={{ padding: 6 }}>
              {(rowData) => {
                return <>{status(rowData.status)}</>;
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </div>
    </>
  );
};
export default ManagerKpiInOutLst;
