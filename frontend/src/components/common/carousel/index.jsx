import { Carousel as CarouselBootstrap } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppUtils } from "../../../utils/AppUtils";
import { setSelectedEventName } from "../../../redux/slices/eventSlice";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
const { checkURL } = AppUtils;
function Carousel(props) {
  const { data } = props;
  const newData = data?.map(({ id, name, background }) => ({
    id,
    name,
    background,
  }));
  const dispatch = useDispatch();
  return (
    <CarouselBootstrap>
      {newData &&
        newData.map((item, index) => (
          <CarouselBootstrap.Item interval={2000} key={item.id}>
            <Link to={`/event/${item.name}`}>
              <img
                onClick={() => {
                  dispatch(setSelectedEventName(item.name));
                }}
                className="w-full h-auto p-[1rem]"
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
