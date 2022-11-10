/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
import AppConfig from "../../../configs/AppConfig";
import { checkImageURL } from "../../../utils/utils";
function EventHomeItem(props) {
  const { event } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  return (
    <div
      className="event-home-item-container cursor-test float cursor-pointera"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      <img
        src={
          checkImageURL(event?.background)
            ? event?.background
            : PlaceholderCover
        }
        style={{ height: 130, width: 360 }}
        className="event-home-item-image"
      />
      <h1 className="w-full mb- event-home-item-name">{event.name}</h1>
      <span className="font-medium text-sm">{event.startingDate}</span>
      <div className="flex items-center gap-x-2">
        {event.eventCategoryList.map((category, index) => (
          <h2 className="font-thin text-sm text-gray-400">
            {t(category.name)}
          </h2>
        ))}
      </div>

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
