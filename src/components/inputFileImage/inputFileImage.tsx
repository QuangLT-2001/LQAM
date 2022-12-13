
import { InputFileProps } from "components/inputFile/inputFile";
import { InputFileImages } from "./style"

const InputFileImage:React.FC<InputFileProps> = (props) => {
     return <InputFileImages>
     <span className="btn-upload">
     {props.icon}{props.label}
     </span>
          <input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          accept={props.accept}
          multiple
          ref={props.fileRef}
          /></InputFileImages>
}
export default InputFileImage;