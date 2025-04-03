import React, { useEffect, useState } from "react";
import { Button, Card, ConfigProvider, Modal, Progress, Tabs } from "antd";
import {
  getDetailMovieService,
  getInfoOfScheduleMovie,
  getListTheaterService,
} from "../../api/movieService";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionDetailMovie,
  setActionInfoOfScheduleMovie,
  setActionListTheater,
} from "../../redux/movieSlice";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
const { Meta } = Card;

export default function DetailMoviePage() {
  const [rapChieu, setRapChieu] = useState([]);
  const dispatch = useDispatch();
  // lấy param từ url
  const params = useParams();

  const { listTheater, detailMovie, infoOfScheduleMovie } = useSelector(
    (state) => {
      return state.movieSlice;
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getListTheaterService()
      .then((res) => {
        const action = res.data.content;
        dispatch(setActionListTheater(action));
      })
      .catch((err) => {});
  }, []);

  // lấy chi tiết phim lần đầu load trang
  useEffect(() => {
    getDetailMovieService(params.idMovie)
      .then((res) => {
        dispatch(setActionDetailMovie(res.data.content));
      })
      .catch((err) => {}),
      getInfoOfScheduleMovie(params.idMovie)
        .then((res) => {
          dispatch(
            setActionInfoOfScheduleMovie(res.data.content.heThongRapChieu)
          );
        })
        .catch((err) => {}),
      // Cuộn lên đầu trang sau khi component mount
      window.scrollTo(0, 0);
  }, []);

  const timeShow = (time) => {
    return (
      <div className="grid grid-cols-7 gap-2">
        {time.map((time) => {
          const newTime = dayjs(time.ngayChieuGioChieu);
          return (
            <NavLink to={`/detail-box-movie/${time.maLichChieu}`}>
              <Button
                color="danger"
                variant="filled"
                className="border-red-400"
              >
                {newTime.format("DD-MM-YYYY ~ HH:mm")}
              </Button>
            </NavLink>
          );
        })}
      </div>
    );
  };

  const rederRapChieu = () => {
    return rapChieu.map((movie) => {
      return (
        <Card
          title={
            <div>
              {movie.tenCumRap}
              <br />
              Địa chỉ: {movie.diaChi}
            </div>
          }
        >
          <Meta description={timeShow(movie.lichChieuPhim)} />
        </Card>
      );
    });
  };

  const items1 = listTheater.map((theater, index) => {
    return {
      key: index,
      label: <img src={theater.logo} alt="" className="size-20" />,
      children: <div className="grid gap-2">{rederRapChieu()}</div>,
    };
  });

  const handleChangeTheater = (key) => {
    const newTheater = listTheater[key].maHeThongRap;
    const rapChieu = infoOfScheduleMovie.find((theater) => {
      return theater.maHeThongRap == newTheater;
    });
    setRapChieu(rapChieu.cumRapChieu);
  };

  const desc = detailMovie.moTa;
  return (
    <div className="container bg-[#103241] h-lvh">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={onCancel}
        footer={null}
        width={690}
      >
        <ReactPlayer url={detailMovie.trailer} />
      </Modal>
      {/* thông tin phim */}
      <div className="h-full flex items-center px-5 fixed w-4/5 m-auto z-0">
        <img
          src={detailMovie.hinhAnh}
          alt=""
          className="h-96 object-cover rounded-3xl"
        />
        <div className="h-96 px-5 text-white flex flex-col gap-5">
          <h2 className="text-3xl font-bold">{detailMovie.tenPhim}</h2>
          <div>{desc && desc.slice(0, 400)}</div>
          <div className="flex gap-5">
            <div className="font-bold">
              <p>Ngày khởi chiếu:</p>
              <p>Trailer:</p>
            </div>
            <div>
              <p>{detailMovie.ngayKhoiChieu}</p>
              <p>
                <Button color="danger" variant="solid" onClick={showModal}>
                  Xem
                </Button>
              </p>
            </div>
            <div>
              <ConfigProvider
                theme={{
                  token: {
                    colorText: "#fff",
                  },
                }}
              >
                <Progress
                  type="circle"
                  percent={detailMovie.danhGia * 10}
                  format={() => {
                    return detailMovie.danhGia + " điểm";
                  }}
                  strokeColor={"green"}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4/5"></div>

      {/* phần đặt vé */}
      <div className="h-[1800px] bg-blue-400 p-5 rounded-t-3xl relative z-10">
        <Tabs
          defaultActiveKey="0"
          items={items1}
          centered
          onChange={handleChangeTheater}
        />
      </div>
      {/* trailer */}
    </div>
  );
}
