import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationWrapper } from 'Pages/LishMent/style';
import { Pagination, Dropdown, Checkbox, Form, SelectPicker, DatePicker, TagPicker } from 'rsuite';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TableKpiItem from './tableKpiItem';
import { removeVietnameseTones } from 'utils/utils';
import { DropdownWrapper } from './style';
import ButtonComponent from 'components/button';
import _ from 'lodash';
const ManagerKpiInOutLst: React.FC<any> = (props) => {
  const { data } = props;
  let count = data.length;
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('DESC');
  const sortLimitValues = [10, 20, 30, 50, 100];
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(limit);
  const [sortDir, setSortDir] = useState<any>('name');
  const [valueDateStart, setValueDateStart] = useState<any>(null);
  const [valueDateEnd, setValueDateEnd] = useState<any>(null);
  const [state, setState] = useState<any>({
    company: '',
    status: null,
    timeWorkStart: valueDateStart,
    timeWorkEnd: valueDateEnd,
  });
  let currentFIlter: any = {};
  const [status, setStatus] = useState<any>(false);
  const [dataFilter, setDataFilter] = useState<any>([]);
  useEffect(() => {
    setState({
      ...state,
      timeWorkStart: valueDateStart,
      timeWorkEnd: valueDateEnd,
    });
  }, [valueDateEnd, valueDateStart]);
  useEffect(() => {
    setStart(page * limit - limit);
    setEnd(page * limit);
  }, [page, limit]);
  useEffect(() => {
    setLimit(10);
    setPage(1);
  }, [count]);
  const compareByName = (obj1: any, obj2: any) => {
    if (
      removeVietnameseTones(obj1[sortDir].toLowerCase()) >
      removeVietnameseTones(obj2[sortDir].toLowerCase())
    )
      return 1;
    else if (
      removeVietnameseTones(obj1[sortDir].toLowerCase()) <
      removeVietnameseTones(obj2[sortDir].toLowerCase())
    )
      return -1;
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
      name: 'S???p x???p t??ng d???n',
      keyFilter: 'DESC',
    },
    {
      id: 2,
      name: 'S???p x???p gi???m d???n',
      keyFilter: 'ASC',
    },
  ];

  const criteriaFilter = [
    {
      id: 1,
      name: 'Th???i gian l??m vi???c',
      keyCriteria: 'name',
    },
    {
      id: 2,
      name: 'Th???i gian check-in',
      keyCriteria: 'timeWorkStart',
    },
    {
      id: 3,
      name: 'Th???i gian check-out',
      keyCriteria: 'timeWorkEnd',
    },
    {
      id: 4,
      name: 'C??ng ty',
      keyCriteria: 'company',
    },
  ];

  const getCurrentSortBy = () => {
    const col = selectFilter.find((item) => item.keyFilter == sortBy);
    if (col) return col.name;
    return '---Default---';
  };
  let lstData = getData();

  const columns = [
    {
      id: 1,
      name: '',
      width: 130,
    },
    {
      id: 2,
      name: 'T??n kh??ch',
      width: 170,
    },
    {
      id: 3,
      name: 'S??? gi???y t???',
      width: 150,
    },
    {
      id: 4,
      name: 'Lo???i gi???y t???',
      width: 150,
    },
    {
      id: 5,
      name: 'C??ng ty',
      width: 200,
    },
    {
      id: 6,
      name: '?????i t??c c???a',
      width: 170,
    },
    {
      id: 7,
      name: 'Th???i gian l??m vi???c',
      width: 170,
    },
    {
      id: 8,
      name: 'Th???c t??? in/out',
      width: 170,
    },
    {
      id: 9,
      name: 'Tr???ng th??i',
      width: 150,
    },
  ];

  const dataPicker = data.map((item: any) => {
    return { label: item.company, value: item.company };
  });
  const dataSelect = [
    {
      keySelect: 0,
      name: 'Ch??? duy???t',
    },
    {
      keySelect: 1,
      name: '???? duy???t',
    },
    {
      keySelect: 2,
      name: '???? check-in',
    },
    {
      keySelect: 3,
      name: '???? check-out',
    },
    {
      keySelect: 4,
      name: 'T??? ch???i',
    },
  ].map((item) => ({ label: item.name, value: item.keySelect }));
  const handleClickToggle = () => {
    setStatus((state: any) => !state);
  };

  const handleChangeInput = (event: any) => {
    if (event.length) {
      setState({
        ...state,
        status: event,
      });
    } else {
      setState({
        ...state,
        status: null,
      });
    }
  };
  const handleClickOK = () => {
    for (let key in state) {
      if (state[key]) {
        currentFIlter = {
          ...currentFIlter,
          [key]: state[key],
        };
      }
    }
    if (
      currentFIlter.company &&
      currentFIlter.status &&
      currentFIlter.timeWorkStart &&
      currentFIlter.timeWorkEnd
    ) {
      const datas = lstData.filter((item: any) => {
        let status = _.intersection([item.status], currentFIlter.status);
        return (
          (item.company === currentFIlter.company && status.length) ||
          (new Date(item.timeWorkStart).getTime() >=
            new Date(currentFIlter.timeWorkStart).getTime() &&
            new Date(item.timeWorkEnd).getTime() <= new Date(currentFIlter.timeWorkEnd).getTime())
        );
      });
      setDataFilter(datas);
      setStatus(false);
    } else {
      alert('M???i b???n ch???n l???i!!!');
    }
  };

  let newData = state.company && state.status ? dataFilter : lstData;

  return (
    <>
      <div className="header__table d-flex justify-content-between border-bottom p-3 border-secondary text-dark">
        <div className="sort__by d-flex align-items-center">
          <div className="d-flex align-items-center">
            <Checkbox />
            <span className="text-secondary">Sort By:</span>
            <Dropdown
              renderToggle={(props: any, ref: any) => {
                return (
                  <span {...props}>
                    <span className="ms-3">
                      {getCurrentSortBy()} <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </span>
                );
              }}
            >
              {criteriaFilter.map((item) => {
                return (
                  <Dropdown.Item
                    onClick={() => setSortDir(item.keyCriteria)}
                    key={uuidv4()}
                    style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
                    className={sortDir == item.keyCriteria ? 'text-success' : ''}
                  >
                    {item.name}
                    {item.keyCriteria == sortDir ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item>
                <hr className="m-0" style={{ border: '1px solid #000' }} />
              </Dropdown.Item>
              {selectFilter.map((item) => {
                return (
                  <Dropdown.Item
                    onClick={() => setSortBy(item.keyFilter)}
                    key={uuidv4()}
                    style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
                    className={sortBy == item.keyFilter ? 'text-success' : ''}
                  >
                    {item.name}
                    {item.keyFilter == sortBy ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <span className="me-4 ms-4 text-secondary">|</span>
          <DropdownWrapper status={status} className="d-flex align-items-center">
            <h6 className="label fw-normal" onClick={handleClickToggle}>
              Filter:
              <span className="ms-3">
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </h6>
            <div className="dropdown p-3" style={{ width: 350 }}>
              <Form fluid formValue={state} onChange={setState}>
                <Form.Group>
                  <Form.ControlLabel>T??? ch???c</Form.ControlLabel>
                  <Form.Control
                    placeholder="Ch???n"
                    name="company"
                    style={{ flexGrow: 1, width: '100%' }}
                    accepter={SelectPicker}
                    data={dataPicker}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Ng??y</Form.ControlLabel>
                  <div className="d-flex align-items-center w-100">
                    <DatePicker
                      format="yyyy-MM-dd"
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
                      className="flex-grow-1"
                      value={valueDateStart}
                      name="timeWorkStart"
                      onChange={setValueDateStart}
                    />
                    <span className="me-2 ms-2">-</span>
                    <DatePicker
                      format="yyyy-MM-dd"
                      className="flex-grow-1"
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
                      value={valueDateEnd}
                      name="timeWorkStart"
                      onChange={setValueDateEnd}
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Tr???ng th??i</Form.ControlLabel>
                  <TagPicker
                    placeholder="Ch???n"
                    data={dataSelect}
                    className="w-100 text-success"
                    color="green"
                    onChange={handleChangeInput}
                  />
                </Form.Group>
              </Form>
              <ButtonComponent
                name="OK"
                appearance="primary"
                color="green"
                className="w-100 mt-3 mb-3"
                onClick={handleClickOK}
              />
            </div>
          </DropdownWrapper>
        </div>
        <div className="pagination__by d-flex align-items-center">
          <span className="text-gray d-flex align-items-center me-3">Hi???n th???:</span>
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
                  className={limit == n ? 'text-success' : ''}
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
            {newData.length ? (
              newData.map((item: any) => {
                return <TableKpiItem key={item.id} tableKpiItem={item} />;
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  D??? li???u tr???ng
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
