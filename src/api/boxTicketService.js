import axios from "axios";
import { https } from "./config";

// lấy danh sách phòng vé
export const getListBoxTicket = (maLichChieu) => {
  const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
  return https.get(url);
};
