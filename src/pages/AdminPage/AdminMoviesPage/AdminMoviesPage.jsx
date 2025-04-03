import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { NavLink } from "react-router-dom";
import {
  createScheduleMovie,
  deleteMovieService,
  findMovieService,
  getListAddressTheaterService,
  getListMovieService,
  getListTheaterService,
  updateMovieService,
} from "../../../api/movieService";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionAddressTheater,
  setActionCreateScheduleMovie,
  setActionFindMovie,
  setActionListMovie,
  setActionListTheater,
  setActionMovieDelete,
  setActionMovieForm,
} from "../../../redux/movieSlice";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  EditFilled,
  EyeOutlined,
  LockOutlined,
  PlusOutlined,
  StarOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const { Search } = Input;

export default function AdminMoviesPage() {
  const [form] = Form.useForm();
  const [formCreate] = Form.useForm();
  // biến khóa form Modal updaete
  const [lock, setLock] = useState(true);
  // biến mở Modal trailer
  const [isModalTrailer, setIsModalTrailer] = useState(false);
  // biến mở Modal update
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  // biến mở Modal delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  // biến mở Modal create schedule movie
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  // biến mở cụm rạp
  const [isSelectAddressTheater, setIsSelectAddressTheater] = useState(false);
  // biến mở rạp
  const [isSelectRoom, setIsSelectRoom] = useState(false);
  // biến danh sách rạp
  const [newRap, setNewRap] = useState([]);
  // biến link trailer
  const [urlTrailer, setUrlTrailer] = useState("");
  // biến phân trang
  const [bottom, setBottom] = useState("bottomRight");
  // biến render hình update
  const [imgSrcUpdate, setImgSrcUpdate] = useState("");
  // biến render hình create schedule
  const [imgSrcCreateSchedule, setImgSrcCreateSchedule] = useState("");
  // biến data tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  const [reFindAfterUpdate, setReFindAfterUpdate] = useState(false);

  const dispatch = useDispatch();

  const {
    listMovie,
    movieForm,
    findMovie,
    movieDelete,
    listTheater,
    listAddressTheater,
    createScheduleForm,
  } = useSelector((state) => {
    return state.movieSlice;
  });

  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  // tìm phim
  useEffect(() => {
    // sau khi cập nhật phim và tìm kiếm = "" => gọi api render lại listMovie
    // sau khi cập nhật phim và tìm kiếm = data => gọi api render lại findMovie
    console.log(findMovie);
    reFindAfterUpdate == true && searchValue == ""
      ? getListMovieService()
          .then((res) => {
            console.log(findMovie);
            const action = res.data.content;
            dispatch(setActionListMovie(action));
            setReFindAfterUpdate(false);
          })
          .catch((err) => {})
      : findMovieService(searchValue)
          .then((res) => {
            const action = res.data.content;
            dispatch(setActionFindMovie(action));
            setReFindAfterUpdate(false);
          })
          .catch((err) => {});
  }, [searchValue, reFindAfterUpdate]);

  // kết thúc tìm kiếm phim
  const onSearch = (value, _e) => {
    console.log("value: ", value);
    return setSearchValue(value);
  };

  // lấy list thông tin hệ thống rạp
  useEffect(() => {
    getListTheaterService()
      .then((res) => {
        const action = res.data.content;
        dispatch(setActionListTheater(action));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [imgSrcCreateSchedule]);

  // lấy danh sách phim khi lần đầu load trang
  useEffect(() => {
    getListMovieService()
      .then((res) => {
        dispatch(setActionListMovie(res.data.content));
      })
      .catch((err) => {});
  }, []);

  // xóa phim
  const handleDeleteMovie = (maPhim) => {
    deleteMovieService(maPhim, user.accessToken)
      .then((res) => {
        console.log("res: ", res);
        onCancelDelete();
        setReFindAfterUpdate(true);
        toast.success("Xóa phim thành công");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Xóa phim thất bại");
      });
  };

  // tạo lịch chiéu phim
  const handleCreateScheduleMovie = (scheduleMovie) => {
    createScheduleMovie(scheduleMovie, user.accessToken)
      .then((res) => {
        onCancelCreate();
        toast.success("Tạo lịch chiếu thành công");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error(err.response.data.content, { duration: 10000 });
      });
  };

  // kiểm tra yes no
  const check = (kt) => {
    return kt == true ? (
      <CheckCircleOutlined className="text-green-500 text-xl" />
    ) : (
      <CloseCircleOutlined className="text-red-500 text-xl" />
    );
  };

  const dataFindMovie = () => {
    return findMovie.map((movie) => {
      return {
        maPhim: movie.maPhim,
        hinhAnh: <img src={movie.hinhAnh} alt="" className="w-20" />,
        trailer: (
          <Button
            type="primary"
            onClick={() => showModalTrailer(movie.trailer)}
          >
            <EyeOutlined />
          </Button>
        ),
        tenPhim: movie.tenPhim,
        moTa: movie.moTa,
        ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY"),
        dangChieu: check(movie.dangChieu),
        sapChieu: check(movie.sapChieu),
        hot: check(movie.hot),
        danhGia: (
          <p>
            {movie.danhGia}
            <StarOutlined className="text-yellow-500 text-xl" />
          </p>
        ),
        action: (
          <div className="flex flex-wrap gap-2">
            <EditFilled
              className="text-blue-500 text-xl"
              onClick={() => showModalUpdate(movie.maPhim)}
            />
            <DeleteFilled
              className="text-red-500 text-xl"
              onClick={() => {
                showModalDelete(movie.maPhim, movie.tenPhim);
              }}
            />
            <CalendarOutlined
              className="text-green-500 text-xl"
              onClick={() => {
                showModalCreate(movie.maPhim);
              }}
            />
          </div>
        ),
      };
    });
  };

  const dataMovie = () => {
    return listMovie.map((movie) => {
      return {
        maPhim: movie.maPhim,
        hinhAnh: <img src={movie.hinhAnh} alt="" className="w-20" />,
        trailer: (
          <Button
            type="primary"
            onClick={() => showModalTrailer(movie.trailer)}
          >
            <EyeOutlined />
          </Button>
        ),
        tenPhim: movie.tenPhim,
        moTa: movie.moTa,
        ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY"),
        dangChieu: check(movie.dangChieu),

        sapChieu: check(movie.sapChieu),
        hot: check(movie.hot),
        danhGia: (
          <p>
            {movie.danhGia}
            <StarOutlined className="text-yellow-500 text-xl" />
          </p>
        ),
        action: (
          <div className="flex flex-wrap gap-2">
            <EditFilled
              className="text-blue-500 text-xl"
              onClick={() => showModalUpdate(movie.maPhim)}
            />
            <DeleteFilled
              className="text-red-500 text-xl"
              onClick={() => {
                showModalDelete(movie.maPhim, movie.tenPhim);
              }}
            />
            <CalendarOutlined
              className="text-green-500 text-xl"
              onClick={() => {
                showModalCreate(movie.maPhim);
              }}
            />
          </div>
        ),
      };
    });
  };

  //   data gắn vào bảng
  const dataSource =
    findMovie == "Không tìm thấy phim !" ? dataMovie() : dataFindMovie();

  // mở Modal trailer
  const showModalTrailer = (url) => {
    setUrlTrailer(url);
    return setIsModalTrailer(true);
  };

  // đóng Modal trailer
  const onCancelTrailer = () => {
    // setUrlTrailer("");
    return setIsModalTrailer(false);
  };

  // mở Modal update
  const showModalUpdate = (maPhim) => {
    const fixMovie = listMovie.find((movie) => {
      return movie.maPhim == maPhim;
    });
    dispatch(setActionMovieForm(fixMovie));
    setImgSrcUpdate(fixMovie.hinhAnh);
    return setIsModalOpenUpdate(true);
  };

  // đóng Modal update
  const onCancelUpdate = () => {
    // form.resetFields();
    setImgSrcUpdate("");
    setLock(true);
    setIsModalOpenUpdate(false);
  };

  const showModalDelete = (maPhim, tenPhim) => {
    dispatch(setActionMovieDelete({ maPhim: maPhim, tenPhim: tenPhim }));
    return setIsModalOpenDelete(true);
  };

  const onCancelDelete = () => {
    dispatch(setActionMovieDelete(""));
    return setIsModalOpenDelete(false);
  };

  const showModalCreate = (maPhim) => {
    const createSchedule = listMovie.find((movie) => {
      return movie.maPhim == maPhim;
    });
    dispatch(setActionCreateScheduleMovie(createSchedule));
    setImgSrcCreateSchedule(createSchedule.hinhAnh);
    return setIsModalOpenCreate(true);
  };

  const onCancelCreate = () => {
    formCreate.resetFields();
    setIsSelectAddressTheater(false);
    setIsSelectRoom(false);
    setIsModalOpenCreate(false);
  };

  const handleUpdateMovie = (formData) => {
    updateMovieService(formData, user.accessToken)
      .then((res) => {
        onCancelUpdate();
        setReFindAfterUpdate(true);
        toast.success("Cập nhật phim thành công");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Cập nhật phim thất bại");
      });
  };

  //   tiêu đề bảng
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
    },
    {
      title: "Đang chiếu",
      dataIndex: "dangChieu",
    },
    {
      title: "Sắp chiếu",
      dataIndex: "sapChieu",
    },
    {
      title: "Hot",
      dataIndex: "hot",
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];

  // kết thúc form cập nhật => nêu thành công
  const onFinishUpdate = (values) => {
    values.maPhim = movieForm.maPhim;
    values.maNhom = "GP00";
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");

    const formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
        if (values.hinhAnh !== null) {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
    }
    console.log(formData.get("File"));
    handleUpdateMovie(formData);
  };

  // kết thúc form cập nhật => nếu thất bại
  const onFinishFailedUpdate = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // kết thúc form tạo lịch chiếu => nếu thành công
  const onFinishCreate = (values) => {
    const newValues = {};
    values.maRap = values.cumRap;
    values.maPhim = createScheduleForm.maPhim;
    values.ngayChieuGioChieu = values.ngayChieuGioChieu.format(
      "DD/MM/YYYY hh:mm:ss"
    );

    // for (let key in values) {
    //   if (key !== "cumRap" && key !== "heThongRap") {
    //     newValues[key] = values[key];
    //   }
    // }
    console.log("values: ", values);
    handleCreateScheduleMovie(values);
  };

  const onFinishFailedCreate = (errorInfo) => {
    console.log("errorInfo: ", errorInfo);
  };

  // kêt thúc form tạo lịch chiếu => nếu thất bại

  // kiểm tra khóa Modal update
  function onChange(checked) {
    setLock(checked);
  }

  const handleChangeDatePicker = (value) => {
    form.setFieldValue("ngayKhoiChieu", value);
  };

  // chuyển đổi file
  const handleChangeFile = async (e) => {
    // lấy file ra từ e
    const file = e.target.files[0];
    // kiểm tra định dạng của file
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      await form.setFieldValue("hinhAnh", file);
      // tạo đối tượng để đọc file
      const reader = new FileReader();
      // đọc data của file
      reader.readAsDataURL(file);
      // gắn data hình base64 vào setImgSrcUpdate để render ra hình
      reader.onload = (e) => {
        setImgSrcUpdate(e.target.result); // hình base64
      };
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      hinhAnh: null,
      trailer: movieForm.trailer,
      tenPhim: movieForm.tenPhim,
      moTa: movieForm.moTa,
      ngayKhoiChieu: dayjs(movieForm.ngayKhoiChieu),
      dangChieu: movieForm.dangChieu,
      sapChieu: movieForm.sapChieu,
      hot: movieForm.hot,
      danhGia: movieForm.danhGia,
    });
  }, [movieForm]);

  // render options hệ thống rạp
  const theater = listTheater.map((theater) => {
    return {
      label: theater.tenHeThongRap,
      value: theater.maHeThongRap,
    };
  });

  // khi thay đổi options theater
  const handleChangeTheater = (value) => {
    // set cụm rạp = null => khi thay đổi theater
    formCreate.setFieldsValue({ cumRap: null, maRap: null });
    // mở select cụm rạp
    setIsSelectAddressTheater(true);
    // tắt select rạp
    setIsSelectRoom(false);
    // gọi api lấy danh sách cụm rạp (trong đó có danh sách rạp rồi)
    getListAddressTheaterService(value)
      .then((res) => {
        const action = res.data.content;
        // đẩy data danh sách cụm rạp lên redux
        dispatch(setActionAddressTheater(action));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  // render options cụm rạp
  const addressTheater = listAddressTheater.map((address) => {
    return { label: address.tenCumRap, value: address.maCumRap };
  });

  // khi thay đổi cụm rạp
  const handleChangeAddressTheater = (value) => {
    // set select rap = null => khi thay đổi cụm rạp
    formCreate.setFieldsValue({ maRap: null });
    // mở select rạp
    setIsSelectRoom(true);
    // tìm địa chỉ rạp
    const newAddressTheater = listAddressTheater.find((theater) => {
      return theater.maCumRap == value;
    });
    // render rạp
    setNewRap(
      newAddressTheater.danhSachRap.map((room) => {
        return { label: room.tenRap, value: room.maRap };
      })
    );
  };

  const onOkDateTimeShow = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <div>
      {/* Modal trailer */}
      <Modal
        title="Basic Modal"
        open={isModalTrailer}
        onCancel={onCancelTrailer}
        footer={null}
        width={690}
      >
        <ReactPlayer url={urlTrailer} />
      </Modal>

      {/* form sửa thông tin phim */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              titleFontSize: 25,
            },
          },
        }}
      >
        <Modal
          className="text-center"
          title="SỬA THÔNG TIN PHIM"
          open={isModalOpenUpdate}
          onCancel={onCancelUpdate}
          footer={null}
          width={690}
        >
          {/* khóa form update */}
          <div className="w-fit flex gap-2 border-4 border-red-300 p-2">
            <Switch checked={lock} onChange={onChange} />
            {lock ? <LockOutlined /> : <UnlockOutlined />}
          </div>
          <Form
            form={form}
            disabled={lock}
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
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailedUpdate}
          >
            {/* hình ảnh */}
            <Form.Item label="Hình ảnh" name="hinhAnh">
              <input
                type="file"
                disabled={lock}
                onChange={handleChangeFile}
                className="overflow-hidden w-[75px]"
              />
              <br />
              <img
                src={imgSrcUpdate}
                alt=""
                className="w-28 h-36 object-contain"
                accept="image/png, image/jpeg, image/gif, image/jpg"
              />
            </Form.Item>

            {/* trailer */}
            <Form.Item
              label="Trailer"
              name="trailer"
              rules={[
                {
                  required: true,
                  message: "Trailer không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* tên phim */}
            <Form.Item
              label="Tên phim"
              name="tenPhim"
              rules={[
                {
                  required: true,
                  message: "Tên phim không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* mô tả */}
            <Form.Item
              label="Mô tả"
              name="moTa"
              rules={[
                {
                  required: true,
                  message: "Mô tả không được để trống!",
                },
              ]}
            >
              <Input />
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
                className="flex"
                format={"DD/MM/YYYY"}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>

            {/* đang chiếu */}
            <Form.Item
              label="Đang chiếu"
              name="dangChieu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch className="flex" />
            </Form.Item>

            {/* sắp chiếu */}
            <Form.Item
              label="Sắp chiếu"
              name="sapChieu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch className="flex" />
            </Form.Item>

            {/* hot */}
            <Form.Item
              label="Hot"
              name="hot"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch className="flex" />
            </Form.Item>

            {/* đánh giá */}
            <Form.Item
              label="Đánh giá"
              name="danhGia"
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống!",
                },
              ]}
            >
              <InputNumber className="flex" />
            </Form.Item>

            {/* Lưu phim */}
            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                Lưu Phim
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      {/* Modal xóa phim */}
      <Modal
        title={
          <div className="text-red-500 flex gap-2">
            <DeleteFilled />
            <span>DELETE MOVIE</span>
          </div>
        }
        open={isModalOpenDelete}
        onCancel={onCancelDelete}
        okText={"Xóa"}
        cancelText={"Không"}
        onOk={() => handleDeleteMovie(movieDelete.maPhim)}
      >
        <p>Bạn có chắc chắn muốn xóa phim: {movieDelete.tenPhim}</p>
      </Modal>

      {/* Modal tạo lịch chiếu */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              titleFontSize: 25,
            },
          },
        }}
      >
        <Modal
          title={`TẠO LỊCH CHIẾU - ${createScheduleForm.tenPhim}`}
          open={isModalOpenCreate}
          onCancel={onCancelCreate}
          footer={null}
          width={690}
        >
          <img
            src={imgSrcCreateSchedule}
            alt=""
            className="w-28 h-36 object-contain"
          />
          <Form
            form={formCreate}
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
            onFinish={onFinishCreate}
            onFinishFailed={onFinishFailedCreate}
            className="border-2 p-5 m-5"
          >
            {/* hệ thống rạp */}
            <Form.Item
              label="Hệ thống rạp"
              name="heThongRap"
              rules={[
                {
                  required: true,
                  message: "Hệ thống rạp không được để trống!",
                },
              ]}
            >
              <Select options={theater} onChange={handleChangeTheater} />
            </Form.Item>

            {/* cụm rạp */}
            <Form.Item
              label="Cụm rạp"
              name="cumRap"
              rules={[
                {
                  required: true,
                  message: "Cụm rạp không được để trống!",
                },
              ]}
            >
              <Select
                options={addressTheater}
                disabled={!isSelectAddressTheater}
                onChange={handleChangeAddressTheater}
              />
            </Form.Item>

            {/* danh sách rạp */}
            <Form.Item
              label="Rạp"
              name="maRap"
              rules={[
                {
                  required: true,
                  message: "Rạp không được để trống!",
                },
              ]}
            >
              <Select options={newRap} disabled={!isSelectRoom} />
            </Form.Item>

            {/* ngày chiếu giờ chiếu */}
            <Form.Item
              label="Ngày chiếu giờ chiếu"
              name="ngayChieuGioChieu"
              rules={[
                {
                  required: true,
                  message: "Ngày chiếu lịch chiếu không được để trống!",
                },
              ]}
            >
              <DatePicker
                showTime
                format={"DD/MM/YYYY hh:mm:ss"}
                onOk={onOkDateTimeShow}
              />
            </Form.Item>

            {/* giá vé */}
            <Form.Item
              label="Giá vé"
              name="giaVe"
              rules={[
                {
                  required: true,
                  message: "Giá vé không được để trống!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value === null || value === void 0
                    ? void 0
                    : value.replace(/\$\s?|(,*)/g, "")
                }
                addonAfter="VND"
              />
            </Form.Item>

            {/* tạo lịch chiếu */}
            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      {/* tìm kiếm */}
      <div className="px-20 py-8">
        <Search
          placeholder="Tìm phim"
          onSearch={onSearch}
          allowClear
          enterButton
        />
      </div>
      <div className="px-20">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#000",
              },
            },
          }}
        >
          {/* danh sách phim */}
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered={true}
            size="small"
            className="border-4 rounded-xl"
          />
          <Radio.Group
            value={bottom}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
            size="large"
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
