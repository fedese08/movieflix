import React from "react";
import SwiperElement from "./SwiperElement";

function VideoSwiper({ videos, title }) {
  // console.log(videos);

  return (
    <div className="flex flex-col">
      <h2 className="font-medium text-[25px] text-[#f7f7f7] pl-2 z-50">
        {title}
      </h2>
      <swiper-container
        breakpoints={JSON.stringify({
          640: {
            slidesPerView: 1,
            spaceBetween: 4,
          },

          768: {
            slidesPerView: 4,
            spaceBetween: 4,
          },

          1024: {
            slidesPerView: 5,
            spaceBetween: 4,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 4,
          },
        })}
        navigation="true"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {videos?.map((video) => {
          return <SwiperElement key={video.id} video={video} />;
        })}
      </swiper-container>
    </div>
  );
}

export default VideoSwiper;
