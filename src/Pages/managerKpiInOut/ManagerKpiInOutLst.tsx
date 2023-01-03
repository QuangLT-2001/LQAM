import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationWrapper } from 'Pages/LishMent/style';
import { Pagination, Dropdown, Table, Checkbox, Whisper, Popover, IconButton } from 'rsuite';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MoreIcon from '@rsuite/icons/More';
import moment from 'moment';
import TableKpiItem from './tableKpiItem';
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

  const columns = [
    {
      id: 1,
      name: '',
      width: 130,
    },
    {
      id: 2,
      name: 'Tên khách',
      width: 170,
    },
    {
      id: 3,
      name: 'Số giấy tờ',
      width: 150,
    },
    {
      id: 4,
      name: 'Loại giấy tờ',
      width: 150,
    },
    {
      id: 5,
      name: 'Công ty',
      width: 200,
    },
    {
      id: 6,
      name: 'Đối tác của',
      width: 170,
    },
    {
      id: 7,
      name: 'Thời gian làm việc',
      width: 170,
    },
    {
      id: 8,
      name: 'Thực tế in/out',
      width: 170,
    },
    {
      id: 9,
      name: 'Trạng thái',
      width: 150,
    },
  ];

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
      <div className="content__table w-100" style={{ overflow: 'hidden' }}>
        {/* <Table data={lstData} autoHeight={true}>
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
        </Table> */}
        <table className="table w-100" style={{ overflowX: 'auto' }}>
          <thead className="table-secondary">
            <tr>
              {columns.map((item) => {
                return (
                  <th key={item.id} className="text-center" style={{ width: item.width }}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {lstData.length ? (
              lstData.map((item: any) => {
                return <TableKpiItem key={item.id} tableKpiItem={item} />;
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Dữ liệu trống
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ManagerKpiInOutLst;
