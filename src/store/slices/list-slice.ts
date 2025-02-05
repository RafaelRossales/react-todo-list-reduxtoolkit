import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { FilterEnum, FilterType, Item } from "@/types/api";
import axios from "axios";

const initialState = {
  filters: [],
  items: [],
  status: "idle",
  error: null,
} as {
  filters: FilterType[];
  items: Item[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    fetchItemsList: (state, action) => {
      state.items = action.payload;
    },
    getFilters: (state) => {
      state.filters = [
        {
          id: 1,
          title: "Mais Recentes",
          value: FilterEnum.DESC,
          checked: true,
        },
        {
          id: 2,
          title: "Mais antigos",
          value: FilterEnum.ASC,
          checked: false,
        },
        { id: 3, title: "AaZ", value: FilterEnum.AaZ, checked: false },
      ];
    },
    filterList: (state, action) => {
      const id = action.payload;
      const currentCheckedIndex = state.filters.findIndex(
        (filter) => filter.checked
      );
      if (currentCheckedIndex !== -1) {
        state.filters[currentCheckedIndex].checked = false;
      }
      state.filters = state.filters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      );

      const currentFilter = state.filters.filter((f) => f.checked)[0].value;

      switch (currentFilter) {
        case FilterEnum.AaZ:
          state.items = orderByTitleHelper(state);
          break;
        case FilterEnum.ASC:
          state.items = orderByAscHelper(state);
          break;
        case FilterEnum.DESC:
          state.items = orderByDescHelper(state);
          break;
        default:
          console.log("Default Option");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoListItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodoListItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Items fetched successfully", action.payload);
        state.items = action.payload;
      })
      .addCase(getTodoListItems.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(removeListItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeListItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeListItem.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(updateItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { getFilters, fetchItemsList, filterList } = listSlice.actions;
export default listSlice.reducer;

export const getTodoListItems = createAsyncThunk(
  "items/fetchItems",
  async () => {
    const response = await axios.get("http://localhost:3001/items?_sort=createdAt&_order=desc");
    const { data } = response;
    return data.reverse();
  }
);

export const addItem = createAsyncThunk(
  "items/addItem",
  async (title: string) => {
    const itemsReponse = await axios.get("http://localhost:3001/items");
    const { data } = itemsReponse;
    let newItem = {} as Item;

    if (data.length > 0) {
      const lastId = data[data.length - 1].id;
      newItem = {
        id: String(parseInt(lastId) + 1),
        title,
        completed: false,
        createdAt: new Date(),
      } as Item;
    } else {
      newItem = {
        id: "1",
        title,
        completed: false,
        createdAt: new Date(),
      } as Item;
    }

    await axios.post("http://localhost:3001/items", newItem);
  }
);

export const removeListItem = createAsyncThunk(
  "items/removeListItem",
  async (id: string) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
    return id;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateListItem",
  async ({ id, title }: { id: string; title: string }) => {
    const response = await axios.get(`http://localhost:3001/items?id=${id}`);
    if (!response) {
      console.error(`Item not found with id: ${id} `);
      return;
    }
    const data = response.data[0];
    const item = { ...data, title };

    const updatedItem = await axios.put(
      `http://localhost:3001/items/${id}`,
      item
    );

    return updatedItem.data;
  }
);

function orderByTitleHelper(state) {
  return [...state.items].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
}

function orderByAscHelper(state) {
  return current(state.items)
    .map((item) => ({ ...item }))
    .filter((item) => isValidDate(item.createdAt))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}

function orderByDescHelper(state) {
  return [...state.items].sort((a, b) => {
    const dateA = isValidDate(a.createdAt)
      ? new Date(a.createdAt).getTime()
      : 0;
    const dateB = isValidDate(b.createdAt)
      ? new Date(b.createdAt).getTime()
      : 0;
    return dateB - dateA;
  });
}

const isValidDate = (dateString: Date) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
