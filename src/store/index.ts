import { configureStore } from "@reduxjs/toolkit";
import  todoSlice  from '@/store/slices/list-item-slice'
import listSlice from '@/store/slices/list-slice'


const store = configureStore({
    reducer:{
        todo:todoSlice,
        list:listSlice
    }
});

export default store;

export type AppDispatch = typeof store.dispatch