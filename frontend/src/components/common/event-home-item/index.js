/* eslint-disable jsx-a11y/alt-text */
import { Image, Tag } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import { AppUtils } from "../../../utils/AppUtils";
import Calendar from "../../calendar";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
import moment from "moment";
const { checkURL } = AppUtils;
function EventHomeItem(props) {
  const { event } = props;
  const navigate = useNavigate();
  let categoriesArr = event?.eventCategoryList;
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  return (
    <div
      className="event-home-item-container"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      <Image
        src={checkURL(event?.background) ? event?.background : PlaceholderCover}
        style={{ height: 130, width: 360 }}
        onClick={(event) => event.stopPropagation()}
        className="event-home-item-image"
      />
      <h1 className="w-full font-extrabold text-lg mb-0">{event.name}</h1>
      <span className="font-medium text-sm">{event.startingDate}</span>
      {event.eventCategoryList.map((item, index) => (
        <h2 className="font-thin text-sm text-gray-400">{item.name}</h2>
      ))}
      <div>
        <strong className="text-xl">{event.price}</strong>
      </div>
    </div>
  );
}
EventHomeItem.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  }),
};
EventHomeItem.defaultProps = {
  event: PropTypes.shape({
    image: AppConfig.DEFAULT_PROPS.EVENT.image,
    title: AppConfig.DEFAULT_PROPS.EVENT.title,
    price: AppConfig.DEFAULT_PROPS.EVENT.price,
    categories: AppConfig.DEFAULT_PROPS.EVENT.categories,
  }),
};
export default EventHomeItem;
