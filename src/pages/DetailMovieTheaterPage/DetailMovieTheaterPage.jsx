import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionBoxInfoMovie,
  setActionBoxListChair,
} from "../../redux/boxTicketSlice";
import { getListBoxTicket } from "../../api/boxTicketService";
import ListChairComponent from "../../components/ListChairComponent/ListChairComponent";
import StateChairComponent from "../../components/StateChairComponent/StateChairComponent";
import PayComponent from "../../components/PayComponent/PayComponent";

export default function DetailMovieTheaterPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    getListBoxTicket(47885)
      .then((res) => {
        const action = res.data.content;
        dispatch(setActionBoxListChair(action.danhSachGhe));
        dispatch(setActionBoxInfoMovie(action.thongTinPhim));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  return (
    <div className="h-lvh flex pt-20">
      {/* chọn ghế */}
      <div className="w-[55%] h-full flex flex-col items-center gap-5">
        <h1 className="mt-5">Màn Hình</h1>
        <ListChairComponent />
      </div>

      {/* thông tin ghế */}
      <StateChairComponent />

      {/* thanh toán */}
      <PayComponent />
    </div>
  );
}
