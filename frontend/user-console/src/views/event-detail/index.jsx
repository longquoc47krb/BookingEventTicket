/* eslint-disable jsx-a11y/iframe-has-title */
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
import organizationServices from "../../api/services/organizationServices";
import Calendar from "../../components/calendar";
import { AlertErrorPopup } from "../../components/common/alert";
import AppDrawer from "../../components/common/drawer";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import parse from "html-react-parser";
import ReadMoreLess from "../../components/read-more";
import TicketComponent from "../../components/ticket-collapse";
import { useUserActionContext } from "../../context/UserActionContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { setPathName } from "../../redux/slices/routeSlice";
import { clearCart, setCurrentStep } from "../../redux/slices/ticketSlice";
import { EventStatus } from "../../utils/constants";
import {
  displayDate,
  displayTime,
  isEmpty,
  isNotEmpty,
  titleCase,
} from "../../utils/utils";
import FooterComponent from "../../components/FooterComponent";
import HomeDrawer from "../../components/home-drawer";
const { findOrganizerById } = organizationServices;
function EventDetail(props) {
  const { eventId } = useParams();
  // const wishList = useSelector(wishlistSelector);
  const [yPosition, setY] = useState(window.scrollY);
  const container = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const { data: event, status, isFetching } = useEventDetails(eventId);
  const [organizer, setOrganizer] = useState();
  useEffect(() => {
    async function fetchOrganizerInfo() {
      const res = await findOrganizerById(event?.host_id);
      setOrganizer(res);
    }
    fetchOrganizerInfo();
  }, [event]);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { t } = useTranslation();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useUserActionContext();
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
      setY(window.scrollY);
    };
    window.addEventListener("scroll", handleYPosition);
  }, [yPosition]);
  const handleCheckAuthenticated = () => {
    if (isEmpty(user)) {
      AlertErrorPopup({
        title: t("user.unauthenticated.title"),
        text: t("user.unauthenticated.text"),
      });
    } else {
      navigate(`/ticket-booking/${eventId}`);
    }
  };
  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, []);
  useEffect(() => {
    if (status !== "loading" && status !== "error" && !isFetching) {
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
  useEffect(() => {}, [wishlist]);
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
                  event.status === EventStatus.COMPLETED
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
          <div className="event-detail-wrapper" ref={container}>
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
                <div>
                  {event.organizationTickets.map((ticket, index) => (
                    <TicketComponent ticket={ticket} />
                  ))}
                </div>
              </div>
              <div className="event-detail-content">
                <div ref={organization} className="organization">
                  {t("organizer")}
                </div>
                <div className="event-detail-organization">
                  <img src={organizer?.avatar} alt="logo" />
                  <h1>{organizer?.name}</h1>

                  <p>{parse(String(organizer?.biography))}</p>
                  <button
                    className="event-detail-organization-contact"
                    onClick={() => {
                      window.open(`mailto:${organizer?.email}`, "_blank");
                    }}
                  >
                    <AiOutlineMail />
                    {t("org.contact")}
                  </button>
                </div>
              </div>
            </div>
            <div className="event-detail-wrapper-right">
              <div className="h-full">
                <div className="event-detail-booking sticky-container">
                  <div ref={introduce} className="introduce">
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
                  <div
                    className="w-full bg-white h-[20rem] sticky 
                top-[48vh] py-2 px-4 event-detail-content"
                  >
                    <div className="introduce mx-0 pt-0 mb-2">
                      {t("event.address")}
                    </div>
                    <iframe
                      width="100%"
                      height="80%"
                      id="gmap_canvas"
                      src={`https://maps.google.com/maps?q=${event?.venue_address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe>
                  </div>
                </div>
                {/* <div className="h-[87vh] mt-4">
                  
                </div> */}
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
