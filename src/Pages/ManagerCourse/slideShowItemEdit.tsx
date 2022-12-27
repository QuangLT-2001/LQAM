const SlideShowItemEdit = (props:any) => {
     return <div className={`slide-show-item ${props.className}`}>
     {/* <h5 className="name__image">
     {props.file.name}
</h5> */}
     <span className="icon__close" onClick={() => props.handleClickCloseImage(props.index)}>
          {props.icon}
     </span>
</div>
}
export default SlideShowItemEdit