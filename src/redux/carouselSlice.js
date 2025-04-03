import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCarousel: [],
};

const carouselSlice = createSlice({
  name: "carouselSlice",
  initialState,
  reducers: {
    setActionCarousel: (state, action) => {
      state.listCarousel = action.payload;
    },
  },
});

export const { setActionCarousel } = carouselSlice.actions;

export default carouselSlice.reducer;
