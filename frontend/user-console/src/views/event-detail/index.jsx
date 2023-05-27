/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";

import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoClock, GoLocation } from "react-icons/go";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import eventServices, {
  useEventDetails,
} from "../../api/services/eventServices";
import Calendar from "../../components/calendar";
import { AlertErrorPopup } from "../../components/common/alert";
import AppDrawer from "../../components/common/drawer";
import Header from "../../components/common/header";
import EventIncompleted from "../../components/event-incompleted";
import FooterComponent from "../../components/FooterComponent";
import GoogleMap from "../../components/google-map";
import HelmetHeader from "../../components/helmet";
import HomeDrawer from "../../components/home-drawer";
import Loading from "../../components/loading";
import Navigation from "../../components/navigation-event-detail";
import OrganizerInfo from "../../components/organizer-info";
import ReadMoreLess from "../../components/read-more";
import Review from "../../components/review";
import TicketComponent from "../../components/ticket-collapse";
import { useUserActionContext } from "../../context/UserActionContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { updateOrganizerInfo } from "../../redux/slices/eventSlice";
import { setPathName } from "../../redux/slices/routeSlice";
import { setCurrentStep } from "../../redux/slices/ticketSlice";
import { EventStatus } from "../../utils/constants";
import {
  compareDates,
  displayDate,
  displayTime,
  isEmpty,
  isNotEmpty,
  titleCase,
} from "../../utils/utils";
const { fetchOrganizerByEventId } = eventServices;
function EventDetail(props) {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { t } = useTranslation();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useUserActionContext();
  const reviewRef = useRef(null);
  const introduceRef = useRef(null);
  const infoRef = useRef(null);
  const organizationRef = useRef(null);
  const [activeButton, setActiveButton] = useState("introduce");
  const { data: event, status, isFetching } = useEventDetails(eventId);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  // const featuredEvent = status === "success" && featuredEventsTemp.data;
  if (localStorage.getItem("i18nextLng") === "en") {
    moment.locale("en");
  } else {
    moment.locale("vi");
  }
  // display date
  const eventStartingDate = displayDate(event?.startingDate);
  const eventEndingDate = displayDate(event?.endingDate);
  const eventStartingTime = displayTime(event?.startingTime);
  const eventEndingTime = displayTime(event?.endingTime);

  const handleCheckAuthenticated = () => {
    if (isEmpty(user)) {
      AlertErrorPopup({
        title: t("user.unauthenticated.title"),
        text: t("user.unauthenticated.text"),
      });
      navigate("/login");
    } else {
      navigate(`/ticket-booking/${eventId}`);
    }
  };
  useEffect(() => {
    dispatch(setCurrentStep(0));
    async function fetchOrganizerInfo() {
      const organizer = await fetchOrganizerByEventId(eventId);
      dispatch(updateOrganizerInfo(organizer));
    }
    fetchOrganizerInfo();
  }, [eventId]);
  if (status === "loading" || isFetching) {
    return <Loading />;
  } else if (status === "error" || isFetching) {
    navigate("/not-found");
    return null;
  } else {
    dispatch(setPathName(window.location.pathname));
    return (
      <>
        <HelmetHeader title={event?.name} />
        <Header />
        <div className="event-detail-container">
          <AppDrawer />
          <img src={event?.background} alt="" />
          <div className="event-detail-overview">
            <div className="event-detail-info">
              <Calendar
                className="event-detail-calendar"
                calendar={event?.startingDate}
              />
              <h1 className="event-detail-title">{event?.name}</h1>
              <h1 className="event-detail-date">
                <GoClock className="text-gray-500" />
                {eventEndingDate && eventEndingDate !== eventStartingDate
                  ? `${titleCase(eventStartingDate)} - ${titleCase(
                      eventEndingDate
                    )}`
                  : titleCase(eventStartingDate)}{" "}
                ({eventStartingTime}-{eventEndingTime})
              </h1>
              <div>
                <h1 className="event-detail-venue">
                  <GoLocation className="text-gray-500" />
                  {event?.venue}
                </h1>
                <p className="event-detail-venue-address mt-2">
                  {event?.venue_address}
                </p>
              </div>
            </div>
            <div className="event-detail-button">
              <button
                onClick={handleCheckAuthenticated}
                disabled={
                  event.status === EventStatus.SOLDOUT ||
                  event.status === EventStatus.COMPLETED
                    ? true
                    : false
                }
                className={
                  event.status === EventStatus.SOLDOUT ||
                  event.status === EventStatus.COMPLETED ||
                  compareDates(event.startingDate)
                    ? "disabled-button"
                    : "book-now"
                }
              >
                {t(
                  event.status === EventStatus.AVAILABLE
                    ? "event.book-now"
                    : event.status
                )}
              </button>
              {wishlist &&
              wishlist.length > 0 &&
              wishlist.find((e) => e === eventId) ? (
                <button
                  className="interests"
                  onClick={(e) => {
                    removeFromWishlist(eventId);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <IoMdHeart /> <span>{t("event.interested")}</span>
                  </div>
                </button>
              ) : (
                <button
                  className="interests"
                  onClick={(e) => {
                    if (isNotEmpty(user)) {
                      addToWishlist(eventId);
                    } else {
                      handleCheckAuthenticated();
                    }
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <IoMdHeartEmpty /> <span>{t("event.interest")}</span>
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="event-detail-tab">
            <Affix>
              <Navigation
                introduceRef={introduceRef}
                infoRef={infoRef}
                organizationRef={organizationRef}
                reviewRef={reviewRef}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
            </Affix>
          </div>
          <div className="event-detail-wrapper" ref={reviewRef}>
            {activeButton === "review" ? (
              event.status === EventStatus.COMPLETED ? (
                <Review />
              ) : (
                <EventIncompleted />
              )
            ) : (
              <div className="event-detail-wrapper-left">
                <div className="event-detail-content">
                  <div ref={introduceRef} className="introduce">
                    {t("introduce")}
                  </div>
                  <ReadMoreLess className="event-detail-long-content">
                    {event?.description}
                  </ReadMoreLess>
                </div>
                <div className="event-detail-content">
                  <div ref={infoRef} className="info">
                    {t("ticket-info")}
                  </div>
                  <div>
                    {event.organizationTickets.map((ticket, index) => (
                      <TicketComponent ticket={ticket} />
                    ))}
                  </div>
                </div>
                <div className="event-detail-content">
                  <OrganizerInfo
                    ref={organizationRef}
                    handleCheckAuthenticated={handleCheckAuthenticated}
                    user={user}
                  />
                </div>
              </div>
            )}
            <div className="event-detail-wrapper-right">
              <div className="h-full">
                <div className="event-detail-booking sticky-container">
                  <div ref={introduceRef} className="introduce">
                    {event?.name}
                  </div>
                  <div className="px-[1rem] mt-2">
                    <h1 className="flex text-base items-center font-semibold gap-x-2 mb-2">
                      <GoClock className="text-gray-500" />
                      {`${eventStartingTime} - ${eventEndingTime}`}
                    </h1>
                    <div>
                      <h1 className="flex text-base items-center font-semibold gap-x-2 mb-2">
                        <GoLocation className="text-gray-500" />
                        {event?.venue}
                      </h1>
                      <p className="event-detail-address-note mb-2">
                        {event?.venue_address}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckAuthenticated}
                    disabled={
                      event.status === EventStatus.SOLDOUT ||
                      event.status === EventStatus.COMPLETED
                        ? true
                        : false
                    }
                    className={
                      event.status === EventStatus.SOLDOUT ||
                      event.status === EventStatus.COMPLETED
                        ? "disabled-button w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
                        : "book-now w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
                    }
                  >
                    {t(
                      event.status === EventStatus.AVAILABLE
                        ? "event.book-now"
                        : event.status
                    )}
                  </button>
                  <GoogleMap event={event} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomeDrawer
          toggleDrawer={toggleDrawer}
          onClose={() => setToggleDrawer(false)}
        />
        <FooterComponent
          toggleDrawer={toggleDrawer}
          setToggleDrawer={setToggleDrawer}
        />
      </>
    );
  }
}
export default EventDetail;
