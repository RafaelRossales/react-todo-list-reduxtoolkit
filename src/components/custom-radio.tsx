import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";

interface CustomRadioProps extends RadioProps {
    labelText:string
}

const CustomRadio = styled(Radio)<CustomRadioProps>(({ labelText }) => ({
    "&.MuiButtonBase-root": {
      padding: "10px",
      position: "relative",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '""',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "9rem",
      height: "2rem",
      borderRadius: "50px",
      backgroundColor: "#00222C",
      transition: "background-color 0.3s ease",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#9fffcb",
    },
    "&.Mui-checked:before": {
      backgroundColor: "#006783",
      color: "#ffffff",
    },
    "&:after": {
      content: `"${labelText}"`, 
      position: "absolute",
      fontSize: "12px",
      color: "#9fffcb",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }));

export default CustomRadio;
