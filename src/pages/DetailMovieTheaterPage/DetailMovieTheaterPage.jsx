import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionBoxInfoMovie,
  setActionBoxListChair,
  setActionThongTinNguoiDung,
} from "../../redux/boxTicketSlice";
import {
  getListBoxTicketService,
  getThongTinNguoiDung,
} from "../../api/boxTicketService";
import ListChairComponent from "../../components/ListChairComponent/ListChairComponent";
import StateChairComponent from "../../components/StateChairComponent/StateChairComponent";
import PayComponent from "../../components/PayComponent/PayComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Tabs } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
const { TabsPane } = Tabs;
const { Meta } = Card;

export default function DetailMovieTheaterPage() {
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    getListBoxTicketService(params.maLichChieu)
      .then((res) => {
        const action = res.data.content;
        dispatch(setActionBoxListChair(action.danhSachGhe));
        dispatch(setActionBoxInfoMovie(action.thongTinPhim));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const DatVeVaThanhToan = () => {
    return (
      <div className="h-lvh flex">
        {/* chọn ghế */}
        <div className="w-[70%] h-full flex flex-col items-center gap-5">
          <h1 className="mt-5">Màn Hình</h1>
          <ListChairComponent />
        </div>

        {/* thông tin ghế */}
        <StateChairComponent />

        {/* thanh toán */}
        <PayComponent />
      </div>
    );
  };

  const KetQuaDatVe = () => {
    const { user } = useSelector((state) => {
      return state.userSlice;
    });

    const { thongTinNguoiDung } = useSelector((state) => {
      return state.boxTicketSlice;
    });
    console.log("thongTinNguoiDung: ", thongTinNguoiDung);

    useEffect(() => {
      getThongTinNguoiDung(user.accessToken)
        .then((res) => {
          const action = res.data.content;
          dispatch(setActionThongTinNguoiDung(action));
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }, []);

    const renderLichSuDatVe = () => {
      return thongTinNguoiDung.thongTinDatVe?.map((movie) => {
        const newTime = dayjs(movie.ngayDat);
        const newGhe = _.first(movie.danhSachGhe);
        return (
          <Card
            className="w-80 border-black flex p-2"
            cover={
              <div>
                <img
                  alt="example"
                  src={movie.hinhAnh}
                  className="w-20 object-cover rounded-md"
                />
              </div>
            }
          >
            <Meta
              title={movie.tenPhim}
              description={
                <div>
                  <p>
                    <span className="font-bold">Ngày đặt: </span>
                    {newTime.format("DD-MM-YYYY ~ hh:mm")}
                  </p>
                  <p>
                    <span className="font-bold">Địa điểm: </span>
                    {newGhe.maHeThongRap} - {newGhe.tenHeThongRap}
                  </p>
                  <p>
                    <span className="font-bold">{newGhe.tenRap} </span>
                    <span className="font-bold">- Ghế: </span>
                    {movie.danhSachGhe.map((ghe, index) => {
                      return "(" + ghe.tenGhe + ")";
                    })}
                  </p>
                </div>
              }
            />
          </Card>
        );
      });
    };

    return (
      <div>
        <h1 className="text-center text-5xl m-5">LỊCH SỬ ĐẶT VÉ</h1>
        <div className="grid grid-cols-4 gap-2">{renderLichSuDatVe()}</div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <Tabs>
        <TabsPane key={0} tab={"1 - Đặt Vé & Thanh Toán"}>
          {/* {DatVeVaThanhToan()} */}
        </TabsPane>
        <TabsPane key={1} tab={"2 - Kết Quả Đặt Vé"}>
          {KetQuaDatVe()}
        </TabsPane>
      </Tabs>
    </div>
  );
}
