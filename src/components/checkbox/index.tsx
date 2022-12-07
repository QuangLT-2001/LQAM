import React from "react"
import CheckBox from "rsuite/Checkbox"
type CheckBoxProps = {
     name?:any;
     value?: any;
     onChange?: any,
     checked?: boolean,
     id?: any
}
const CheckBoxComponent: React.FC<CheckBoxProps> = (props) => {
     return <CheckBox id={props.id} className="text-white" checked={props.checked} name={props.name} value={props.value} onChange={props.onChange}/>
}
export default CheckBoxComponent;