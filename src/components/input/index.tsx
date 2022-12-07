import Input from "rsuite/Input"
import InputGroup from "rsuite/InputGroup"

type InputProps = {
     value?: string;
     name?: string;
     onChange?: any,
     placeholder?: string,
     label?: string|undefined|number,
     icon?: any,
     style?: any
}
const InputComponent:React.FC<InputProps>  = (props) => {
     return <div className="d-flex align-items-center">
     {props.label && <label className="me-3">{props.label}</label>}
     <InputGroup style={props.style ? props.style : null}>

         {props.icon && props.icon}
    <Input placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange}/>

</InputGroup></div>
}
export default InputComponent
