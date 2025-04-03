import { Button, Form, Input } from "antd";
import React, { useState } from "react";

export default function AppTest() {
  const [form] = Form.useForm(); // Lấy instance form

  const handleSetValue = () => {
    form.setFieldsValue({
      name: "hello",
      email: "hi@gmail.com",
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <Form form={form} name="basic" onFinish={onFinish}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input type="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={handleSetValue} style={{ marginLeft: 8 }}>
          Set Values
        </Button>
      </Form.Item>
    </Form>
  );
}
