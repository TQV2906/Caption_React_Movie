import axios from "axios";
import { CYBER_TOKEN, https } from "./config";

export const loginService = (user) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
    method: "POST",
    data: user,
    headers: {
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

export const signUpService = (user) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
    method: "POST",
    data: user,
    headers: {
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// lấy danh sách user
export const getListUserService = () => {
  const url = "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00";
  return https.get(url);
};

// cập nhật user
export const updateInfoUserService = (user, accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    method: "POST",
    data: user,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// xóa user
export const deleteUserService = (taiKhoan, accessToken) => {
  return axios({
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// thêm user
export const addUserService = (user, accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
    method: "POST",
    data: user,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// tìm kiếm người dùng
export const findUserService = (key) => {
  const url = `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${key}`;
  return https.get(url);
};
