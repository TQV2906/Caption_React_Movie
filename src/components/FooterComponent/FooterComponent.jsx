import { Flex, Layout, Typography } from "antd";
import React from "react";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

export default function FooterComponent() {
  const headerStyle = {};
  const contentStyle = {
    with: "30%",
    color: "white",
  };
  const footerStyle = {};
  return (
    <div className="bg-[#090b13]">
      <Flex className="container py-20">
        <Content style={contentStyle}>
          <p className="text-3xl font-bold">VỀ CHÚNG TÔI</p>
          <div className="w-1/2 h-2 bg-green-400"></div>
          <p>Hệ thống rạp</p>
          <p>Cụm rạp</p>
          <p>Liên hệ</p>
          <img
            src="https://www.bhdstar.vn/wp-content/uploads/2023/08/image-21.png"
            alt=""
            className="w-48"
          />
        </Content>
        <Content style={contentStyle}>
          <p className="text-3xl font-bold">QUY ĐỊNH & ĐIỀU KHOẢN</p>
          <div className="w-1/2 h-2 bg-green-400"></div>
          <p>Quy định thành viên</p>
          <p>Điều khoản</p>
          <p>Hướng dẫn đặt vé trực tuyến</p>
          <p>Quy định và chính sách chung</p>
          <p>Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</p>
        </Content>
        <Content style={contentStyle}>
          <p className="text-3xl font-bold">CHĂM SÓC KHÁCH HÀNG</p>
          <div className="w-1/2 h-2 bg-green-400"></div>
          <p>Hotline: 19002099</p>
          <p>Giờ làm việc: 9:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ, Tết)</p>
          <p>Email hỗ trợ: cskh@bhdstar.vn</p>
          <p>MẠNG XÃ HỘI</p>
          <Flex gap={10}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"
              alt=""
              className="w-14 rounded-full"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
              alt=""
              className="w-14 rounded-full"
            />
            <img
              src="https://yt3.googleusercontent.com/n2F5svHzfGDDEIRWDKt6WF_jeJqwzba7NTKx5lbVzNVa9lKnK5iVT1pH824C-g76IRzWR1_hjA=s900-c-k-c0x00ffffff-no-rj"
              alt=""
              className="w-14 rounded-full"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L4BWDRzfzlwM3wQTJ0qFXOkcIqdl0RnuVQ&s"
              alt=""
              className="w-14 rounded-full"
            />
          </Flex>
        </Content>
      </Flex>
      <div className="bg-[#151720]">
        <Flex gap={20} className="container py-10 text-white">
          <img src="http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png" alt="" />
          <div>
            <p>Công ty TNHH MTV Ngôi Sao Cineplex BHD Việt Nam</p>
            <p>
              Giấy CNĐKDN: Giấy phép kinh doanh số: 0104597158. Đăng ký lần đầu
              ngày 15 tháng 04 năm 2010
            </p>
            <p>
              Địa Chỉ: Tầng 11, Tòa nhà Hồng Hà Building, Lý Thường Kiệt, P.Phan
              Chu Trinh, Quận Hoàn Kiếm, Hà Nội
            </p>
            <p>Hotline: 19002099</p>
            <p>COPYRIGHT 2010 BHD STAR. ALL RIGHTS RESERVED</p>
          </div>
        </Flex>
      </div>
    </div>
  );
}
