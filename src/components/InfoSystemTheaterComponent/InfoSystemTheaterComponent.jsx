import { Button, Card, Flex, Image, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { https } from "../../api/config";
import {
  getListAddressTheaterService,
  getListMovieOfTheaterService,
  getListTheaterService,
} from "../../api/movieService";
import { systemTheater } from "./SystemTheater";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionAddressTheater,
  setActionMovieOfTheater,
  setActionListTheater,
  setActionMovieOfAddress,
} from "../../redux/movieSlice";
import dayjs from "dayjs";
const { Meta } = Card;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function InfoSystemTheaterComponent() {
  const [theater, setTheater] = useState({});
  const [address, setAddress] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  let {
    listTheater,
    listAddressTheater,
    listMovieOfTheater,
    listMovieOfAddress,
  } = useSelector((state) => {
    return state.movieSlice;
  });

  // useEffect(() => {

  // }, [newTheater]);

  // lấy data cụm rạp phim rồi đẩy lên redux lần đầu tiên load trang
  useEffect(() => {
    getListTheaterService()
      .then((res) => {
        const action = res.data.content;
        setTheater(action[0].maHeThongRap);
        dispatch(setActionListTheater(action));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getListMovieOfTheaterService(theater)
      .then((res) => {
        const action = res.data.content;
        setAddress(action[0].lstCumRap);
        setSchedule(action[0].lstCumRap[0].danhSachPhim);
        console.log("action[0].lstCumRap: ", action[0].lstCumRap);
        setActionMovieOfTheater(action[0].lstCumRap);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [theater]);

  const timeShowFirst = (time) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {time.map((time) => {
          const newTime = dayjs(time.ngayChieuGioChieu);
          return (
            <Button color="danger" variant="filled" className="border-red-400">
              {newTime.format("DD-MM-YYYY ~ HH:mm")}
            </Button>
          );
        })}
      </div>
    );
  };

  const movieOfAddressFirst = () => {
    console.log(schedule);
    return schedule.map((movie) => {
      return (
        <Card
          className="w-full border-black flex p-2"
          cover={
            <div>
              <img
                alt="example"
                src={movie.hinhAnh}
                className="w-44 object-cover rounded-md"
              />
            </div>
          }
        >
          <Meta
            title={movie.tenPhim}
            description={timeShowFirst(movie.lstLichChieuTheoPhim)}
          />
        </Card>
      );
    });
  };

  const items2First = address.map((address, index) => {
    return {
      key: index,
      label: (
        <Card
          hoverable
          style={{
            width: 240,
            border: "1px solid black",
          }}
        >
          <Meta title={address.tenCumRap} description={address.diaChi} />
        </Card>
      ),
      children: <div className="grid gap-2">{movieOfAddressFirst()}</div>,
    };
  });

  const handleChangAddressTheaterFirst = (key) => {
    const newMovieOfTheater = address[key].danhSachPhim;
    setSchedule(newMovieOfTheater);
  };

  const timeShow = (time) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {time.map((time) => {
          const newTime = dayjs(time.ngayChieuGioChieu);
          return (
            <Button color="danger" variant="filled" className="border-red-400">
              {newTime.format("DD-MM-YYYY ~ HH:mm")}
            </Button>
          );
        })}
      </div>
    );
  };

  const movieOfAddress = () => {
    return listMovieOfAddress.map((movie) => {
      return (
        <Card
          className="w-full border-black flex p-2"
          cover={
            <div>
              <img
                alt="example"
                src={movie.hinhAnh}
                className="w-44 object-cover rounded-md"
              />
            </div>
          }
        >
          <Meta
            title={movie.tenPhim}
            description={timeShow(movie.lstLichChieuTheoPhim)}
          />
        </Card>
      );
    });
  };

  const handleChangAddressTheater = (key) => {
    const newMovieOfTheater = listMovieOfTheater[key].danhSachPhim;
    dispatch(setActionMovieOfAddress(newMovieOfTheater));
  };

  const items2 = listMovieOfTheater.map((address, index) => {
    return {
      key: index,
      label: (
        <Card
          hoverable
          style={{
            width: 240,
            border: "1px solid black",
          }}
        >
          <Meta title={address.tenCumRap} description={address.diaChi} />
        </Card>
      ),
      children: <div className="grid gap-2">{movieOfAddress()}</div>,
    };
  });

  const handleChangTheater = (key) => {
    setCount(0);
    const newTheater = listTheater[key];
    getListMovieOfTheaterService(newTheater.maHeThongRap)
      .then((res) => {
        dispatch(setActionMovieOfTheater(res.data.content[0].lstCumRap));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const items1 = listTheater.map((theater, index) => {
    return {
      key: index,
      label: <img src={theater.logo} alt="" className="size-20" />,
      children: (
        <Tabs
          defaultActiveKey="0"
          items={count == 1 ? items2First : items2}
          centered
          tabPosition="left"
          onChange={
            count == 1
              ? handleChangAddressTheaterFirst
              : handleChangAddressTheater
          }
        />
      ),
    };
  });

  return (
    <Tabs
      defaultActiveKey="0"
      items={items1}
      centered
      tabPosition="left"
      onChange={handleChangTheater}
    />
  );
}
