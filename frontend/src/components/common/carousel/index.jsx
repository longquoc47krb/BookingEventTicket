/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Carousel as CarouselBootstrap } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
import "react-loading-skeleton/dist/skeleton.css";
import { shuffle } from "radash";
import { checkURL } from "../../../utils/utils";
function Carousel({ data }) {
  var newData = [];
  newData = shuffle(data)
    .slice(0, 5)
    .map(({ id, name, background }) => ({
      id,
      name,
      background,
    }));

  return (
    <CarouselBootstrap fade={true} autoPlay>
      {newData &&
        newData.map((item, index) => (
          <CarouselBootstrap.Item interval={2000} key={item.id}>
            <Link to={`/event/${item.id}`} target="_blank">
              <img
                className="w-full h-auto px-0 py-3"
                src={
                  checkURL(item.background) ? item.background : PlaceholderCover
                }
                alt={`carousel-${index}`}
              />
            </Link>
          </CarouselBootstrap.Item>
        ))}
    </CarouselBootstrap>
  );
}
export default Carousel;
