import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function PayComponent() {
  const { boxInfoMovie } = useSelector((state) => {
    return state.boxTicketSlice;
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
          <span>Ngày giở chiếu: </span>
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
          <span>Ghế 15</span>
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

  return (
    <div className="w-2/5 h-full bg-purple-200 shadow-lg shadow-purple-500 flex flex-col justify-between">
      <div className="h-1/5 flex justify-center items-center border-b-2 border-black">
        0 VND
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={true}
        pagination={false}
        // size="small"
        className="h-full border-4 rounded-xl"
      />
      <button className="h-[15%] border-t-2 border-black">ĐẶT VÉ</button>
    </div>
  );
}
