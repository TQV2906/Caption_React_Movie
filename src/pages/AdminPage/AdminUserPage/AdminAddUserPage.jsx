import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { addUserService } from "../../../api/userService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AdminAddUserPage() {
  const [form] = Form.useForm();
  // biến resetForm khi thêm thành công

  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  const handleAddUser = (userData) => {
    addUserService(userData, user.accessToken)
      .then((res) => {
        form.resetFields();
        toast.success("Thêm thành công");
      })
      .catch((err) => {
        toast.error("Thêm thất bại");
      });
  };

  const onFinish = (values) => {
    console.log("values: ", values);
    handleAddUser(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="h-[615px] px-20 py-8 flex flex-col items-center gap-5">
        <p className="text-3xl font-bold">THÊM NGƯỜI DÙNG</p>
        <Form
          form={form}
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
            maNhom: "GP00",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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

          {/* matKhau */}
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
            name="soDT"
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
          <Form.Item
            label="Mã nhóm"
            name="maNhom"
            rules={[
              {
                required: true,
                message: "Mã nhóm không được để trống!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          {/* maLoaiNguoiDung */}
          <Form.Item
            label="Loại người dùng"
            name="maLoaiNguoiDung"
            rules={[
              {
                required: true,
                message: "Loại người dùng không được để trống!",
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "KhachHang",
                  value: "khachHang",
                },
                {
                  label: "QuanTri",
                  value: "quanTri",
                },
              ]}
            />
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

          {/* thêm user */}
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Thêm người dùng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
