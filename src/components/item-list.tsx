import { Item } from "@/types/api";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { RemoveCircle } from "@mui/icons-material";
import ListLiItem from "./list-li-item";
import CustomInput from "./custom-input";

interface ItemProps {
  item: Item;
  remove: (id: string) => Promise<void>;
  update: (id: string, title: string) => Promise<void>;
}

export default function ItemList({ item, remove, update }: ItemProps) {
  const [itemId, setItemId] = useState<string | null>(null);
  const [isInputRendered, setIsInputRendered] = useState(false);
  const [inputValue, setInputValue] = useState<string>(item.title);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    if (e.detail === 2) {
      setIsInputRendered(true);
      setItemId(id);
    }
  }

  function handleUpdateItem(
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: string
  ) {
    setIsInputRendered(false);
    update(itemId, inputValue);
    setInputValue(item.title);
    setItemId(null);
  }

  return (
    <ListLiItem>
      {itemId === item.id ? (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="delete"
            size="small"
            color="secondary"
            onClick={(e) => handleUpdateItem(e, itemId)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <CustomInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100vw" }}
        >
          <Typography onClick={(e) => handleClick(e, item.id)}>
            {item.title}
          </Typography>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={(e) => remove(item.id)}
            color="secondary"
          >
            <RemoveCircle fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </ListLiItem>
  );
}
