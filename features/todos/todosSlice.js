import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  return data.todos;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    updateTodo: (state, action) => {
      const { id, data } = action.payload;
      const index = state.list.findIndex((t) => t.id === id);
      if (index !== -1) state.list[index] = { ...state.list[index], ...data };
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },


    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateTodo, deleteTodo, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
