import axios from "axios";
import { CYBER_TOKEN, https } from "./config";

// lấy list phim
export const getListMovieService = () => {
  return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00");
};

// lấy list thông tin hệ thống rạp
export const getListTheaterService = () => {
  return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
};

// lấy list thông tin cụm rạp theo hệ thống
export const getListAddressTheaterService = (maHeThongRap) => {
  const url = `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`;
  return https.get(url);
};

// lấy thông tin lịch chiếu hệ thống rạp
export const getListMovieOfTheaterService = (maHeThongRap) => {
  const url = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP00`;
  return https.get(url);
};

// lấy thông tin chi tiết phim
export const getDetailMovieService = (idMovie) => {
  const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idMovie}`;
  return https.get(url);
};

// lấy thông tin lịch chiếu phim
export const getInfoOfScheduleMovie = (idMovie) => {
  const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`;
  return https.get(url);
};

// cập nhật phim
export const updateMovieService = (formData, accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
    method: "POST",
    data: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// xóa phim
export const deleteMovieService = (maPhim, accessToken) => {
  return axios({
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// thêm phim
export const addMovieService = (formData) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
    method: "POST",
    data: formData,
    headers: {
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// tìm kiếm phim
export const findMovieService = (tenPhim) => {
  const url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim}`;
  return https.get(url);
};

// tạo lịch chiếu phim
export const createScheduleMovie = (scheduleMovie, accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
    method: "POST",
    data: scheduleMovie,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};
