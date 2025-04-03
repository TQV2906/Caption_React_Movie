import { Button, Card, Popover, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getListMovieService } from "../../api/movieService";
import { useDispatch, useSelector } from "react-redux";
import { setActionListMovie } from "../../redux/movieSlice";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

export default function ListMovieComponent() {
  const dispatch = useDispatch();
  let { listMovie } = useSelector((state) => {
    return state.movieSlice;
  });

  // lấy data phim rồi đẩy lên redux lần đầu tiên load trang
  useEffect(() => {
    getListMovieService()
      .then((res) => {
        let action = res.data.content;
        dispatch(setActionListMovie(action));
      })
      .catch((err) => {});
  }, []);

  // render list phim đang chiếu
  let renderMovieIsShow = () => {
    const newListMovie = listMovie.filter((movie) => {
      return movie.dangChieu == true;
    });
    return newListMovie.map((movie, index) => {
      const desc = (
        <div>
          <Popover
            content={<p className="w-80">{movie.moTa}</p>}
            trigger={"click"}
          >
            <button className="text-blue-500 block mb-3">Tóm tắt</button>
          </Popover>
          <NavLink to={`/detail-movie/${movie.maPhim}`}>
            <Button type="primary" style={{ width: "100%" }}>
              Mua vé
            </Button>
          </NavLink>
        </div>
      );
      return (
        <Card
          key={index}
          hoverable
          style={{
            width: 240,
            border: "1px solid black",
          }}
          cover={
            <img
              alt="example"
              src={movie.hinhAnh}
              style={{
                height: 300,
              }}
            />
          }
        >
          <Meta title={movie.tenPhim} description={desc} />
        </Card>
      );
    });
  };

  //   render list phim sắp chiếu
  let renderMovieIsComing = () => {
    const newListMovie = listMovie.filter((movie) => {
      return movie.sapChieu == true;
    });
    return newListMovie.map((movie, index) => {
      const desc = (
        <div>
          <Popover
            content={<p className="w-80">{movie.moTa}</p>}
            trigger={"click"}
          >
            <button className="text-blue-500 block mb-3">Tóm tắt</button>
          </Popover>
          <NavLink to={`/detail-movie/${movie.maPhim}`}>
            <Button type="primary" style={{ width: "100%" }}>
              Mua vé
            </Button>
          </NavLink>
        </div>
      );
      return (
        <Card
          key={index}
          hoverable
          style={{
            width: 240,
            border: "1px solid black",
          }}
          cover={
            <img alt="example" src={movie.hinhAnh} style={{ height: 300 }} />
          }
        >
          <Meta title={movie.tenPhim} description={desc} />
        </Card>
      );
    });
  };

  //   tab phim đang chiếu và tab phim sắp chiếu
  const itemsMovie = [
    {
      key: "1",
      label: "Phim đang chiếu",
      children: (
        <div className="grid grid-cols-4 gap-5">{renderMovieIsShow()}</div>
      ),
    },
    {
      key: "2",
      label: "Phim sắp chiếu",
      children: (
        <div className="grid grid-cols-4 gap-5">{renderMovieIsComing()}</div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={itemsMovie} centered />;
}
