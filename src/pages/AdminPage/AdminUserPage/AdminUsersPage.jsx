import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Switch,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  deleteUserService,
  findUserService,
  getListUserService,
  updateInfoUserService,
} from "../../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionFindUser,
  setActionListUser,
  setActionUserDelete,
  setActionUserForm,
} from "../../../redux/userSlice";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
  InfoCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
const { Search } = Input;

export default function AdminUsersPage() {
  const [form] = Form.useForm();
  // biến mở Modal update
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  // biến mở Modal delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  // biến khóa form Modal update
  const [lock, setLock] = useState(true);
  // biến phân trang
  const [bottom, setBottom] = useState("bottomRight");
  // biến data tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  const [reFindAfterUpdate, setReFindAfterUpdate] = useState(false);
  const dispatch = useDispatch();
  // lấy data từ userSlice về
  const { user, listUser, userForm, findUser, userDelete } = useSelector(
    (state) => {
      return state.userSlice;
    }
  );

  // tìm user
  useEffect(() => {
    // sau khi cập nhật user và tìm kiếm = "" => gọi api render lại listUser
    // sau khi cập nhật user và tìm kiếm = data => gọi api render lại findUser
    reFindAfterUpdate == true && searchValue == ""
      ? getListUserService()
          .then((res) => {
            const action = res.data.content;
            dispatch(setActionListUser(action));
            setReFindAfterUpdate(false);
          })
          .catch((err) => {})
      : findUserService(searchValue)
          .then((res) => {
            console.log(res.data.content);
            dispatch(setActionFindUser(res.data.content));
            setReFindAfterUpdate(false);
          })
          .catch((err) => {});
  }, [searchValue, reFindAfterUpdate]);

  // kết thúc tìm kiếm user
  const onSearch = (value, _e) => {
    return setSearchValue(value);
  };

  // lấy data list user khi lần đầu load trang
  useEffect(() => {
    getListUserService()
      .then((res) => {
        const action = res.data.content;
        dispatch(setActionListUser(action));
      })
      .catch((err) => {});
  }, []);

  // xóa user
  const handleDeleteUser = (taiKhoan, accessToken) => {
    deleteUserService(taiKhoan, accessToken)
      .then((res) => {
        onCancelDelete();
        setReFindAfterUpdate(true);
        toast.success("Xóa user thành công");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Xóa user thất bại");
      });
  };

  // data sau khi tìm kiếm => data sau khi tìm kiếm là findUser => data findUser lấy từ redux về
  const dataFindUser = () => {
    return findUser.map((user, index) => {
      return {
        id: index + 1,
        taiKhoan: user.taiKhoan,
        matKhau: (
          <Input.Password
            value={user.matKhau}
            disabled
            visibilityToggle={false}
          />
        ),
        hoTen: user.hoTen,
        email: user.email,
        soDT: user.soDT,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
        action: (
          <div className="flex flex-wrap gap-2">
            <Button
              type="primary"
              onClick={() => {
                showModalUpdate(index);
              }}
            >
              <EditFilled />
            </Button>
            <Button
              danger
              onClick={() => {
                showModalDelete(user.taiKhoan);
              }}
            >
              <DeleteFilled />
            </Button>
          </div>
        ),
      };
    });
  };

  // data ban đầu load trang => data ban đầu là listUser => data listUser lấy từ redux về
  const dataUser = () => {
    return listUser.map((user, index) => {
      return {
        id: index + 1,
        taiKhoan: user.taiKhoan,
        matKhau: (
          <Input.Password
            value={user.matKhau}
            disabled
            visibilityToggle={false}
          />
        ),
        hoTen: user.hoTen,
        email: user.email,
        soDT: user.soDT,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
        action: (
          <div className="flex flex-wrap gap-2">
            <Button
              type="primary"
              onClick={() => {
                showModalUpdate(index);
              }}
            >
              <EditFilled />
            </Button>
            <Button
              danger
              onClick={() => {
                showModalDelete(user.taiKhoan);
              }}
            >
              <DeleteFilled />
            </Button>
          </div>
        ),
      };
    });
  };

  // data gắn vào bảng
  const dataSource = findUser == "" ? dataUser() : dataFindUser();

  // data mở Modal sau khi tìm kiếm => findUser
  const dataModalFindUser = (index) => {
    return findUser.find((user, key) => {
      return key == index;
    });
  };

  // data mở Modal ban đầu => listUser
  const dataModalListUser = (index) => {
    return listUser.find((user, key) => {
      return key == index;
    });
  };

  // mở Modal Update
  const showModalUpdate = (index) => {
    const fixUser =
      findUser == "" ? dataModalListUser(index) : dataModalFindUser(index);
    dispatch(setActionUserForm(fixUser));
    return setIsModalOpenUpdate(true);
  };

  // đóng Modal Update
  const onCancelUpdate = () => {
    form.resetFields();
    setLock(true);
    return setIsModalOpenUpdate(false);
  };

  // mở Modal Delete
  const showModalDelete = (taiKhoan) => {
    dispatch(setActionUserDelete(taiKhoan));
    return setIsModalOpenDelete(true);
  };

  // đóng Modal Delete
  const onCancelDelete = () => {
    dispatch(setActionUserDelete(""));
    return setIsModalOpenDelete(false);
  };

  //   tiêu đề bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];

  // cập nhật user
  const handleUpdateUser = (values, accessToken) => {
    updateInfoUserService(values, accessToken)
      .then((res) => {
        onCancelUpdate();
        setReFindAfterUpdate(true);
        toast.success("Cập nhật thành công");
      })
      .catch((err) => {
        toast.error("Cập nhật thất bại");
      });
  };

  // data từ form khi nhấn nút lưu => nếu thành công
  const onFinish = (values) => {
    handleUpdateUser(values, user.accessToken);
  };

  // lỗi từ form khi nhấn nút lưu => nếu thất bại
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // kiểm tra khóa
  const onChange = (checked) => {
    setLock(checked);
  };

  // lấy data từ redux rồi gắn vào form
  useEffect(() => {
    form.setFieldsValue({
      taiKhoan: userForm.taiKhoan,
      matKhau: userForm.matKhau,
      email: userForm.email,
      soDT: userForm.soDT,
      maNhom: "GP00",
      maLoaiNguoiDung: userForm.maLoaiNguoiDung,
      hoTen: userForm.hoTen,
    });
  }, [userForm]);

  return (
    <div className="h-lvh">
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
          title="SỬA THÔNG TIN"
          open={isModalOpenUpdate}
          onCancel={onCancelUpdate}
          footer={null}
          width={690}
        >
          <div className="w-fit flex gap-2 border-4 border-red-300 p-2">
            {/* khóa form update*/}
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
                  message: "Số điện thoại không được để trống!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            {/* mã loại ngời dùng */}
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
                // onChange={onGenderChange}
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

            {/* Lưu user */}
            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      {/* Modal xóa user */}
      <Modal
        title={
          <div className="text-red-500 flex gap-2">
            <DeleteFilled />
            <span>DELETE USER</span>
          </div>
        }
        open={isModalOpenDelete}
        onCancel={onCancelDelete}
        okText={"Xóa"}
        cancelText={"Không"}
        onOk={() => handleDeleteUser(userDelete, user.accessToken)}
      >
        <p>Bạn có chắc chắn xóa tài khoản: {userDelete}</p>
      </Modal>

      <div className="px-20 py-8">
        {/* tìm kiếm */}
        <Search
          placeholder="Tìm người dùng"
          onSearch={onSearch}
          allowClear
          enterButton
          size="large"
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
          {/* danh sách user */}
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
