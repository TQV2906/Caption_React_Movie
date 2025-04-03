import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // phòng vé
  boxListChair: [],
  boxInfoMovie: [],
};

const boxTicketSlice = createSlice({
  name: "boxTicketSlice",
  initialState,
  reducers: {
    // phòng vé
    setActionBoxListChair: (state, action) => {
      state.boxListChair = action.payload;
    },
    setActionBoxInfoMovie: (state, action) => {
      state.boxInfoMovie = action.payload;
    },
  },
});

export const { setActionBoxListChair, setActionBoxInfoMovie } =
  boxTicketSlice.actions;

export default boxTicketSlice.reducer;
