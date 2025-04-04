import { Table } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { datVeService } from "../../api/boxTicketService";
import toast from "react-hot-toast";

export default function PayComponent() {
  const { boxInfoMovie, danhSachGheDangDat } = useSelector((state) => {
    return state.boxTicketSlice;
  });

  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  const dataSource = [
    {
      name: (
        <div>
          <span>Cụm Rạp: </span>
        </div>
      ),
      total: (
        <div>
          <span>{boxInfoMovie.tenCumRap}</span>
        </div>
      ),
    },
    {
      name: (
        <div>
          <span>Địa chỉ: </span>
        </div>
      ),
      total: (
        <div>
          <span>{boxInfoMovie.diaChi}</span>
        </div>
      ),
    },
    {
      name: (
        <div>
          <span>Rạp: </span>
        </div>
      ),
      total: (
        <div>
          <span>{boxInfoMovie.tenRap}</span>
        </div>
      ),
    },
    {
      name: (
        <div>
          <span>Ngày giờ chiếu: </span>
        </div>
      ),
      total: (
        <div>
          <p>{boxInfoMovie.ngayChieu}</p>
          <p>{boxInfoMovie.gioChieu}</p>
        </div>
      ),
    },
    {
      name: (
        <div>
          <span>Tên phim: </span>
        </div>
      ),
      total: (
        <div>
          <span>{boxInfoMovie.tenPhim}</span>
        </div>
      ),
    },
    {
      name: (
        <div>
          <span>Chọn: </span>
        </div>
      ),
      total: (
        <div>
          <span className="text-green-400 text-xl">
            {_.sortBy(danhSachGheDangDat, ["maGhe"]).map((gheDD, index) => {
              return gheDD.tenGhe + ", ";
            })}
          </span>
        </div>
      ),
    },
  ];

  const columns = [
    {
      dataIndex: "name",
    },
    {
      dataIndex: "total",
    },
  ];

  const handleDatVe = (thongTinDatVe) => {
    // console.log("thongTinDatVe: ", thongTinDatVe);
    datVeService(thongTinDatVe, user.accessToken)
      .then((res) => {
        console.log("res: ", res);
        toast.success("Đặt vé thành công");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Đặt vé thất bại");
      });
  };

  return (
    <div className="w-[25%] h-full bg-purple-200 shadow-lg shadow-purple-500 flex flex-col justify-between">
      <div className="h-1/5 flex justify-center items-center border-b-2 border-black text-green-500 text-xl font-bold">
        {danhSachGheDangDat
          .reduce((tongTien, ghe) => {
            return (tongTien += ghe.giaVe);
          }, 0)
          .toLocaleString()}{" "}
        VND
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={true}
        pagination={false}
        // size="small"
        className="h-full border-4 rounded-xl"
      />
      <button
        className="h-[15%] border-t-2 border-black"
        onClick={() => {
          const thongTinDatVe = {
            maLichChieu: boxInfoMovie.maLichChieu,
            danhSachVe: danhSachGheDangDat,
          };
          handleDatVe(thongTinDatVe);
        }}
      >
        ĐẶT VÉ
      </button>
    </div>
  );
}
