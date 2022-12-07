import { deleteLishMent, TLishMentState } from "features/auth/authSlice";
import { LishMentItems } from "./style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Dropdown, IconButton} from "rsuite"
import MoreIcon from "@rsuite/icons/More"
import ButtonComponent from "components/button";
import { useAppDispatch } from "app/hooks";
import moment from "moment"
import TimeIcon from "@rsuite/icons/Time"
import {useNavigate} from "react-router-dom"
type ListMentItemProps = {
     lishMentItem:TLishMentState
}
const ListMentItem:React.FC<ListMentItemProps> = (props) => {
     const {lishMentItem} = props;
     const dispatch = useAppDispatch()
     const navigate = useNavigate()
     const handleClickDelete = (id:string |number) => {
          dispatch(deleteLishMent({
               id: id,
               url: "lishMent"
          }))
     }
     const handleClickToEdit = (id:string|number) => {
          navigate(`/quan-tri/thiet-lap-to-chuc/thong-tin-to-chuc/${id}`)
     }

     return <LishMentItems className="lish-ment-item mb-2 bg-white p-3 d-flex">
          <div className="lish-ment-left w-50">
               <h4 className="name-lishMent mb-2">
                    {lishMentItem.nameLishMent}
               </h4>
               <p className="text-secondary d-flex align-items-center">
                    <span className="me-3 d-block">ORG{lishMentItem.orgId}</span>
                    .
                    <span className="ms-3 d-block">MST: {lishMentItem.MST}</span>
               </p>
          </div>
          <div className="lish-ment-right w-50 d-flex justify-content-end align-items-center">
               <div className="info__lish-ment text-center d-flex flex-column me-3">
                    {lishMentItem.flagActive ? <span className="status bg-success rounded text-white p-2 d-inline-block">
                              Hoạt động
                         </span> : <span className="status rounded text-white p-2 d-inline-block" style={{background: "#F08800"}}>
                              Không hoạt động
                         </span>}
                         <span className="createAt text-secondary mt-3 d-inline-block">
                              <span className="me-3"><TimeIcon /></span>
                              {moment(lishMentItem.createdAt).format("DD-MM-YYYY h:mm:ss")}
                         </span>
               </div>
               <div className="action">
               <Dropdown  placement="bottomEnd" renderToggle={(props: any, ref: any) => {
                           return <span {...props}>
                              <IconButton icon={<MoreIcon />}/>
                           </span>
                        }} >

                              <Dropdown.Item>
                                   <ButtonComponent name="Sửa" onClick={()=> handleClickToEdit(lishMentItem.id)}/>
                                   </Dropdown.Item>
                              <Dropdown.Item>
                              <ButtonComponent name="Xóa" onClick={() => handleClickDelete(lishMentItem.id)}/>
                                   </Dropdown.Item>





                        </Dropdown>
               </div>
          </div>
     </LishMentItems>
}
export default ListMentItem;