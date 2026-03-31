import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "/src/features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
