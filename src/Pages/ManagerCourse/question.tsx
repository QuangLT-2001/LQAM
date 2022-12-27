import ButtonComponent from "components/button";
import { SelectPicker } from "rsuite";
import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authSlice, getManagerCourseByCode, selectIsLoading, selectLstChapterBackup, selectManagerCourceDetail } from "features/auth/authSlice";
import { useParams } from "react-router-dom";

const QuestionItem:React.FC<any> = (props) => {
     return <div className="mb-3">
          <span>Câu hỏi {props.index + 1}</span>
          <h6 className="name-question">
               {props.question.nameQuestion}
          </h6>
          <span>Câu trả lời mẫu</span>
          <h6>{props.question.nameAnswer}</h6>
     </div>
}


const Question = () => {
     const dispatch = useAppDispatch()
     const {id} = useParams();
     const SelectManagerCourseDetail = useAppSelector(selectManagerCourceDetail)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const SelectLstChapterBackup = useAppSelector(selectLstChapterBackup)

     useEffect(() => {
          dispatch(getManagerCourseByCode({
               url: "managerCourse",
               id: id
          }))
     }, [])
     useEffect(() => {
          dispatch(authSlice.actions.addLstChapterBackup(SelectManagerCourseDetail.contentCourse))
     }, [id, SelectIsLoading])
     const type = ["Kiểm tra chương", "Kiểm tra kết thúc"].map(item => ({label: item, value: item}))
     const chapter  = SelectLstChapterBackup.map((item:any) => ({label: item.chapter, value: item.chapter}))

     const handleChangeType = (event:any) => {

     }

     console.log("detail", SelectManagerCourseDetail);

     if(SelectIsLoading) return <>Loading...</>
     return <>
  <div className="header__tab p-3 d-flex justify-content-between align-items-center bg-white">
               <div className="title__tab text-secondary fs-5 d-flex align-items-center">
                    <span>Đào tạo {">"}</span>
                    <h5 className="name__tab">
                         Chi tiết khóa đào tạo
                         {">"}
                    </h5>
                    <span>Danh sách câu hỏi kiểm tra</span>

               </div>
          </div>
          <div className="frm-select d-flex">
                    <div className="form-group w-50 d-flex align-items-center p-3">
                         <span className="me-3">Loại: </span>
                         <SelectPicker onChange={handleChangeType} data={type} style={{flexGrow: 1}} placeholder="Chọn"/>
                    </div>
                    <div className="form-group w-50 d-flex align-items-center p-3">
                         <span className="me-3">Chương: </span>
                         <SelectPicker data={chapter} placeholder="Chọn" style={{flexGrow: 1}}/>
                    </div>
               </div>
               <div className="frm-question-content d-flex flex-column">
                    {SelectManagerCourseDetail.lstQuestion && SelectManagerCourseDetail.lstQuestion.map((item:any, index: any) => {
                         return <QuestionItem key={item.id} question={item} index={index}/>
                    })}
               </div>
     </>
}
export default Question;