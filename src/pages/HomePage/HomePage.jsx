import React from "react";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Image,
  Tabs,
  Typography,
} from "antd";
import "./HomePage.css";
import ListMovieComponent from "../../components/ListMovieComponent/ListMovieComponent";
import InfoSystemTheaterComponent from "../../components/InfoSystemTheaterComponent/InfoSystemTheaterComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const { Meta } = Card;
const { Title } = Typography;

export default function HomePage() {
  return (
    <div>
      {/* carousel */}
      <div className="pt-24 bg-[url(https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)]">
        <CarouselComponent />
      </div>

      {/* lịch chiếu */}
      {/* https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01 */}
      <div id="lichChieu" className="container flex flex-col p-5 gap-5">
        <Title
          style={{ display: "block", textAlign: "center", marginTop: "50px" }}
        >
          LỊCH CHIẾU
        </Title>
        <ConfigProvider
          theme={{
            components: {},
            token: {
              lineWidthBold: 5,
            },
          }}
        >
          <ListMovieComponent />
        </ConfigProvider>
      </div>

      {/* cụm rạp */}
      {/* https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap */}
      <div id="cumRap" className="container">
        <Title style={{ textAlign: "center", marginTop: "50px" }}>
          CỤM RẠP
        </Title>
        <InfoSystemTheaterComponent />
      </div>

      {/* tin tức */}
      <div id="tinTuc">
        <Title style={{ textAlign: "center", marginTop: "50px" }}>
          TIN TỨC
        </Title>
      </div>

      {/* ứng dụng */}
      <div id="ungDung">
        <Title style={{ textAlign: "center", marginTop: "50px" }}>
          ỨNG DỤNG
        </Title>
      </div>
      <FooterComponent />
    </div>
  );
}
