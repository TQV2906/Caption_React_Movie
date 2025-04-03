import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "../../api/userService";
import { toast } from "react-hot-toast";
import { setUserAction } from "../../redux/userSlice";

export default function LoginPage() {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => {
    return state.userSlice.user.maLoaiNguoiDung;
  });

  // kiểm tra Role
  useEffect(() => {
    if (userRole) {
      if (userRole.includes("khachHang")) {
        navigate("/");
      } else if (userRole.includes("KhachHang")) {
        navigate("/");
      } else if (userRole.includes("QuanTri")) {
        navigate("/admin/users");
      } else {
        console.error("Vai trò không hợp lệ");
      }
    } else {
      // Có thể chuyển hướng đến trang đăng nhập nếu chưa có thông tin vai trò
      navigate("/login");
    }
  }, [userRole, navigate]);

  const handleLogin = (user) => {
    loginService(user)
      .then((res) => {
        const user = res.data.content;
        const action = setUserAction(user);
        dispatch(action);
        toast.success("Đăng nhập thành công");

        // dùng localStorage để lưu data, tránh mất data khi reload trang
        const userJson = JSON.stringify(user);
        localStorage.setItem("USER", userJson);
      })
      .catch((err) => {
        toast.error("Tài khoản hoặc mật khẩu không đúng!");
      });
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)`,
      }}
      className="h-lvh flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-3xl text-center p-5">Đăng nhập</h1>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* tài khoản */}
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Tài khoản không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* mật khẩu */}
          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <NavLink to={"/sign-up"} className="underline text-blue-700">
          Bạn chưa có tài khoản? Đăng ký thôi nào.
        </NavLink>
      </div>
    </div>
  );
}
