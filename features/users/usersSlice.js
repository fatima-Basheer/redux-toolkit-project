import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.list.findIndex((user) => user.id === id);
      if (index !== -1) state.list[index] = { ...state.list[index], ...data };
    },
    removeUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;