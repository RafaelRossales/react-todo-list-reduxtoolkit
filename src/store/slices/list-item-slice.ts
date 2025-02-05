import {
  createSlice,
  createAsyncThunk,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Item } from "@/types/api";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
} as {
  items: Item[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    fetchItensList: (state, action) => {
      state.items = action.payload;
    },
    toogleCheck: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    orderByAsc: (state) => {
      const itemsCopy = current(state.items)
        .map((item) => ({ ...item }))
        .filter((item) => isValidDate(item.createdAt))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });

      state.items = itemsCopy;
    },
    orderByDesc: (state) => {
      state.items = [...state.items].sort((a, b) => {
        const dateA = isValidDate(a.createdAt)
          ? new Date(a.createdAt).getTime()
          : 0;
        const dateB = isValidDate(b.createdAt)
          ? new Date(b.createdAt).getTime()
          : 0;
        return dateB - dateA;
      });
    },
    orderByTitle: (state) => {
      state.items = [...state.items].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTodoListItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodoListItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getTodoListItems.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.error);
      })

      .addCase(removeListItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeListItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeListItem.rejected, (state, action) => {
        state.status = "failed";
      });

      
  },
});

export const {
  fetchItensList,
  orderByAsc,
  orderByDesc,
  orderByTitle,
  toogleCheck,
} = todoSlice.actions;
export default todoSlice.reducer;

export const getTodoListItems = createAsyncThunk(
  "items/fetchItems",
  async () => {
    const response = await axios.get("http://localhost:3001/items");
    const { data } = response;
    return data;
  }
);

export const removeListItem = createAsyncThunk(
  "items/removeListItem",
  async (id: number) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
    return id;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateListItem",
  async ({ id, title }: { id: number; title: string }) => {
    await axios.put(`http://localhost:3001/items/${id}`, { title });
    return { id, title };
  }
);

const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
