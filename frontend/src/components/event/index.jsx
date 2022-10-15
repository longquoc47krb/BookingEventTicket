/* eslint-disable jsx-a11y/alt-text */
import { Image, Tag } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../configs/AppConfig";
import Calendar from "../calendar";
import PlaceholderCover from "../../assets/cover-fallback.jpg";
import moment from "moment";
import { checkImageURL } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { TicketStatus } from "../../utils/constants";
function Event(props) {
  const { event } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  let categoriesArr = event?.eventCategoryList;
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  return (
    <div
      className="event-item-container float"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      <Image
        src={
          checkImageURL(event?.background)
            ? event?.background
            : PlaceholderCover
        }
        onClick={(event) => event.stopPropagation()}
        className="event-item-image"
      />
      <h1 className="w-[calc(100%-80px)] font-bold event-title cursor-pointer">
        {event.name}
      </h1>
      <h1 className="absolute bottom-3 left-3 text-gray-500 font-bold text-xl">
        {event.status === TicketStatus.COMPLETED ||
        event.status === TicketStatus.SOLDOUT
          ? t(event.status)
          : null}
      </h1>
      <div>
        <strong className="text-xl">{event.price}</strong>
      </div>
      <div className="flex items-center">
        {event.province ? (
          <Tag
            onClick={(event) => event.stopPropagation()}
            className="cursor-pointer"
          >
            {event.province}
          </Tag>
        ) : null}

        <BiCategory />
        {categoriesArr?.map((item, index) => (
          <p
            key={index}
            className="event-category cursor-pointer"
            onClick={(event) => event.stopPropagation()}
          >
            {t(item?.name)}
          </p>
        ))}
      </div>
      <Calendar
        className="absolute right-2 bottom-5"
        calendar={
          moment(event?.startingDate, "DD/MM/YYYY", true).isValid()
            ? event?.startingDate
            : "31/12/2022"
        }
      />
    </div>
  );
}
Event.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  }),
};
Event.defaultProps = {
  event: PropTypes.shape({
    image: AppConfig.DEFAULT_PROPS.EVENT.image,
    title: AppConfig.DEFAULT_PROPS.EVENT.title,
    price: AppConfig.DEFAULT_PROPS.EVENT.price,
    categories: AppConfig.DEFAULT_PROPS.EVENT.categories,
  }),
};
export default Event;
