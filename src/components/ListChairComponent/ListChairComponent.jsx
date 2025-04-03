import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListChairComponent() {
  const { boxListChair } = useSelector((state) => {
    return state.boxTicketSlice;
  });

  const renderChair = () => {
    return boxListChair.map((chair, index) => {
      return (
        <Button
          key={chair.stt}
          color={"danger"}
          variant={chair.loaiGhe == "Vip" ? "solid" : ""}
          onClick={{}}
        >
          {chair.tenGhe}
        </Button>
      );
    });
  };
  return <div className="grid grid-cols-12 gap-1">{renderChair()}</div>;
}
