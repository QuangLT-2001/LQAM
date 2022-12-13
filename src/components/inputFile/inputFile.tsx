import { InputFileWrapper } from "./style"
export type InputFileProps = {
     icon?: any;
     label?: string;
     className?: string;
     onChange?: any;
     name?: string;
     value?: any;
     type?: string;
     placeholder?: string;
     accept?: string,
     fileRef?: any
}
const InputFile:React.FC<InputFileProps> = (props) => {
     return <InputFileWrapper >
          {props.icon}{props.label}
          <input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          accept={props.accept}
          />
     </InputFileWrapper>
}
export default InputFile;