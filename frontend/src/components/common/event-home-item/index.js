/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
import { AppConfig } from "../../../configs/AppConfig";
import { checkURL } from "../../../utils/utils";
function EventHomeItem(props) {
  const { event, status } = props;
  const navigate = useNavigate();
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  return (
    <div
      className="event-home-item-container cursor-test float cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      {/* <div class="ribbon">
        <i>
          <span>
            <s></s>
            {status}
            <s></s>
          </span>
        </i>
      </div> */}
      <img
        src={checkURL(event?.background) ? event?.background : PlaceholderCover}
        style={{ height: 130, width: 360 }}
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
  status: PropTypes.string,
};
EventHomeItem.defaultProps = {
  event: PropTypes.shape({
    image: AppConfig.DEFAULT_PROPS.EVENT.image,
    title: AppConfig.DEFAULT_PROPS.EVENT.title,
    price: AppConfig.DEFAULT_PROPS.EVENT.price,
    categories: AppConfig.DEFAULT_PROPS.EVENT.categories,
  }),
  status: "HOT",
};
export default EventHomeItem;
