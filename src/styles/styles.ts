import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B4A5B",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // flexWrap: "wrap",
    margin: 0,
    width: "100%",
    left: 0,
    // height: "50px",
    // borderRadius: "5px",
    // padding: "10px",
    // fontSize: "18px",
    // gap: "10px",
    // marginBottom: "20px",
  },
});

export default useStyles;
