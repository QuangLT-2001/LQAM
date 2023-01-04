import { MapWorkListWrapper } from './style';
import { InputGroup, IconButton, ButtonToolbar, Pagination, Dropdown } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import InputComponent from 'components/input';
import React, { useState, useEffect } from 'react';
import AddOutLineIcon from '@rsuite/icons/AddOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getListMapWork, selectIsLoading, selectMapWork } from 'features/auth/authSlice';
import { PaginationWrapper } from 'Pages/LishMent/style';
import { removeVietnameseTones } from 'utils/utils';
import MapWorkItem from './mapWorkItem';
import FormMapWork from './mapWorkEdit';

const MapWorkList = () => {
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
  let dispatch = useAppDispatch();
  const SelectIsLoading = useAppSelector(selectIsLoading);
  const [dataFilter, setDataFilter] = useState([]);
  let [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    lishMent: '',
    name: '',
    coordinates: '',
    status: true,
    id: '',
  });
  useEffect(() => {
    dispatch(
      getListMapWork({
        url: 'mapWork',
      })
    );
  }, []);
  useEffect(() => {
    setKeyword(value);
    const convertUpperCase = removeVietnameseTones(keyword.toUpperCase());
    let data = SelectMapWork.filter((item: any) =>
      removeVietnameseTones(item.name).toUpperCase().includes(convertUpperCase)
    );
    setDataFilter(data);
  }, [keyword, value]);
  let SelectMapWork = useAppSelector(selectMapWork);
  let data = keyword ? dataFilter : SelectMapWork;
  const count = data.length;

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
  const handleCloseOpen = () => {
    setOpen((state) => !state);
  };
  let lstData = getData();
  const handleClickAdd = () => {
    setOpen(true);
  };
  const handleClickEdit = (obj: any) => {
    setOpen(true);
    setState(obj);
  };
  if (SelectIsLoading) return <>Loading...</>;
  return (
    <MapWorkListWrapper className="page_map_work">
      <FormMapWork
        url="managerTodo"
        state={state}
        setState={setState}
        open={open}
        handleCloseOpen={handleCloseOpen}
        setOpen={setOpen}
      />

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
        {/* <ButtonToolbar>
                    <IconButton icon={AddOutLineIcon} placement="left">Thêm mới</IconButton>
               </ButtonToolbar> */}
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
              ellipsis
              boundaryLinks
              maxButtons={3}
              size="xs"
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
      <div className="lst__map__work p-3">
        {lstData.length
          ? lstData.map((item: any) => (
              <MapWorkItem handleClickEdit={handleClickEdit} key={item.id} mapWorkItem={item} />
            ))
          : 'Dữ liệu trống'}
      </div>
    </MapWorkListWrapper>
  );
};
export default MapWorkList;
