import InputComponent from 'components/input';
import React, { useState, useEffect, memo } from 'react';
import { InputGroup, Dropdown, ButtonToolbar, IconButton, Pagination } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { ManagerCourseWrapper } from './style';
import AddOutLineIcon from '@rsuite/icons/AddOutline';
import { removeVietnameseTones } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getListManagerCourse,
  selectIsLoading,
  selectManagerCourse,
} from 'features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { PaginationWrapper } from 'Pages/LishMent/style';
import ManagerCourseItem from './managerCourseItem';
import FormAdd from './formAdd';

const ManagerCourseList = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = React.useState(false);
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
  const dispatch = useAppDispatch();
  const SelectIsLoading = useAppSelector(selectIsLoading);
  let SelectManagerCourse = useAppSelector(selectManagerCourse);
  const [dataFilter, setDataFilter] = useState([]);
  let [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: '',
    department: '',
    rank: '',
    description: '',
    type: '',
    checkFinish: '',
    status: true,
    lstStudent: [],
    endDate: '',
    contentCourse: [],
  });
  useEffect(() => {
    dispatch(
      getListManagerCourse({
        url: 'managerCourse',
      })
    );
  }, []);
  useEffect(() => {
    setKeyword(value);
    let convertUpperCase = removeVietnameseTones(keyword.toUpperCase());
    let data = SelectManagerCourse.filter((item: any) =>
      removeVietnameseTones(item.name).toUpperCase().includes(convertUpperCase)
    );
    setDataFilter(data);
  }, [keyword, value]);
  let data = keyword ? dataFilter : SelectManagerCourse;
  let count = data.length;
  useEffect(() => {
    setStart(page * limit - limit);
    setEnd(page * limit);
  }, [page, limit]);
  useEffect(() => {
    setLimit(10);
    setPage(1);
  }, [count]);

  const compareByName = (obj1: any, obj2: any) => {
    if (obj1.name > obj2.name) return 1;
    else if (obj1.name < obj2.name) return -1;
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
  const lstData = getData();
  const selectFilter = [
    {
      id: 1,
      name: 'Sắp xếp tăng dần',
      keySelect: 'ASC',
    },
    {
      id: 2,
      name: 'Sắp xếp giảm dần',
      keySelect: 'DESC',
    },
  ];
  const getCurrentSortBy = () => {
    const col = selectFilter.find((item) => item.keySelect == sortBy);
    if (col) return col.name;
    return '---Default---';
  };
  const tableList = [
    {
      id: 1,
      name: '',
      width: 200,
    },
    {
      id: 2,
      name: 'Tên khóa',
      width: 250,
    },
    {
      id: 3,
      name: 'Phòng ban',
      width: 200,
    },
    {
      id: 4,
      name: 'Rank',
      width: 200,
    },
    {
      id: 5,
      name: 'Loại',
      width: 220,
    },
    {
      id: 6,
      name: 'Tổng học viên',
      width: 200,
    },
    {
      id: 7,
      name: 'Tổng hoàn thành',
      width: 200,
    },
    {
      id: 9,
      name: 'Học',
      width: 200,
    },
    {
      id: 8,
      name: 'Trạng thái',
      width: 200,
    },
  ];
  const handleClickAdd = () => {
    setOpen(true);
  };
  if (SelectIsLoading) return <>Loading...</>;
  return (
    <ManagerCourseWrapper className="manager__course__wrapper">
      <FormAdd open={open} setOpen={setOpen} state={state} setState={setState} />

      <div className="form__page d-flex justify-content-center w-100 p-3 bg-white">
        <InputComponent
          style={{ width: '450px', marginBottom: 10 }}
          value={value}
          onChange={setValue}
          placeholder="Tìm kiếm"
          icon={
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          }
        />

        <ButtonToolbar className="ms-3" onClick={handleClickAdd}>
          <IconButton icon={<AddOutLineIcon />} placement="left">
            Thêm mới
          </IconButton>
        </ButtonToolbar>
      </div>
      <div className="header__table d-flex justify-content-between border-bottom p-3 border-secondary text-dark">
        <div className="sort__by d-flex align-items-center">
          Sort By
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
            {selectFilter.map((item) => {
              return (
                <Dropdown.Item
                  onClick={() => setSortBy(item.keySelect)}
                  key={uuidv4()}
                  style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
                  className={sortBy == item.keySelect ? 'text-success' : ''}
                >
                  {item.name}
                  {item.keySelect == sortBy ? <FontAwesomeIcon icon={faCheck} /> : <></>}
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
      <div
        className="table__list w-100 p-3 bg-white"
        style={{ overflowX: 'auto', height: 'calc(100vh - 200px)' }}
      >
        <table className="table w-100" style={{ overflowX: 'auto' }}>
          <thead>
            <tr>
              {tableList.map((item) => {
                return (
                  <th style={{ width: item.width }} key={item.id}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {lstData.length ? (
              lstData.map((item: any) => (
                <ManagerCourseItem key={item.id} managerCourseItem={item} />
              ))
            ) : (
              <tr>
                <td colSpan={9}>Dữ liệu trống</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ManagerCourseWrapper>
  );
};
export default memo(ManagerCourseList);
