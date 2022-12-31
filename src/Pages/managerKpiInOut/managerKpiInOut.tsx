import InputComponent from 'components/input';
import { useState, useEffect } from 'react';
import { InputGroup } from 'rsuite';
import { ManagerKpiInOutWrapper } from './style';
import SearchIcon from '@rsuite/icons/Search';
import ButtonComponent from 'components/button';
import MoreIcon from '@rsuite/icons/More';
import { useNavigate } from 'react-router-dom';
import ManagerKpiInOutLst from './ManagerKpiInOutLst';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getLstKpi, selectIsLoading, selectLstKpi } from 'features/auth/authSlice';
const ManagerKpiInOut = () => {
  const [value, setValue] = useState<any>('');
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
  // let [keyword, setKeyword] = useState<any>("");
  // const [dataFilter, setDataFilter] = useState<any>([])
  // useEffect(() => {
  //      setKeyword(value)
  //      const convertUpperCase = removeVietnameseTones(keyword.toUpperCase())
  //      let dataSearch = dataKPI.filter(item => removeVietnameseTones(item.name).toUpperCase().includes(convertUpperCase));
  //      setDataFilter(dataSearch)
  // }, [value, keyword])
  // const data = keyword ? dataFilter : dataKPI
  const navigate = useNavigate();
  const handleClickToRegister = () => {
    navigate('/KPI/quan-ly-in-out-cho-khach/dang-ky-in-out-cho-khach/');
  };
  return (
    <ManagerKpiInOutWrapper>
      <div className="form__page d-flex justify-content-center align-items-center w-100 border bg-white pt-3 pb-3">
        <InputComponent
          value={value}
          onChange={setValue}
          placeholder="Tìm kiếm"
          icon={
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          }
          style={{ width: '450px', marginBottom: 10 }}
        />

        <ButtonComponent
          className="ms-3"
          name="Thêm mới"
          style={{ marginBottom: 10 }}
          onClick={handleClickToRegister}
        />

        <ButtonComponent icon={<MoreIcon />} style={{ marginBottom: 10 }} className="ms-3" />
      </div>

      <ManagerKpiInOutLst data={SelectLstKpi} />
    </ManagerKpiInOutWrapper>
  );
};
export default ManagerKpiInOut;
