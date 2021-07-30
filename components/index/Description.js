import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';

const Description = () => {
  return (
    <div className="w-full text-center font-bold text-2xl m-5">
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
    </Swiper>
      <div className="mb-5">
        インスタント食品に1品だけ足して美味しくするサイト
      </div>
      <div className="text-yellow-300">ちょいたし！</div>
    </div>
  );
};

export default Description;
