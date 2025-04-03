import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Rate,
  Switch,
  Upload,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { addMovieService } from "../../../api/movieService";
import toast from "react-hot-toast";
import { useFormik } from "formik";

export default function AdminAddMoviePage() {
  const [imgSrc, setImgSrc] = useState("Thêm hình");
  const navigate = useNavigate();

  const handleAddMovie = (formData) => {
    addMovieService(formData)
      .then((res) => {
        navigate("/admin/movies/add-movie");
        toast.success("Thêm phim thành công");
      })
      .catch((err) => {
        toast.error("Thêm phim thất bại");
      });
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      maNhom: "GP00",
      hinhAnh: {},
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      handleAddMovie(formData);
    },
  });

  // format lại datepicker mỗi lần chọn ngày
  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = value.format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // lấy data true/false của switch
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  // lấy data của inputNumber
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // chuyển đổi file
  const handleChangeFile = (e) => {
    // lấy file ra từ e
    const file = e.target.files[0];
    // kiểm tra định dạng của file
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      // tạo đối tượng để đọc file
      const reader = new FileReader();
      // đọc data của file
      reader.readAsDataURL(file);
      // gắn data hình base64 vào setImgSrc để render ra hình
      reader.onload = (e) => {
        setImgSrc(e.target.result); // hình base64
      };
    }
    // gắn file vào thuộc tính hinhAnh
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <div>
      <div className="px-20 py-8 flex flex-col items-center gap-5">
        <p className="text-3xl font-bold">THÊM PHIM</p>
        <Form
          // chuyển submit của Form cho formik
          onSubmitCapture={formik.handleSubmit}
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
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* hình ảnh */}
          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            rules={[
              {
                required: true,
                message: "Hình ảnh không được để trống!",
              },
            ]}
          >
            <input type="file" onChange={handleChangeFile} />
            <br />
            <img
              src={imgSrc}
              alt=""
              className="w-28 h-36 object-contain"
              accept="image/png, image/jpeg, image/gif, image/jpg"
            />
          </Form.Item>

          {/* trailer */}
          <Form.Item
            label="Trailer"
            rules={[
              {
                required: true,
                message: "Trailer không được để trống!",
              },
            ]}
          >
            <Input name="trailer" onChange={formik.handleChange} />
          </Form.Item>

          {/* tên phim */}
          <Form.Item
            label="Tên phim"
            rules={[
              {
                required: true,
                message: "Tên phim không được để trống!",
              },
            ]}
          >
            <Input name="tenPhim" onChange={formik.handleChange} />
          </Form.Item>

          {/* mô tả */}
          <Form.Item
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Mô tả không được để trống!",
              },
            ]}
          >
            <Input name="moTa" onChange={formik.handleChange} />
          </Form.Item>

          {/* ngày khởi chiếu */}
          <Form.Item
            label="Ngày khởi chiếu"
            name="ngayKhoiChieu"
            rules={[
              {
                required: true,
                message: "Ngày khởi chiếu không được để trống!",
              },
            ]}
          >
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handleChangeDatePicker}
            />
          </Form.Item>

          {/* đang chiếu */}
          <Form.Item label="Đang chiếu">
            <Switch onChange={handleChangeSwitch("dangChieu")} />
          </Form.Item>

          {/* sắp chiếu */}
          <Form.Item label="Sắp chiếu">
            <Switch onChange={handleChangeSwitch("sapChieu")} />
          </Form.Item>

          {/* hot */}
          <Form.Item label="Hot">
            <Switch onChange={handleChangeSwitch("hot")} />
          </Form.Item>

          {/* đánh giá */}
          <Form.Item
            label="Đánh giá"
            rules={[
              {
                required: true,
                message: "Đánh giá không được để trống!",
              },
            ]}
          >
            <InputNumber
              onChange={handleChangeInputNumber("danhGia")}
              min={1}
              max={10}
            />
          </Form.Item>

          {/* thêm phim*/}
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Thêm phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
