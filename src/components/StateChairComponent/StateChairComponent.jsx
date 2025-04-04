import { Button } from "antd";
import React from "react";
import "../ListChairComponent/StyleChairComponent.css";
import "./StateChairComponent.css";
import { UserOutlined } from "@ant-design/icons";

export default function StateChairComponent() {
  return (
    <div className="w-[5%] flex flex-col justify-center items-center">
      <div className="text-center">
        <button className="ghe gheDaDuocDat">
          <UserOutlined />
        </button>
        <p>Tôi đã đặt</p>
      </div>
      <div className="text-center">
        <button className="ghe gheDaDat">X</button>
        <p>Đã đặt</p>
      </div>
      <div className="text-center">
        <button className="ghe">X</button>
        <p>Thường</p>
      </div>
      <div className="text-center">
        <button className="ghe gheVip">X</button>
        <p>Vip</p>
      </div>
    </div>
  );
}
