import { createSlice } from "@reduxjs/toolkit";

const userJson = localStorage.getItem("USER");

const initialState = {
  user: JSON.parse(userJson) ? JSON.parse(userJson) : {},
  listUser: [],
  userForm: {},
  findUser: [],
  // tài khoản xóa
  userDelete: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user = action.payload;
    },
    setActionListUser: (state, action) => {
      state.listUser = action.payload;
    },
    setActionUserForm: (state, action) => {
      state.userForm = action.payload;
    },
    setActionFindUser: (state, action) => {
      state.findUser = action.payload;
    },
    // tài khoản xóa
    setActionUserDelete: (state, action) => {
      state.userDelete = action.payload;
    },
  },
});

export const {
  setUserAction,
  setActionListUser,
  setActionUserForm,
  setActionFindUser,
  setActionUserDelete,
} = userSlice.actions;

export default userSlice.reducer;
