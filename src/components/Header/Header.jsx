import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-scroll";

export default function Header() {
  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    window.location.href = "/login";
    // xóa localStorage
    localStorage.removeItem("USER");
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

  return (
    <div className="h-20 w-full flex justify-between p-5 shadow-2xl bg-white fixed z-20">
      {/* quay về lại trang home*/}
      <NavLink to={"/"}>
        <img
          className="h-full"
          src="https://demo1.cybersoft.edu.vn/logo.png"
          alt=""
        />
      </NavLink>

      {/* thanh điều hướng */}
      <div className="flex items-center gap-x-20 px-5">
        <div className="flex gap-x-20 font-bold">
          <Link
            to="lichChieu"
            smooth={true}
            duration={1000}
            className="hover:bg-violet-700 hover:text-white cursor-pointer"
          >
            Lịch Chiếu
          </Link>
          <Link
            to="cumRap"
            smooth={true}
            duration={1000}
            className="hover:bg-violet-700 hover:text-white cursor-pointer"
          >
            Cụm Rạp
          </Link>
          <Link
            to="tinTuc"
            smooth={true}
            duration={1000}
            className="hover:bg-violet-700 hover:text-white cursor-pointer"
          >
            Tin Tức
          </Link>
          <Link
            to="ungDung"
            smooth={true}
            duration={1000}
            className="hover:bg-violet-700 hover:text-white cursor-pointer"
          >
            Ứng Dụng
          </Link>
        </div>

        {/* đăng nhập và đăng ký */}
        <div className="flex gap-x-5">
          {user && <div className="font-bold content-center">{user.hoTen}</div>}
          {user && (
            <Dropdown menu={{ items }} placement="bottomRight">
              <UserOutlined className="text-3xl border-2 rounded-full p-2" />
            </Dropdown>
          )}
          {!user && (
            <NavLink to="/login">
              <Button>Đăng nhập</Button>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/sign-up">
              <Button>Đăng ký</Button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
