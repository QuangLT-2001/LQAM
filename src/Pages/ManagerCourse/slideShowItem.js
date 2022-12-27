import { useAppDispatch } from "app/hooks";
import { postListImages } from "features/auth/authSlice";
import React, { useState, useEffect, memo } from "react"
import axios from "axios";

const SlideShowItem = (props) => {


     const [process, setProcess] = useState(0)
     const [imageUrl, setImageUrl] = useState(null)
     const dispatch = useAppDispatch();


     useEffect(() => {
          const timer = setTimeout(() => {
               const uploadImage = async () => {
                    if (!props.file.asset_id) {
                         const url = "https://api.cloudinary.com/v1_1/nguy-n-v-n-qu-ng/upload";
                         const formData = new FormData();
                         formData.append("file", props.file);
                         formData.append("upload_preset", "porwrdsf");
                         const options = {
                              onUploadProgress: (progressEvent) => {
                                   const { loaded, total } = progressEvent;
                                   let percent = Math.floor((loaded * 100) / total);
                                   setProcess(percent);
                              }

                         }
                         await dispatch(postListImages({
                              url: url,
                              formData: formData,
                              options: options
                         }))
                    }

               }
               uploadImage()
          }, 1)
          if (props.file.name) {
               setImageUrl(URL.createObjectURL(props.file))
          } else {
               setImageUrl(props.file.url)
          }
          return () => clearTimeout(timer)
     }, [props.file])



     return <div className={`slide-show-item ${props.className}`}>
          {/* <h5 className="name__image">
          {props.file.name}
     </h5> */}
          <span className="icon__close" onClick={() => props.handleClickCloseImage(props.file)}>
               {props.icon}
          </span>
          {imageUrl && <img src={imageUrl} alt="" />}
          {props.file.name && process < 100 ? <p className="process text-dark">
               {process}
          </p> : ""}
     </div>
}
export default React.memo(SlideShowItem)