import { AppDispatch } from "@/store";
import { getTodoListItems, addItem } from "@/store/slices/list-slice";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomInput from "./custom-input";
import { Add, AddCircle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InputItem() {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleAddItem() {
    dispatch(addItem(inputValue))
      .then(() => {
        dispatch(getTodoListItems());
        setInputValue("");
      })
      .catch((error: Error) => {
        const { message }: Error = error;
        console.error("Error adding item:", message);
      });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      handleAddItem();
      setInputValue("");
    }
  }

  return (
    <Box>
      <CustomInput
        label="Nova Tarefa"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDownCapture={(e) => handleKeyDown(e)}
      />
    </Box>
  );
}
