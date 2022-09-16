import { Carousel as CarouselBootstrap } from "react-bootstrap";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import React from "react";
export default function Carousel(props) {
  const { data } = props;
  return (
    <CarouselBootstrap>
      {data.map((image, index) => (
        <CarouselBootstrap.Item interval={1000}>
          <img
            className="w-full h-auto p-[1rem]"
            src={image}
            alt={`carousel-${index}`}
          />
        </CarouselBootstrap.Item>
      ))}
    </CarouselBootstrap>
  );
}
Carousel.propTypes = {
  data: PropTypes.array,
};
Carousel.defaultProps = {
  data: [
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/08/22/1ABA64.jpg",
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/08/04/B7BF02.jpg",
    "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2022/08/23/4911B4.jpg",
    "https://images.tkbcdn.com/1/780/300/Upload/eventcover/2022/09/15/BE1528.jpg",
  ],
};
