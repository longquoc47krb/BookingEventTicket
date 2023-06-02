import { Tag } from "antd";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PlaceholderCover from "../assets/cover-fallback.jpg";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { EventStatus } from "../utils/constants";
import { useDispatch } from "react-redux";
import { minBy } from "lodash";
import { formatter, isNotEmpty } from "../utils/utils";

function Event(props) {
  const { event, onClick } = props;
  const { t } = useTranslation();
  let categoriesArr = event?.eventCategoryList;
  const dispatch = useDispatch();
  function handleEventCurrency() {
    if (isNotEmpty(event.organizationTickets)) {
      const currency = event.organizationTickets[0].currency;
      return currency;
    }
  }
  console.log();
  return (
    <div className="event-item-container" onClick={onClick}>
      <img
        src={event?.background || PlaceholderCover}
        className="event-item-image"
        alt="background"
      />
      <h1 className="w-[calc(100%-80px)] font-bold event-title cursor-pointer mt-1">
        {event.name}
      </h1>
      <div className="flex items-center w-[calc(100%-80px)]">
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
          <p key={index} className="event-category cursor-pointer">
            {t(item?.name)}
          </p>
        ))}
      </div>
      <div className="flex justify-start gap-x-12 items-center">
        <span className="text-sm font-medium text-gray-400 tracking-wide ">
          {t("sold-ticket", {
            val: event?.ticketTotal - event?.ticketRemaining,
          })}
        </span>
      </div>
      <h1 className="text-gray-500 font-bold text-xl">
        {event.status === EventStatus.AVAILABLE ? (
          <span className="p-2 border-2 rounded-md text-xs bg-green-500 text-white font-medium mr-2">
            {t("event.status.available")}
          </span>
        ) : event.status === EventStatus.COMPLETED ? (
          <span className="p-2 bg-yellow-500 text-xs text-white rounded-md font-medium mr-2">
            {t("event.status.completed")}
          </span>
        ) : (
          <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
            {t("event.status.soldout")}
          </span>
        )}
      </h1>
    </div>
  );
}
export default Event;
