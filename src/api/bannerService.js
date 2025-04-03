import { https } from "./config";

export const getListBannerService = () => {
  return https.get("/api/QuanLyPhim/LayDanhSachBanner");
};
