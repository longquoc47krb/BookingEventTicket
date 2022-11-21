/* eslint-disable jsx-a11y/alt-text */
import { Tag } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Calendar from "../calendar";
import PlaceholderCover from "../../assets/cover-fallback.jpg";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { EventStatus } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../redux/slices/filterSlice";
import AppConfig from "../../configs/AppConfig";
import { minBy } from "lodash";
import { formatter, isNotEmpty } from "../../utils/utils";
function Event(props) {
  const { event } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  let categoriesArr = event?.eventCategoryList;
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  const dispatch = useDispatch();
  function handleEventCurrency() {
    if (isNotEmpty(event.organizationTickets)) {
      const currency = event.organizationTickets[0].currency;
      return currency;
    }
  }
  return (
    <div
      className="event-item-container float"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      <img
        src={event?.background || PlaceholderCover}
        className="event-item-image"
      />
      <h1 className="w-[calc(100%-80px)] font-bold event-title cursor-pointer mt-1">
        {event.name}
      </h1>
      <h1 className="absolute bottom-3 left-3 text-gray-500 font-bold text-xl">
        {event.status === EventStatus.COMPLETED ||
        event.status === EventStatus.SOLDOUT
          ? t(event.status)
          : null}
      </h1>
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
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/events?category=${item.name}`);
              dispatch(setCategoryId(item.id));
            }}
          >
            {t(item?.name)}
          </p>
        ))}
      </div>
      <div>
        <span className="text-base pl-1 ">
          {t("price-from")}
          <strong className="text-[#1f3e82]">
            {formatter(handleEventCurrency() ?? "VND").format(
              minBy(event?.organizationTickets, function (o) {
                const price = Number(o.price);
                return price;
              })?.price
            )}
          </strong>
        </span>
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
