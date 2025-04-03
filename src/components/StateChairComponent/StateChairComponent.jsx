import { Button } from "antd";
import React from "react";

export default function StateChairComponent() {
  return (
    <div className="w-[5%] flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="w-14 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded m-1">
          X
        </div>
        Đã đăt
      </div>
      <div className="text-center">
        <Button className="w-16">X</Button>
        <span>Thường</span>
      </div>
      <div className="text-center">
        <Button color="danger" variant="solid" className="w-16">
          X
        </Button>
        <span>Vip</span>
      </div>
    </div>
  );
}
