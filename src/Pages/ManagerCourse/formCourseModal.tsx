import {Modal, Button} from "rsuite"
import {useState, useEffect} from "react"
import { FormCourseModalWrapper, SlideShowItems, DisplayFile } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
type FormCourseModalProps = {
     open?: boolean;
     setOpen?: any;
     data?: any;
     handleCloseModal?: any
}
type SlideShowItemProps = {
     url?: string;
     active?:any,
     handleClickActive?: any
}
const SlideShowItem:React.FC<SlideShowItemProps> = (props) => {
     return <SlideShowItems onClick={props.handleClickActive} className={`${props.active ? "active" : ""}`}>
          <img src={props.url} alt=""/>
     </SlideShowItems>
}
const FormCourseModal:React.FC<FormCourseModalProps> = (props) => {

     const [currentSlide, setCurrentSlide] = useState(props.data.slideShow[0])
     const [currentPage, setCurrentPage] = useState(0)
     const [openModal, setOpenModal] = useState(false);
     const handleClickActive = (slide:any, index:number) => {
          setCurrentSlide(slide)
          setCurrentPage(index)
     }

     useEffect(() => {
          const descriptionContentModal = document.querySelector(".description__content__modal");
          if(descriptionContentModal) {
               descriptionContentModal.innerHTML = props.data.infoContent
          }

     }, [props.open])
     const handleClickOpenModal = () => {
          setOpenModal(true)
     }
     if(openModal) return <>
          <Modal size="full" style={{height: "100vh"}} className="bg-white" open={openModal}>
               <Modal.Header className=" p-3 d-flex align-items-center lh-1" style={{background: "rgb(213 213 213 / 90%)"}}>
                    <Modal.Title className="fw-bold fs-5">
                         {props.data.chapter}
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body className="m-0" style={{height: "calc(100vh - 57px)", maxHeight: "100%"}}>
               <iframe
               src={`${props.data.linkFile}`}
               width="100%"
               height="100%"

                />
               </Modal.Body>
          </Modal>
     </>

     return <FormCourseModalWrapper className="form__modal">
          <Modal size="lg" open={props.open} onClose={props.handleCloseModal} style={{overflow: "hidden"}}>
               <Modal.Header className=" p-3 d-flex align-items-center lh-1" style={{background: "rgb(213 213 213 / 90%)"}}>
                    <Modal.Title className="fw-bold fs-5">
                         {props.data.chapter}
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body className="p-3 mt-0 fs-5">
                    <p className="text-secondary">
                         Slideshow <span className="ms-4 d-inline-block">
                         (Trang {currentPage + 1}/ {props.data.slideShow.length} )
                         </span>
                    </p>
                    <div className="slide-show d-flex mt-3 mb-3" style={{width: "100%", overflowX: "auto"}}>
                         { props.data.slideShow.length ? props.data.slideShow.map((item:any, index:number) => {
                              return <SlideShowItem
                              handleClickActive={() => handleClickActive(item, index)}
                              active={true}
                              url={item.url} key={item.asset_id}/>
                         }) : ""}
                    </div>
                    <p className="text-secondary">
                         Nội dung chi tiết
                    </p>
                 <div className="description__content__modal">

                    </div>

                    <div className="file  d-flex mt-3 mb-3">
                    <span className="me-3 d-inline-block">Link Đính Kèm</span>
                    {props.data.file && <DisplayFile className="display-file p-2 rounded d-flex align-items-start" style={{
                                   background: "rgba(221, 221, 221,.3)"
                              }}>
                                   <span className="lh-lg">
                                        <FontAwesomeIcon icon={faFileWord} className="text-primary fs-5 me-2 lh-lg" />
                                   </span>
                                   <div className="info__file">
                                        <div className="d-flex fw-bold fs-5 align-item-center lh-1">
                                             <h5 onClick={handleClickOpenModal} className="name__file" style={{
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  whiteSpace: "nowrap",
                                                  maxWidth: "150px",
                                                  cursor: "pointer"
                                             }}>
                                                       {props.data.file.slice(0, props.data.file.lastIndexOf("."))}

                                             </h5>
                                             <span>
                                                  {props.data.file.slice(props.data.file.lastIndexOf("."))}
                                             </span>
                                        </div>
                                        <span className="me-3 d-inline-block">
                                        {(Math.round((props.data.size / 1024) * 100)) / 100 + "KB"}
                                        </span>


                                   </div>

                              </DisplayFile>}
                    </div>
                    <p className="border-dashed" style={{width: "100%", height: 2, borderBottom: "2px dashed #000"}}></p>
                    <p className="check-finish text-secondary">
                         Kiểm tra hoàn thành
                         <span className="ms-3 fw-bold">
                              {props.data.finish}
                         </span>
                    </p>
               </Modal.Body>
               <Modal.Footer className="p-3" style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
               }}>

          <Button onClick={props.handleCloseModal} appearance="primary" color="green">
            Đóng
          </Button>
               </Modal.Footer>
          </Modal>
     </FormCourseModalWrapper>
}
export default FormCourseModal;