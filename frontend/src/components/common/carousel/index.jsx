import React, { useState } from "react";
import "antd/dist/antd.css";
import { Carousel as AntdCarousel } from "antd";
import Item from "./item";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AppConfig } from "../../../configs/AppConfig";
import PropTypes from "prop-types";
export default function Carousel(props) {
  const { data, className } = props;

  function onChange(a, b, c) {
    // console.log(a, b, c);
  }
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          color: "black",
          fontSize: "2rem",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          color: "black",
          fontSize: "2rem",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };
  const settings = {
    dots: true,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 1,
    responsive: AppConfig.CAROUSEL_SETTINGS,
  };

  return (
    <div className={className}>
      <AntdCarousel
        draggable
        afterChange={onChange}
        arrows
        {...settings}
        color={"black"}
        style={{
          width: "1100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0 1rem",
        }}
      >
        {data?.map((card, i) => (
          <Item
            className="w-[1000px] flex justify-center"
            key={i}
            imageSrc={card}
          />
        ))}
      </AntdCarousel>
    </div>
  );
}
Carousel.propTypes = {
  data: PropTypes.array,
};
Carousel.defaultProps = {
  data: [
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/08/22/1ABA64.jpg",
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/08/04/B7BF02.jpg",
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/09/05/677CE0.jpg",
  ],
};
