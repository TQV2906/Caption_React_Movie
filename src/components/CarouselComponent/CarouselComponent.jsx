import React, { useEffect, useState } from "react";
import { Carousel, ConfigProvider } from "antd";
import { getListBannerService } from "../../api/bannerService";
import { useDispatch, useSelector } from "react-redux";
import { setActionCarousel } from "../../redux/carouselSlice";

export default function CarouselComponent() {
  const dispatch = useDispatch();
  let { listCarousel } = useSelector((state) => {
    return state.carouselSlice;
  });
  // lấy data banner rồi đẩy lên redux lần đầu tiên load trang
  useEffect(() => {
    getListBannerService()
      .then((res) => {
        let action = res.data.content;
        dispatch(setActionCarousel(action));
      })
      .catch((err) => {});
  }, []);

  // render list banner
  const rederBanner = () => {
    return listCarousel.map((banner) => {
      return (
        <img
          key={banner.maBanner}
          src={banner.hinhAnh}
          alt=""
          className="h-96 object-contain"
        />
      );
    });
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              arrowSize: 50,
            },
          },
        }}
      >
        <Carousel autoplay draggable arrows>
          {rederBanner()}
        </Carousel>
      </ConfigProvider>
    </div>
  );
}
