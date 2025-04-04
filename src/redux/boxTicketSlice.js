import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // phòng vé
  boxListChair: [],
  boxInfoMovie: [],
  // ghế được chọn
  danhSachGheDangDat: [],
  // thông tin đặt vé của user
  thongTinNguoiDung: [],
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
    // ghế được chọn
    setActionGheDangDat: (state, action) => {
      const danhSachGheDangDat = [...state.danhSachGheDangDat];
      const index = danhSachGheDangDat.findIndex((gheDD) => {
        return gheDD.maGhe === action.payload.maGhe;
      });
      if (index != -1) {
        danhSachGheDangDat.splice(index, 1);
      } else {
        danhSachGheDangDat.push(action.payload);
      }
      return { ...state, danhSachGheDangDat: danhSachGheDangDat };
    },
    // thông tin đặt vé của user
    setActionThongTinNguoiDung: (state, action) => {
      state.thongTinNguoiDung = action.payload;
    },
  },
});

export const {
  setActionBoxListChair,
  setActionBoxInfoMovie,
  setActionGheDangDat,
  setActionThongTinNguoiDung,
} = boxTicketSlice.actions;

export default boxTicketSlice.reducer;
