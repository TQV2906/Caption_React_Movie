import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StyleChairComponent.css";
import { setActionGheDangDat } from "../../redux/boxTicketSlice";
import { UserOutlined } from "@ant-design/icons";

export default function ListChairComponent() {
  const dispatch = useDispatch();

  const { boxListChair, danhSachGheDangDat } = useSelector((state) => {
    return state.boxTicketSlice;
  });

  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  const chonGhe = (values) => {
    return dispatch(setActionGheDangDat(values));
  };

  const renderChair = () => {
    return boxListChair.map((chair, index) => {
      const gheVip = chair.loaiGhe === "Vip" ? "gheVip" : "";
      const gheDaDat = chair.daDat === true ? "gheDaDat" : "";
      let gheDangDat = "";
      let gheDaDuocDat = "";

      if (chair.taiKhoanNguoiDat === user.taiKhoan) {
        gheDaDuocDat = "gheDaDuocDat";
      }

      const indexGheDD = danhSachGheDangDat.findIndex((gheDD) => {
        return gheDD.maGhe === chair.maGhe;
      });

      if (indexGheDD != -1) {
        gheDangDat = "gheDangDat";
      }

      return (
        <>
          <button
            key={index}
            onClick={() => chonGhe(chair)}
            disabled={chair.daDat}
            className={`ghe ${gheVip} ${gheDaDat} ${gheDangDat} ${gheDaDuocDat}`}
          >
            {gheDaDat ? (
              gheDaDuocDat != "" ? (
                <UserOutlined />
              ) : (
                "X"
              )
            ) : (
              chair.tenGhe
            )}
          </button>
          {(index + 1) % 16 == 0 ? <br /> : ""}
        </>
      );
    });
  };
  return <div>{renderChair()}</div>;
}
