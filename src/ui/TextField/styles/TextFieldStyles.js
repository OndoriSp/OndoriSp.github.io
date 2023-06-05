import { TextField, styled } from "@mui/material"

const TextFieldStyles = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: "white",
    padding: '10px 12px',
    '& fieldset': {
      border: '1.5px solid #DCE0E6',
    },

    '&:hover fieldset': {
      borderColor: '#EDEDED',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid #7F7B7B',
  },
}));

export default TextFieldStyles
