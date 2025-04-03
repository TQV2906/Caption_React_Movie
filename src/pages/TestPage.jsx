import { Button, Card, Drawer, Menu, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import HeaderTest from "../components/Header/HeaderTest";

export default function MovieSchedule({ content }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    window.location.href = "/login";
    // xóa localStorage
    localStorage.removeItem("USER");
  };

  const items = [
    {
      key: "user",
      label: "User",
      icon: <UserOutlined />,
      children: [
        { key: "/admin/users", label: "Danh sách người dùng" },
        { key: "/admin/users/add-user", label: "Thêm người dùng" },
      ],
    },
    {
      key: "movie",
      label: "Movie",
      icon: <VideoCameraOutlined />,
      children: [
        { key: "/admin/movies", label: "Danh sách phim" },
        { key: "/admin/movies/add-movie", label: "Thêm phim" },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <Button onClick={handleLogout} className="w-full">
          <LogoutOutlined />
          Logout
        </Button>
      ),
      // icon: ,
      danger: true,
    },
  ];

  const Content = () => {
    return <div className="w-full">{content}</div>;
  };

  return (
    <div className="w-full">
      <HeaderTest />
      <div className="flex bg-[#CFD4FC]">
        <Menu
          onClick={({ key }) => {
            if (key === "logout") {
            } else {
              navigate(key);
            }
          }}
          style={{
            width: 256,
            backgroundColor: "#CFD4FC",
            borderRight: "1px solid",
          }}
          defaultSelectedKeys={["/admin/users"]}
          defaultOpenKeys={["user"]}
          mode={window.innerWidth >= 640 ? "inline" : "vertical"}
          items={items}
        />
        {/* <Drawer
          placement="left"
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          closable={true}
        >
          <MenuPhone />
        </Drawer> */}
        <Content />
      </div>
    </div>
  );
}
