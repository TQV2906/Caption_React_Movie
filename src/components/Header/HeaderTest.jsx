import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer, Dropdown } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function HeaderTest() {
  // const windowSize = useWindowSize();
  const [openNav, setOpenNav] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.userSlice;
  });
  const handleLogout = () => {
    console.log("logout");
  };
  const items = [
    {
      type: "divider",
    },
    {
      icon: <LogoutOutlined className="text-blue-600" />,
      label: (
        <span className="text-blue-600" onClick={handleLogout}>
          Đăng xuất
        </span>
      ),
      key: "0",
    },
  ];

  const HeaderPhone = ({ isInline }) => {
    const check = isInline ? "hidden" : "";
    return (
      <div
        className={`h-20 ${check} flex-col justify-items-start shadow-2xl mx-5 sm:flex sm:flex-row sm:justify-between`}
      >
        <img
          className="h-full w-52"
          src="https://demo1.cybersoft.edu.vn/logo.png"
          alt=""
        />
        <div className="content-center flex flex-row-reverse items-center gap-5 sm:flex-row">
          <p className="text-xl font-bold">{user.hoTen}</p>
          <Dropdown menu={{ items }} placement="bottomRight">
            <UserOutlined className="text-3xl border-2 rounded-full p-2" />
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-3 text-2xl sm:hidden">
        <MenuOutlined
          onClick={() => {
            setOpenNav(true);
          }}
        />
      </div>
      <HeaderPhone isInline={true} />
      <Drawer
        placement="left"
        open={openNav}
        onClose={() => {
          setOpenNav(false);
        }}
        closable={true}
      >
        <HeaderPhone isInline={false} />
      </Drawer>
    </div>
  );
}
