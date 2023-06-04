/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
import AppConfig from "../../../configs/AppConfig";
import { Rating } from "@mui/material";
import { useFetchReviewList } from "../../../api/services/reviewServices";
import { EventStatus } from "../../../utils/constants";
import { displayRatingStar, isNotEmpty } from "../../../utils/utils";
function EventHomeItem(props) {
  const { event, key, variants } = props;
  const { data: reviewList, isLoading } = useFetchReviewList(event?.id);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToEventDetail = () => {
    navigate(`/event/${event.id}`);
  };
  console.log("display rating star:", displayRatingStar(reviewList));
  return (
    <div
      key={key}
      variants={variants}
      className="event-home-item-container cursor-test float cursor-pointera"
      onClick={(e) => {
        e.preventDefault();
        goToEventDetail();
      }}
    >
      <img
        src={event?.background || PlaceholderCover}
        style={{ height: 130, width: 360 }}
        className="event-home-item-image"
      />
      <h1 className="w-full mb-2 event-home-item-name">{event.name}</h1>
      <div class="flex justify-start gap-x-8 items-end">
        <div>
          <span className="font-medium text-sm">{event.startingDate}</span>
          <div className="flex items-center justify-start gap-x-2">
            {event.eventCategoryList.map((category, index) => (
              <h2 className="font-thin text-xs text-gray-400">
                {t(category.name)}
              </h2>
            ))}
          </div>
        </div>
        <span className="text-xs font-medium text-gray-400 tracking-wide ">
          {t("sold-ticket", {
            val: event?.ticketTotal - event?.ticketRemaining,
          })}
        </span>
      </div>
      {!isLoading &&
        isNotEmpty(reviewList?.data) &&
        event?.status === EventStatus.COMPLETED && (
          <div className="flex items-center gap-x-2">
            <span>{displayRatingStar(reviewList)}/5</span>
            <Rating
              name="size-small"
              value={displayRatingStar(reviewList)}
              precision={0.5}
              readOnly
              size="small"
            />
          </div>
        )}
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
