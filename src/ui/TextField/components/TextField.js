import TextFieldStyles from "../styles/TextFieldStyles"
import Label from "./Label"


function Input({ placeholder, label, onKeyDown, ...props }) {

    return (
        <>
            <Label>{label}</Label>
            <TextFieldStyles
                {...props}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
            />
        </>
    )
}

export default Input
