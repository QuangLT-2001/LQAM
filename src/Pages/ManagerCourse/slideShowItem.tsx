import { useAppDispatch } from "app/hooks";
import { postListImages } from "features/auth/authSlice";
import React , {useState, useEffect, memo} from "react"
import axios from "axios";
type SlideShowItemProps = {
     icon?: any;
     handleClickCloseImage?: any,
     index?: number;
     file?: any,
     fileRef?: any
}

const SlideShowItem:React.FC<SlideShowItemProps> = (props) => {


     const [process, setProcess] = useState(0)
     const [imageUrl, setImageUrl] = useState<any>(null)
     const dispatch = useAppDispatch();


     useEffect(() => {

          const url = "https://api.cloudinary.com/v1_1/nguy-n-v-n-qu-ng/upload";
          const formData = new FormData();
          formData.append("file", props.file);
          formData.append("upload_preset", "porwrdsf");
          const options = {
                         onUploadProgress: (progressEvent:any) => {
                              const { loaded, total } = progressEvent;
                              let percent = Math.floor((loaded * 100) / total);
                              setProcess(percent);
                         }

                    }
                    dispatch(postListImages({
                                   url: url,
                                   formData: formData,
                                   options: options
                              }))


                    setImageUrl(URL.createObjectURL(props.file))
     }, [props.file])


     console.log("render slide to show");
     return <div className="slide-show-item">
     {/* <h5 className="name__image">
          {props.file.name}
     </h5> */}
     <span className="icon__close" onClick={() => props.handleClickCloseImage(props.index)}>
          {props.icon}
     </span>
     {imageUrl && <img src={imageUrl} alt="" />}
     <p className="process text-dark">
          {process}
     </p>
</div>
}
export default React.memo(SlideShowItem)