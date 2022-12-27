import ButtonComponent from "components/button";
import { ManagerCourseDetailWrapper } from "./style";
import {Table, Toggle} from "rsuite";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom"
import { getManagerCourseByCode , selectIsLoading, selectManagerCourceDetail} from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import moment from "moment"
import FormCourseModal from "./formCourseModal";

const {Column, Cell, HeaderCell} = Table

const ManagerCourseDetail = () => {
     const dispatch = useAppDispatch();
     const {id} = useParams();
     const SelectManagerCourseDetail = useAppSelector(selectManagerCourceDetail)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const [dataModal, setDataModal] = useState<any>(undefined)
     const [open, setOpen] = useState(false)
     const navigate = useNavigate()
     useEffect(() => {
          dispatch(getManagerCourseByCode({
               url: "managerCourse",
               id: id
          }))
     }, [])
     const handleClickToModal = (data:any) => {
          setDataModal(data);
          setOpen(true);
     }
     const handleCloseModal = () => {
          setOpen(false)
     }
     const handleClickToEdit = () => {
          navigate(`/dao-tao/quan-ly-khoa-dao-tao/edit/${id}`)
     }


     const handleClickToLstQuestion = () => {
          navigate(`/dao-tao/quan-ly-khoa-dao-tao/detail/danh-sach-cau-hoi-kiem-tra/${id}`)
     }

     if(SelectIsLoading) return <>Loading...</>
     return <ManagerCourseDetailWrapper className="page__detail">
          {dataModal &&      <FormCourseModal
               open={open} setOpen={setOpen} data={dataModal} handleCloseModal={handleCloseModal}
          />}
          <div className="header__tab p-3 d-flex justify-content-between align-items-center bg-white">
               <div className="title__tab text-secondary fs-5 d-flex align-items-center">
                    <span>Đào tạo {">"}</span>
                    <h5 className="name__tab">
                         Chi tiết khóa đào tạo
                    </h5>
               </div>
               <div className="btn__tab d-flex">
                    <ButtonComponent name="Câu hỏi kiểm tra" className="me-3" onClick={handleClickToLstQuestion}/>
                    <ButtonComponent name="Chỉnh sửa" onClick={handleClickToEdit}/>
               </div>
          </div>
          <div className="desc__course d-flex p-4 bg-white mt-2 mb-2 flex-wrap flex-md-row flex-column">
               <div className="left pe-3 w-50">
                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                              Tên khóa
                              <span className="text-danger">*</span>
                         </label>
                         <p>
                              {SelectManagerCourseDetail.name}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                              Phòng ban

                         </label>
                         <p >
                              {SelectManagerCourseDetail.department}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                              Rank

                         </label>
                         <p >
                              {SelectManagerCourseDetail.rank}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                              Mô tả

                         </label>
                         <p >
                              {SelectManagerCourseDetail.description ? SelectManagerCourseDetail.description: "---"}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                             Loại

                         </label>
                         <p >
                              {SelectManagerCourseDetail.type}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 150}}>
                             Trạng thái

                         </label>
                         <p >
                              <Toggle checked={SelectManagerCourseDetail.status}/>
                         </p>
                    </div>
               </div>

               <div className="right pe-3 w-50">
                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                              Kiểm tra hoàn thành

                         </label>
                         <p >
                              {SelectManagerCourseDetail.checkFinish}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                              Thời gian tạo
                         </label>
                         <p >
                              {moment(SelectManagerCourseDetail.createdAt).format("YYYY-MM-DD h:mm")}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                              Cập nhật

                         </label>
                         <p >
                         {moment(SelectManagerCourseDetail.createdAt).format("YYYY-MM-DD h:mm")}
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                             Tổng học viên

                         </label>
                         <p >
                              90
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                             Tổng hoàn thành

                         </label>
                         <p >
                              6
                         </p>
                    </div>

                    <div className="d-flex align-items-center fs-5 mb-2">
                         <label style={{minWidth: 200}}>
                             Đang học

                         </label>
                         <p className="text-decoration-underline text-primary ">
                              84
                         </p>
                    </div>
               </div>
          </div>
          <div className="course__content bg-white p-3 w-100%">
               <h4>
                    Nội dung khóa học
               </h4>
               <Table autoHeight={true} data={SelectManagerCourseDetail.contentCourse} className="bg-white fs-6" style={{width: "100%"}}>
                    <Column width={300}>
                         <HeaderCell className="fw-bold fs-6">Chương</HeaderCell>
                         <Cell dataKey="chapter" className="hover-underline">
                              {rowData => (
                                   <h5 className="fw-normal" onClick={() => handleClickToModal(rowData)}>
                                        {rowData.chapter}
                                   </h5>
                              )}
                         </Cell>
                    </Column>
                    <Column width={300}>
                    <HeaderCell className="fw-bold fs-6">Mô tả tóm tắt</HeaderCell>
                    <Cell dataKey="desc"/>
                    </Column>
                    <Column width={400}>
                         <HeaderCell className="fw-bold fs-6">Chi tiết</HeaderCell>
                         <Cell dataKey="file"/>
                    </Column>
               </Table>
          </div>
     </ManagerCourseDetailWrapper>
}
export default ManagerCourseDetail;