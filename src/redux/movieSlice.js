import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMovie: [],
  listTheater: [],
  listAddressTheater: [],
  listMovieOfTheater: [],
  listMovieOfAddress: [],
  // detailMoviePage
  detailMovie: {},
  // thông tin lịch chiếu phim
  infoOfScheduleMovie: [],
  // data movieForm
  movieForm: {},
  // data tìm kiếm phim
  findMovie: [],
  // phim xóa
  movieDelete: {
    maPhim: "",
    tenPhim: "",
  },
  // tạp lịch chiếu
  createScheduleForm: {},
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setActionListMovie: (state, action) => {
      state.listMovie = action.payload;
    },
    setActionListTheater: (state, action) => {
      state.listTheater = action.payload;
    },
    setActionAddressTheater: (state, action) => {
      state.listAddressTheater = action.payload;
    },
    setActionMovieOfTheater: (state, action) => {
      state.listMovieOfTheater = action.payload;
    },
    setActionMovieOfAddress: (state, action) => {
      state.listMovieOfAddress = action.payload;
    },
    // detailMoviePage
    setActionDetailMovie: (state, action) => {
      state.detailMovie = action.payload;
    },
    // lấy thông tin lịch chiếu phim
    setActionInfoOfScheduleMovie: (state, action) => {
      state.infoOfScheduleMovie = action.payload;
    },
    // data movieForm
    setActionMovieForm: (state, action) => {
      state.movieForm = action.payload;
    },
    // data tìm kiếm phim
    setActionFindMovie: (state, action) => {
      state.findMovie = action.payload;
    },
    // phim xóa
    setActionMovieDelete: (state, action) => {
      state.movieDelete = action.payload;
    },
    // tạo lịch chiếu
    setActionCreateScheduleMovie: (state, action) => {
      state.createScheduleForm = action.payload;
    },
  },
});

export const {
  setActionListMovie,
  setActionListTheater,
  setActionAddressTheater,
  setActionMovieOfTheater,
  setActionMovieOfAddress,
  setActionDetailMovie,
  setActionInfoOfScheduleMovie,
  setActionMovieForm,
  setActionFindMovie,
  setActionMovieDelete,
  setActionCreateScheduleMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
