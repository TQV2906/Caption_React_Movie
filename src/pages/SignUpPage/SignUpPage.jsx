import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpService } from "../../api/userService";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = (user) => {
    signUpService(user)
      .then((res) => {
        navigate("/login");
        toast.success("Đăng ký thành công");
      })
      .catch((err) => {
        toast.error("Đăng ký thất bại!");
      });
  };

  const onFinish = (values) => {
    handleSignUp(values);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)`,
      }}
      className="h-lvh flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-3xl text-center p-5">Đăng ký</h1>
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
          initialValues={{
            taiKhoan: "loi",
            matKhau: "loi",
            email: "loi@gmail.com",
            soDt: "0123456789",
            maNhom: "GP01",
            hoTen: "loi",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* tài khoản */}
          <Form.Item
            label="Tài Khoản"
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
            label="Mật Khẩu"
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

          {/* nhập lại mât khẩu */}
          {/* <Form.Item
            label="Nhập lại mật khẩu"
            name="nhapLaiMatKhau"
            dependencies={["matKhau"]}
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matKhau") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item> */}

          {/* email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* số điện thoại */}
          <Form.Item
            label="Số điện thoại"
            name="soDt"
            rules={[
              {
                required: true,
                message: "Số điện thoại không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* mã nhóm */}
          <Form.Item label="Mã nhóm" name="maNhom">
            <Input />
          </Form.Item>

          {/* họ tên */}
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Họ tên không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
        <NavLink to={"/login"} className="underline text-blue-600">
          Bạn đã có tài khoản? Đăng nhập thôi nào
        </NavLink>
      </div>
    </div>
  );
}
