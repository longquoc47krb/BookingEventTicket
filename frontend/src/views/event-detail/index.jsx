/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { GoClock, GoLocation } from "react-icons/go";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEventDetails } from "../../api/services/eventServices";
import Calendar from "../../components/calendar";
import { AlertErrorPopup } from "../../components/common/alert";
import AppDrawer from "../../components/common/drawer";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import ReadMoreLess from "../../components/read-more";
import { useUserActionContext } from "../../context/UserActionContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { setPathName } from "../../redux/slices/routeSlice";
import { paragraph, TicketStatus } from "../../utils/constants";
import {
  displayDate,
  displayTime,
  isEmpty,
  isNotEmpty,
  titleCase,
} from "../../utils/utils";
function EventDetail(props) {
  const { eventId } = useParams();
  const { organizer } = props;
  // const wishList = useSelector(wishlistSelector);
  const [yPosition, setYPosition] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState(null);
  const { data: eventTemp, status } = useEventDetails(eventId);
  // const { data: featuredEventsTemp } = useFetchFeaturedEvents();
  const buttonGroupRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { t } = useTranslation();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useUserActionContext();
  const event = status === "success" && eventTemp.data;
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
  // scroll to section
  const introduce = useRef(null);
  const info = useRef(null);
  const organization = useRef(null);

  const scrollToSection = (elementRef) => {
    if (status !== "loading") {
      window.scrollTo({
        top: elementRef.current.offsetTop - 25,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const handleYPosition = (e) => {
      setYPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleYPosition);
  }, [yPosition]);
  const handleCheckAuthenticated = () => {
    if (isEmpty(user)) {
      AlertErrorPopup({
        title: t("user.unauthenticated.title"),
        text: t("user.unauthenticated.text"),
      });
    }
  };

  useEffect(() => {
    if (status !== "loading" && status !== "error") {
      const sectionPosition = {
        introduce: introduce.current.offsetTop,
        info: info.current.offsetTop,
        organization: organization.current.offsetTop,
      };
      if (
        yPosition >= sectionPosition.introduce - 30 &&
        yPosition < sectionPosition.info - 30
      ) {
        setActiveSection("introduce");
      } else if (
        yPosition >= sectionPosition.info - 30 &&
        yPosition < sectionPosition.organization - 30
      ) {
        setActiveSection("info");
      } else if (yPosition >= sectionPosition.organization - 30) {
        setActiveSection("organization");
      } else {
        setActiveSection(null);
      }
    }
  }, [introduce, info, organization, yPosition, activeSection, status]);
  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    navigate("/not-found");
    return null;
  } else {
    dispatch(setPathName(window.location.pathname));
    console.log("buttonRef", buttonGroupRef);
    console.log("rightWrapperRef", rightWrapperRef);
    const renderStatus = (status, ref) => {
      switch (status) {
        case TicketStatus.AVAILABLE:
          if (ref === buttonGroupRef.current) {
            return (
              <button onClick={handleCheckAuthenticated} className="buy-now">
                {t("event.buy-now")}
              </button>
            );
          }
          return (
            <button
              onClick={handleCheckAuthenticated}
              className="buy-now w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
            >
              {t("event.buy-now")}
            </button>
          );

        case TicketStatus.SOLDOUT:
          if (ref === buttonGroupRef.current) {
            return (
              <button
                onClick={handleCheckAuthenticated}
                className="disabled-button"
              >
                {t("event.sold-out")}
              </button>
            );
          }
          return (
            <button
              onClick={handleCheckAuthenticated}
              className="disabled-button w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
            >
              {t("event.sold-out")}
            </button>
          );
        case TicketStatus.COMPLETED:
          if (ref === buttonGroupRef.current) {
            return (
              <button
                onClick={handleCheckAuthenticated}
                className="disabled-button"
              >
                {t("event.completed")}
              </button>
            );
          }
          return (
            <button
              onClick={handleCheckAuthenticated}
              className="disabled-button w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
            >
              {t("event.completed")}
            </button>
          );
        default:
          if (ref === buttonGroupRef.current) {
            return (
              <button onClick={handleCheckAuthenticated} className="buy-now">
                {t("event.buy-now")}
              </button>
            );
          }
          return (
            <button
              onClick={handleCheckAuthenticated}
              className="buy-now w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
            >
              {t("event.buy-now")}
            </button>
          );
      }
    };
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
                <h1 className="event-detail-address">
                  <GoLocation className="text-gray-500" />
                  {event?.venue}
                </h1>
                <p className="event-detail-address-note">
                  {event?.venue_address}
                </p>
              </div>
            </div>
            <div className="event-detail-button" ref={buttonGroupRef}>
              {renderStatus(event.status, buttonGroupRef.current)}
              {wishlist &&
              wishlist.length > 0 &&
              wishlist.find((e) => e === event.id) ? (
                <button
                  className="interests"
                  onClick={(e) => {
                    removeFromWishlist(event.id);
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
                      addToWishlist(event.id);
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
              <Nav
                variant="tabs"
                className="bg-white w-[100vw] md:px-[1.5rem] px-0 text-base"
              >
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(introduce)}
                    active={activeSection === "introduce" ? true : false}
                  >
                    {t("introduce")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(info)}
                    active={activeSection === "info" ? true : false}
                  >
                    {t("ticket-info")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(organization)}
                    active={activeSection === "organization" ? true : false}
                  >
                    {t("organizer")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Affix>
          </div>
          <div className="event-detail-wrapper">
            <div className="event-detail-wrapper-left">
              <div className="event-detail-content">
                <div ref={introduce} className="introduce">
                  {t("introduce")}
                </div>
                <ReadMoreLess className="event-detail-long-content">
                  {event?.description}
                </ReadMoreLess>
                {/* <DraftEditor
                  content={content.length > 0 ? content : ""}
                  setContent={setContent}
                /> */}
              </div>
              <div className="event-detail-content">
                <div ref={info} className="info">
                  {t("ticket-info")}
                </div>
                <ReadMoreLess className="event-detail-long-content">
                  {paragraph}
                </ReadMoreLess>
              </div>
              <div className="event-detail-content">
                <div ref={organization} className="organization">
                  {t("organizer")}
                </div>
                <div className="event-detail-organization">
                  <img src={organizer.logo} alt="logo" />
                  <h1>{organizer.name}</h1>
                  <p>{organizer.description}</p>
                  <button
                    className="event-detail-organization-contact"
                    href="mailto:xyz@something.com"
                  >
                    <AiOutlineMail />
                    {t("org.contact")}
                  </button>
                </div>
              </div>
            </div>
            <div className="event-detail-wrapper-right">
              <Affix offsetTop={60}>
                <div className="event-detail-booking" ref={rightWrapperRef}>
                  <div ref={introduce} className="introduce">
                    {event?.name}
                  </div>
                  <div className="px-[1rem] mt-2">
                    <h1 className="flex text-base items-center font-semibold gap-x-2">
                      <GoClock className="text-gray-500" />
                      {`${eventStartingTime} - ${eventEndingTime}`}
                    </h1>
                    <div>
                      <h1 className="flex text-base items-center font-semibold gap-x-2">
                        <GoLocation className="text-gray-500" />
                        {event?.venue}
                      </h1>
                      <p className="event-detail-address-note">
                        {event?.venue_address}
                      </p>
                    </div>
                  </div>
                  {renderStatus(event.status, rightWrapperRef.current)}
                </div>
              </Affix>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
EventDetail.propTypes = {
  organizer: PropTypes.object.isRequired,
};
EventDetail.defaultProps = {
  organizer: {
    logo: "https://static.tkbcdn.com/Upload/organizerlogo/2022/07/26/6ABB7F.jpg",
    name: "AMAZING SHOW",
    description:
      "Amazing Show là đơn vị tổ chức sự kiện, biểu diễn âm nhạc hàng tuần tại Đà Lạt. Follow Amazing show: - Youtube: https://bit.ly/3pw3XPT - Tiktok: https://bit.ly/32rlQXv - Website: amazingshow.vn - Địa Chỉ: Số 14 Đống Đa, Phường 3, Đà Lạt",
  },
};
export default EventDetail;
