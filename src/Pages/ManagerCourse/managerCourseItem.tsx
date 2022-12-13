import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonComponent from "components/button";
import { deleteManagerCourse, IManagerCourse } from "features/auth/authSlice";
import MoreIcon from "@rsuite/icons/More"
import {useNavigate} from "react-router-dom"
import { useAppDispatch } from "app/hooks";
type ManagerCourseItemProps = {
     managerCourseItem: IManagerCourse
}
const ManagerCourseItem:React.FC<ManagerCourseItemProps> = (props) => {
     const {managerCourseItem} = props;
     const navigate = useNavigate()
     const dispatch = useAppDispatch()
     const handleClickToEdit = (id:any) => {
          navigate(`/dao-tao/quan-ly-khoa-dao-tao/${id}`);
     }
     const handleClickDelete = (id:any) => {
          dispatch(deleteManagerCourse({
               url: "managerCourse",
               id: id
          }))
     }
     const handleClickToDetail = (id:any) => {
          navigate(`/dao-tao/quan-ly-khoa-dao-tao/detail/${id}`);
     }
     return <tr>
          <td>
          <ButtonComponent
                                             onClick={() => handleClickToEdit(managerCourseItem.id)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faPen} />}

                                        />
                                        <ButtonComponent
                                             onClick={() => handleClickDelete(managerCourseItem.id)}
                                             appearance="ghost"
                                             color="red"
                                             style={{border: "none"}}
                                             icon={<FontAwesomeIcon icon={faTrash}/>}

                                        />
                                        <ButtonComponent icon={<MoreIcon />} appearance="link"/>


          </td>
          <td>
               <h5 className="name__course fs-6" style={{cursor: "pointer"}} onClick={() => handleClickToDetail(managerCourseItem.id)}>
               {managerCourseItem.name}
               </h5>
          </td>
          <td>{managerCourseItem.department}</td>
          <td>{managerCourseItem.rank}</td>
          <td>{managerCourseItem.type}</td>
          <td>{managerCourseItem.totalStudent}</td>
          <td>{managerCourseItem.totalFinish}</td>
          <td>{managerCourseItem.totalStudent}</td>
          <td>{managerCourseItem.status ? <span className="status bg-success rounded text-white p-2 d-inline-block">
                              Sử dụng
                         </span> : <span className="status rounded text-white p-2 d-inline-block" style={{background: "#F08800"}}>
                              Không sử dụng
                         </span>}</td>
                         <td></td>
     </tr>
}
export default ManagerCourseItem;