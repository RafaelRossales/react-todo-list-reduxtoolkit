import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: "100%",
  backgroundColor: "transparent",
  borderRadius: theme.shape.borderRadius,

  "& label": {
    color: "#9fffcb",
  },
  "& label.Mui-focused": {
    color: "#9fffcb",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#9fffcb",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9fffcb",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#9fffcb",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9fffcb",
    },
  },

  "& .MuiInputBase-input": {
    color: "#9fffcb",
    caretColor: "#9fffcb",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#9fffcb",
    opacity: 0.7,
  },
}));

export default CustomInput;
