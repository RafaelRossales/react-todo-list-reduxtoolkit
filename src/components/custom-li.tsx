import { ListItem, ListItemProps, styled } from "@mui/material";

const CustomListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
  color: "#9fffcb",
  backgroundColor: theme.palette.action.active,
  borderBottom: "2px solid #00171D",
  padding: "12px",
  '&:first-child': {
    borderTop: "1px",
  },
  "&.MuiListItemText-root": {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  "&.MuiListItemIcon-root": {
    fontSize: "2rem",
  },
}));

export default CustomListItem;
