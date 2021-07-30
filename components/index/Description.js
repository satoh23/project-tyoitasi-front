import React from "react";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@brainhubeu/react-carousel"), {
  ssr: false,
});

const Description = () => {
  return (
    <div className="w-full text-center font-bold text-2xl m-5">
      <Carousel plugins={["arrows"]}>
        <img src="https://images.unsplash.com/photo-1612565191576-7ac513f0fc00?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
        <img src="https://images.unsplash.com/photo-1622367037544-fbf8987e2e07?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
      </Carousel>
      <div className="mb-5">
        インスタント食品に1品だけ足して美味しくするサイト
      </div>
      <div className="text-yellow-300">ちょいたし！</div>
    </div>
  );
};

export default Description;
