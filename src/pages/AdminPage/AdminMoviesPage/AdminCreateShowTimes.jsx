import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink } from "react-router-dom";

export default function AdminCreateShowTimes() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        backgroundImage: `url(https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)`,
      }}
      className="h-lvh flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded-lg">
        Tạo lịch chiếu
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* hệ thống rạp */}
          <Form.Item
            label="Hệ thống rạp"
            name="username"
            rules={[
              {
                required: true,
                message: "Tài khoản không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* cụm rạp */}
          <Form.Item
            label="Cụm rạp"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* thời gian chiếu */}
          <Form.Item
            label="Thời gian chiếu"
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* giá vé */}
          <Form.Item
            label="Giá vé"
            name="username"
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
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
        <NavLink to={"/admin/movies"}>Quay lại</NavLink>
      </div>
    </div>
  );
}
