import axios from "axios";
import { CYBER_TOKEN, https } from "./config";

// lấy danh sách phòng vé
export const getListBoxTicketService = (maLichChieu) => {
  const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
  return https.get(url);
};

// nhấn nút đặt vé
export const datVeService = (thongTinDatVe, accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
    method: "POST",
    data: thongTinDatVe,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};

// Thông tin đặt vé của user
export const getThongTinNguoiDung = (accessToken) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBER_TOKEN,
    },
  });
};
