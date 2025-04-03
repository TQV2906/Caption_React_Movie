import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setActionModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setActionModal } = modalSlice.actions;

export default modalSlice.reducer;
