import React from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'

const Carousel = dynamic(() => import("@brainhubeu/react-carousel"), {
  ssr: false,
});

const Description = () => {
  return (
    <div className="w-full text-center font-bold text-2xl m-5">
      <Carousel plugins={["arrows"]}>
      <Image
          src={"/NoImage.jpg"} 
          alt="icon" 
          className="rounded-lg"
          width={170}
          height={170}/>
      </Carousel>
      <div className="mb-5">
        インスタント食品に1品だけ足して美味しくするサイト
      </div>
      <div className="text-yellow-300">ちょいたし！</div>
    </div>
  );
};

export default Description;
