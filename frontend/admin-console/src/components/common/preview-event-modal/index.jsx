import { Modal } from "antd";
import React, { useEffect } from "react";
import { GoClock, GoLocation } from "react-icons/go";
import { useEventDetails } from "../../../api/services/eventServices";
import Calendar from "../../calendar";
import { has, map, sumBy } from "lodash";
import ReadMoreLess from "../../common/read-more";
import { useTranslation } from "react-i18next";
import {
  convertMongodbTimeToString,
  displayDate,
  displayTime,
  titleCase,
} from "../../../utils/utils";
import { Spin } from "antd";
import TicketComponent from "../ticket-collapse";
import { useFetchReviewList } from "../../../api/services/reviewServices";
import RatingStats from "../rating-stats";
import FeedbackList from "../feedback-list";
import { EventStatus } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { starOfThisEventSelector } from "../../../redux/slices/eventSlice";
import { Rating } from "@mui/material";
import { MdFormatListBulleted } from "react-icons/md";
function PreviewEventModal({ visible, onCancel, eventId }) {
  const { data: event, isLoading } = useEventDetails(eventId);

  // display date
  const eventStartingDate = displayDate(event?.startingDate);
  const eventEndingDate = displayDate(event?.endingDate);
  const eventStartingTime = displayTime(event?.startingTime);
  const eventEndingTime = displayTime(event?.endingTime);

  const ratingOfEvent = useSelector(starOfThisEventSelector);
  const { data: allReviews, isLoading: reviewLoading } =
    useFetchReviewList(eventId);
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      title={
        <p
          className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[40vw]"
          dangerouslySetInnerHTML={{
            __html: t("event.preview", { name: event?.name }),
          }}
        />
      }
      onCancel={onCancel}
      footer={null}
      width={"60vw"}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="flex justify-between w-full">
            <h1 className="font-medium text-lg text-gray-300">
              {eventId
                ? `${t("event.createDate")}${convertMongodbTimeToString(
                    event?.createdDate
                  )}`
                : null}
            </h1>
            <h1 className="font-medium text-lg text-gray-300">
              {has(event, "updatedDate") && event?.updatedDate
                ? `${t("event.updateDate")}${convertMongodbTimeToString(
                    event?.updatedDate
                  )}`
                : null}
            </h1>
          </div>
          <img src={event?.background} alt={event?.name} />

          <div className="w-full flex items-start mt-3">
            <Calendar calendar={event?.startingDate} />
            <div className="ml-4">
              <h1 className="text-xl font-bold">{event?.name}</h1>
              <h1 className="flex items-center gap-x-4 font-semibold">
                <GoClock className="text-gray-500" />
                {eventEndingDate && eventEndingDate !== eventStartingDate
                  ? `${titleCase(eventStartingDate)} - ${titleCase(
                      eventEndingDate
                    )}`
                  : titleCase(eventStartingDate)}{" "}
                ({eventStartingTime}-{eventEndingTime})
              </h1>
              <div>
                <h1 className="flex items-center gap-x-4 font-semibold">
                  <GoLocation className="text-gray-500" />
                  {event?.venue}
                </h1>
                <p className="event-detail-venue-address mt-2">
                  {event?.venue_address}
                </p>
              </div>
            </div>
          </div>
          {ratingOfEvent > 0 ? (
            <div className="flex items-center gap-x-2">
              <span className="text-lg ml-4">
                {t("review")}: <b>{ratingOfEvent}</b>
              </span>
              <Rating
                name="size-small"
                value={ratingOfEvent}
                precision={0.25}
                readOnly
                size="small"
              />
            </div>
          ) : null}
          <div className="w-full mt-3">
            <div className="event-detail-content">
              <div className="text-primary text-xl font-bold mb-2 flex items-center">
                <MdFormatListBulleted className="mr-4" />
                <span>{t("introduce")}</span>
              </div>
              <ReadMoreLess className="event-detail-long-content">
                {event?.description}
              </ReadMoreLess>
            </div>

            <div className="event-detail-content">
              <div className="text-primary text-xl font-bold mb-2 flex items-center">
                <MdFormatListBulleted className="mr-4" />
                <span>{t("ticket-info")}</span>
              </div>
              <div>
                {event?.organizationTickets.map((ticket, index) => (
                  <TicketComponent ticket={ticket} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mt-3">
            <div className="text-primary text-xl font-bold mb-2 flex items-center">
              <MdFormatListBulleted className="mr-4" />
              <span>{t("review")}</span>
            </div>
            <hr className="mb-4" />
            {event?.status === EventStatus.COMPLETED ? (
              !reviewLoading && (
                <div className="mx-4">
                  <RatingStats reviewList={allReviews} />
                  <FeedbackList
                    feedbacks={allReviews}
                    isFeedbackByCurrentUser={false}
                  />
                </div>
              )
            ) : (
              <p className="text-2xl font-bold text-center">
                {t("review-event-incompleted")}
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default PreviewEventModal;
