import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./types/api";
import { AppDispatch } from "./store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  getTodoListItems,
  removeListItem,
  updateItem,
} from "./store/slices/list-slice";
import ItemList from "./components/item-list";
import Filters from "./components/filters";
import InputItem from "./components/input-item";
import useStyles from "./styles/styles";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state) => state.list);
  const classes = useStyles();

  function handleRemoveItem(id: string) {
    dispatch(removeListItem(id))
      .then(() => dispatch(getTodoListItems()))
      .catch((error: Error) => {
        const { message }: Error = error;
        console.error("Error removing item:", message);
      });
  }

  function handleUpdateItem(id: string, title: string) {
    dispatch(updateItem({ id, title }))
      .then(() => dispatch(getTodoListItems()))
      .catch((error: Error) => {
        const { message }: Error = error;
        console.error("Error updating item:", message);
      });
  }

  useEffect(() => {
    dispatch(getTodoListItems());
  }, []);

  return (
    <Container maxWidth={false} disableGutters className={classes.root}>
      <Card
        sx={{
          backgroundColor: "#00171D",
          width: "550px",
          height: "500px",
          padding: "10px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", color: "#9fffcb" }}>
          Todo List
        </Typography>
        <CardContent>
          <InputItem />
          {items.length > 0 ? (
            <>
              <Filters />
              <Box>
                {items.map((item: Item, index: number) => (
                  <ItemList
                    key={index}
                    item={item}
                    remove={handleRemoveItem}
                    update={handleUpdateItem}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              height="300px"
            >
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#003949" }}
              >
                No items to display. Please add new items.
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
