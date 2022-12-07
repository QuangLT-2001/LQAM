import { deleteMapWork, IMapWork } from "features/auth/authSlice";
import { MapWorkItems } from "./style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"
import {Dropdown, IconButton} from "rsuite"
import ButtonComponent from "components/button";
import MoreIcon from "@rsuite/icons/More"
import { useAppDispatch } from "app/hooks";
type MapWorkItemProps = {
     mapWorkItem: IMapWork;
     handleClickEdit?: any
}
const MapWorkItem:React.FC<MapWorkItemProps> = (props) => {
     const {mapWorkItem} = props;
     const dispatch = useAppDispatch()

     const handleClickDelete = (id:any) => {
          dispatch(deleteMapWork({
               url: "mapWork",
               id: id
          }))
     }
     return <MapWorkItems className="map__work__item p-3 bg-white mb-3 d-flex align-items-start">
          <span className="text-danger ps-3 pe-3 fs-3">
               <FontAwesomeIcon icon={faLocationDot}/>
          </span>
          <div className="info__map d-flex justify-content-between align-items-center flex-grow-1">
               <div className="map-left">
                    <h3 className="mb-3">
                         {mapWorkItem.name}
                    </h3>
                    <p className="text-secondary">
                         Vị trí  GRP - {mapWorkItem.coordinates} . ORG{mapWorkItem.id}
                    </p>
               </div>
               <div className="map-right d-flex align-items-center">
                    <span className="me-3 d-inline-block">
                    {mapWorkItem.status ? <span className="status bg-success rounded text-white p-2 d-inline-block">
                              Hoạt động
                         </span> : <span className="status rounded text-white p-2 d-inline-block" style={{background: "#F08800"}}>
                              Không hoạt động
                         </span>}
                    </span>
                    <Dropdown  placement="bottomEnd" renderToggle={(props: any, ref: any) => {
                           return <span {...props}>
                              <IconButton icon={<MoreIcon />}/>
                           </span>
                        }} >

                              <Dropdown.Item>
                                   <ButtonComponent name="Sửa" onClick={() => props.handleClickEdit(mapWorkItem)}/>
                                   </Dropdown.Item>
                              <Dropdown.Item>
                              <ButtonComponent name="Xóa" onClick={() => handleClickDelete(mapWorkItem.id)}/>
                                   </Dropdown.Item>





                        </Dropdown>
               </div>
          </div>
     </MapWorkItems>
}
export default MapWorkItem;