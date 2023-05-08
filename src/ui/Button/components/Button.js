import {Button as MuiButton} from "@mui/material"
import buttonStylesSolid from "../styles/stylesSolid"
import buttonStylesOutlined from "../styles/stylesOutlined"
function Button({onClick, text, isOutlined}){
    return(
        <MuiButton disableRipple variant="outlined" onClick={onClick}
                 sx={isOutlined ? buttonStylesOutlined : buttonStylesSolid}>
            {text}
        </MuiButton>
    )
}

export default Button
