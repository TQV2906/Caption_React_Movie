import React, { useState } from "react";
import { Button, Form, Tabs, Input, Card, Table, Radio } from "antd";

export default function UserInfoPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let renderInfoUser = () => {
    return (
      <div>
        <Form
          disabled={true}
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
          {/* tài khoản */}
          <Form.Item
            label="Tài Khoản"
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

          {/* mật khẩu */}
          <Form.Item
            label="Mật Khẩu"
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

          {/* họ tên */}
          <Form.Item
            label="Họ tên"
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

          {/* email */}
          <Form.Item
            label="Email"
            name="username"
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
            name="username"
            rules={[
              {
                required: true,
                message: "Email không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </div>
    );
  };

  const [bottom, setBottom] = useState("bottomRight");

  //   data gắn vào bảng
  const dataSource = [
    {
      key: "1",
      card: (
        <Card
          size="small"
          variant="outlined"
          style={{
            width: "100%",
            border: "1px solid black",
          }}
        >
          <div className="flex gap-5">
            <img
              src="https://files.betacorp.vn/media%2fimages%2f2025%2f03%2f01%2f400x633%2D6%2D170323%2D010325%2D66.jpg"
              alt=""
              className="w-20"
            />
            <div>
              <p>SÁT THỦ VÔ CÙNG CỰC HÀI</p>
              <p>Beta Cinema</p>
              <p>647 Đ. Quang Trung, Phường 11, Gò Vấp, Hồ Chí Minh</p>
              <p className="bg-gray-300">
                Ngày đặt: 14/03/2025 14:20:00 - Rạp 2 - Ghế 75
              </p>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  //   tiêu đề bảng
  const columns = [
    {
      dataIndex: "card",
    },
  ];

  let renderBookingHistory = () => {
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          size="small"
          className="border-4"
        />
        <Radio.Group
          value={bottom}
          onChange={(e) => {
            setBottom(e.target.value);
          }}
          size="large"
        />
      </div>
    );
  };
  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: renderInfoUser(),
    },
    {
      key: "2",
      label: "Lịch sử đặt vé",
      children: renderBookingHistory(),
    },
  ];

  return (
    <div className="h-lvh flex pt-20">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
