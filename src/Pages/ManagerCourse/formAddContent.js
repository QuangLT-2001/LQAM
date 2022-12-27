import InputFile from "components/inputFile/inputFile";
import React, { useState, useEffect, useRef, memo } from "react";
import { Modal, Button } from "rsuite"
import { Form, Input } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileWord } from "@fortawesome/free-solid-svg-icons"
import { DisplayFile, FormAddContentWrapper, SlideShowImage } from "./style";
import CloseIcon from '@rsuite/icons/Close'
import axios from "axios"
import InputFileImage from "components/inputFileImage/inputFileImage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectImageSlide, selectLstChapter, selectLstFile } from "features/auth/authSlice";
import { authSlice } from "features/auth/authSlice";
import TextareaEditor from "components/textareaEditor/textareaEditor";
import SlideShowItem from "./slideShowItem";
import { v4 as uuidv4 } from "uuid"
const FormAddContent = (props) => {
     const {
          open,
          setOpen,
          handleClickCancel,
          state,
          setState,
     } = props;
     const formRef = React.useRef()
     const fileRef = useRef(null);
     const [file, setFile] = useState("")
     const [size, setSize] = useState(0)
     const [linkFile, setLinkFile] = useState("")
     const [process, setProcess] = useState(0);
     const [textValue, setTextValue] = useState("")
     const [files, setFiles] = useState([])
     const editorRef = useRef(null)
     const dispatch = useAppDispatch()
     let SelectImageSlide = useAppSelector(selectImageSlide);
     let SelectLstFile = useAppSelector(selectLstFile)
     useEffect(() => {
          const timer = setTimeout(() => {
               if (state.id) {
                    setTextValue(state.desc)
                    dispatch(authSlice.actions.addFileSource([...state.slideShow]))
                    dispatch(authSlice.actions.addChapter(state))
                    dispatch(authSlice.actions.addImageSlide(state.slideShow))
               }
          }, 100)
          return () => clearTimeout(timer)
     }, [state.id])
     const handleChangeInputFile = (event) => {
          const { files, name } = event.target;
          const url = "https://api.cloudinary.com/v1_1/nguy-n-v-n-qu-ng/upload";
          const formData = new FormData();
          formData.append("file", files[0]);
          formData.append("upload_preset", "porwrdsf");
          setFile(files[0])
          setState({
               ...state,
               file: ""
          })
          const options = {
               onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);

                    setProcess(percent)

               }
          }
          axios.post(url, formData, options).then((respon) => {
               if (respon.status == 200 || respon.status == 201) {
                    setLinkFile(respon.data.url)
                    setSize(respon.data.bytes)


               }
          });
     }
     const handleClickCloseFile = () => {
          setFile("")
          setState({
               ...state,
               file: "",
               linkFile: "",
               size: 0
          })
          setLinkFile("")
          setSize("")
     }

     const handleChangeInputFileImage = (e) => {
          // dispatch(authSlice.actions.addFileSource([...e.target.files]))
          setFiles([...files, ...e.target.files])
          fileRef.current.value = null;
     }

     const handleClickCloseImage = (obj) => {
          setFiles(files.filter(item => item.name !== obj.name))
     }



     const handleChangeValue = (e) => {


     }
     const handleClickAdd = () => {
          if (state.chapter && state.finish && state.desc) {
               if (editorRef.current) {
                    let content = editorRef.current.getContent();
                    dispatch(authSlice.actions.addChapter({
                         ...state,
                         linkFile: linkFile ? linkFile : "",
                         file: file.name ? file.name : "",
                         slideShow: SelectImageSlide.length ? SelectImageSlide : [],
                         infoContent: content,
                         size: size ? size : 0,
                         id: uuidv4()
                    }))
                    dispatch(authSlice.actions.postLstChapterBackup({
                         ...state,
                         linkFile: linkFile ? linkFile : "",
                         file: file.name ? file.name : "",
                         slideShow: SelectImageSlide.length ? SelectImageSlide : [],
                         infoContent: content,
                         size: size ? size : 0,
                         id: uuidv4()
                    }))
                    dispatch(authSlice.actions.updateFileSource())
                    setState(
                         {
                              chapter: "",
                              finish: "",
                              desc: "",
                              file: "",
                              slideShow: [],
                              infoContent: ""
                         }
                    )
                    setOpen(false);


               }
          }
     }

     const handleClickUpdate = () => {
          dispatch(authSlice.actions.putLstChapterBackup({
               ...state,
               slideShow: SelectImageSlide,
               infoContent: editorRef.current.getContent(),
               file: file ? file.name : state.file,
               linkFile: linkFile ? linkFile : state.linkFile,
               size: size ? size : state.size,

          }))
          setState({
               chapter: "",
               finish: "",
               desc: "",
               file: "",
               slideShow: [],
               infoContent: "",
          })
          setOpen(false)
          dispatch(authSlice.actions.updateFileSource())
     }

     const handleClickDeleteImage = (id) => {
          dispatch(authSlice.actions.deleteImageSlide(id))
     }

   

     return <FormAddContentWrapper>
          <Modal open={open} size="md" onClose={handleClickCancel}>
               <Modal.Header className="p-3">
                    <Modal.Title>{state.id ? "Chỉnh sửa nội dung" : "Thêm nội dung"}</Modal.Title>
               </Modal.Header>

               <Modal.Body className="p-3">

                    <Form fluid onChange={setState} formValue={state} ref={formRef}>
                         <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                              <Form.ControlLabel style={{ maxWidth: "55px" }} className="me-3">Chương
                                   <span className="text-danger">*</span>
                              </Form.ControlLabel>
                              <Form.Control placeholder="Nhập" name="chapter" style={{ flexGrow: 1, width: "100%" }} />

                              <Form.ControlLabel style={{ minWidth: "80px" }} className="ms-5 me-3">Kiểm tra hoàn thành
                                   <span className="text-danger">*</span>
                              </Form.ControlLabel>
                              <Form.Control placeholder="Nhập" name="finish" style={{ flexGrow: 1, width: "100%" }} />
                         </Form.Group >
                         <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                              <Form.ControlLabel style={{ maxWidth: "55px" }} className="me-3">Mô tả tóm tắt
                                   <span className="text-danger">*</span>
                              </Form.ControlLabel>
                              <Form.Control placeholder="Nhập" name="desc" style={{ flexGrow: 1, width: "100%" }} />
                         </Form.Group >
                         <Form.Group title="status" controlId="name-9" className="d-flex align-items-center">
                              <Form.ControlLabel style={{ maxWidth: "55px" }} className="me-3">File đính kèm

                              </Form.ControlLabel>
                              <InputFile icon={<AttachmentIcon />} type="file" name="file" onChange={handleChangeInputFile}
                                   accept=".pdf"
                              />
                              {state.file ? <DisplayFile className="display-file p-2 rounded d-flex" style={{
                                   background: "rgba(221, 221, 221,.3)"
                              }}>
                                   <span className="lh-lg">
                                        <FontAwesomeIcon icon={faFileWord} className="text-primary fs-5 me-2 lh-lg" />
                                   </span>
                                   <div className="info__file">
                                        <div className="d-flex fw-bold fs-5 align-item-center lh-1">
                                             <h5 className="name__file" style={{
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  whiteSpace: "nowrap",
                                                  maxWidth: "150px"
                                             }}>
                                                  <a href={state.linkFile}>
                                                       {state.file.slice(0, state.file.lastIndexOf("."))}
                                                  </a>

                                             </h5>
                                             <span>
                                                  {state.file.slice(state.file.lastIndexOf("."))}
                                             </span>
                                        </div>
                                        <span className="me-3 d-inline-block">  {(Math.round((state.size / 1024) * 100)) / 100 + "KB"}</span>


                                   </div>
                                   <span className="icon__close p-3 d-inline-block" onClick={handleClickCloseFile}>
                                        <CloseIcon />
                                   </span>
                              </DisplayFile> : typeof file === "object" && <DisplayFile className="display-file p-2 rounded d-flex" style={{
                                   background: "rgba(221, 221, 221,.3)"
                              }}>
                                   <span className="lh-lg">
                                        <FontAwesomeIcon icon={faFileWord} className="text-primary fs-5 me-2 lh-lg" />
                                   </span>
                                   <div className="info__file">
                                        <div className="d-flex fw-bold fs-5 align-item-center lh-1">
                                             <h5 className="name__file" style={{
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  whiteSpace: "nowrap",
                                                  maxWidth: "150px"
                                             }}>
                                                  <a href={process == 100 ? linkFile : ""}>
                                                       {file.name.slice(0, file.name.lastIndexOf("."))}
                                                  </a>

                                             </h5>
                                             <span>
                                                  {file.name.slice(file.name.lastIndexOf("."))}
                                             </span>
                                        </div>
                                        <span className="me-3 d-inline-block">  {(Math.round((file.size / 1024) * 100)) / 100 + "KB"}</span>

                                        {process == 100 ? "" : <span className="ms-3 d-inline-block">{process}%</span>}
                                   </div>
                                   <span className="icon__close p-3 d-inline-block" onClick={handleClickCloseFile}>
                                        <CloseIcon />
                                   </span>
                              </DisplayFile>}
                         </Form.Group>
                         <Form.Group title="status" controlId="name-9" className="d-flex align-items-center flex-wrap w-100">
                              <Form.ControlLabel style={{ maxWidth: "55px" }} className="me-3">Slideshow

                              </Form.ControlLabel>
                              <InputFileImage fileRef={fileRef} label="Upload" type="file" accept="image/png, image/jpeg" onChange={handleChangeInputFileImage} />
                              <SlideShowImage>
                                   {files.length ? files.map((item, index) => {
                                        return <SlideShowItem
                                             key={index}
                                             slideShowItem={item}
                                             icon={<CloseIcon />}
                                             handleClickCloseImage={handleClickCloseImage}
                                             index={index}
                                             file={item}
                                             fileRef={fileRef}

                                        />

                                   }) : ""}
                                   {SelectLstFile.length ? SelectLstFile.map((item, index) => {
                                        return <div className={`slide-show-item`}>
                                             {/* <h5 className="name__image">
                                        {props.file.name}
                                   </h5> */}
                                             <span className="icon__close" onClick={() => handleClickDeleteImage(item.asset_id)}>
                                                  {<CloseIcon />}
                                             </span>
                                             <img src={item.url} alt="" />

                                        </div>
                                   }) : ""}


                              </SlideShowImage>
                         </Form.Group>
                         <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                              <Form.ControlLabel style={{ maxWidth: "70px" }} className="me-3">Nội dung chi tiết

                              </Form.ControlLabel>
                              <TextareaEditor textValue={textValue} editorRef={editorRef} onChange={handleChangeValue} />

                         </Form.Group >
                    </Form>
               </Modal.Body>
               <Modal.Footer className="p-3">
                    {state.id ? <Button color="green" appearance="primary" onClick={handleClickUpdate}>
                         Cập nhật
                    </Button> : <Button color="green" appearance="primary" onClick={handleClickAdd}>
                         Lưu
                    </Button>}

                    <Button appearance="subtle" onClick={handleClickCancel}>
                         Hủy
                    </Button>
               </Modal.Footer>
          </Modal>
     </FormAddContentWrapper>
}
export default FormAddContent;