import { Box } from "@mui/material";
import CustomListItem from "./custom-li";

export default function ListLiItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomListItem>{children}</CustomListItem>;
}
