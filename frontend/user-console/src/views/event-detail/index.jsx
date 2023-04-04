/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Affix } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { GoClock, GoLocation } from "react-icons/go";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerAPI } from "../../api/configs/customer";
import customerServices from "../../api/services/customerServices";
import eventServices, {
  useEventDetails,
} from "../../api/services/eventServices";
import Calendar from "../../components/calendar";
import { AlertErrorPopup } from "../../components/common/alert";
import AppDrawer from "../../components/common/drawer";
import Header from "../../components/common/header";
import EventIncompleted from "../../components/event-incompleted";
import FooterComponent from "../../components/FooterComponent";
import HelmetHeader from "../../components/helmet";
import HomeDrawer from "../../components/home-drawer";
import Loading from "../../components/loading";
import ReadMoreLess from "../../components/read-more";
import Review from "../../components/review";
import TicketComponent from "../../components/ticket-collapse";
import { useUserActionContext } from "../../context/UserActionContext";
import { useUserAuth } from "../../context/UserAuthContext";
import {
  isCompletedSelector,
  setIsCompleted,
} from "../../redux/slices/eventSlice";
import { setPathName } from "../../redux/slices/routeSlice";
import { setCurrentStep } from "../../redux/slices/ticketSlice";
import httpRequest from "../../services/httpRequest";
import { EventStatus } from "../../utils/constants";
import {
  displayDate,
  displayTime,
  isEmpty,
  isNotEmpty,
  titleCase,
} from "../../utils/utils";
const { followOrg, unfollowOrg } = customerServices;
const { fetchOrganizerByEventId } = eventServices;
function EventDetail(props) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();
  const [organizer, setOrganizer] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [showFollowed, setShowFollowed] = useState(false);
  const { data: isFollowed } = useQuery(
    ["checkFollowedOrganizer", user.email, organizer.email],
    () => {
      const checkIsFollowedOrganizer = async (userId, organizerEmail) => {
        try {
          const response = await httpRequest(
            CustomerAPI.checkIsFollowedOrganizer(userId, organizerEmail)
          );
          setShowFollowed(response.data);
          return response.data;
        } catch (error) {
          return error.response.data;
        }
      };
      checkIsFollowedOrganizer(user.email, organizer.email);
    },
    {
      staleTime: 0,
    }
  );
  const [yPosition, setY] = useState(window.scrollY);
  const { t } = useTranslation();
  const isCompleted = useSelector(isCompletedSelector);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useUserActionContext();
  const followButtonTheme = {
    false: {
      theme:
        "bg-white px-4 py-2 text-[#1F3E82] border-[#1F3E82] border-2 rounded-2xl flex gap-x-2 items-center",
      title: (
        <>
          <SlUserFollow />
          <span>{t("org.follow")}</span>
        </>
      ),
    },
    true: {
      theme:
        "bg-[#1F3E82] px-4 py-2 text-white border-white border-2 rounded-2xl flex gap-x-2 items-center",
      title: (
        <>
          <SlUserFollowing />
          <span>{t("org.followed")}</span>
        </>
      ),
    },
  };
  const container = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const { data: event, status, isFetching } = useEventDetails(eventId);

  // Check if event is completed
  useEffect(() => {
    event &&
      dispatch(setIsCompleted(!!(event["status"] === EventStatus.COMPLETED)));
  }, [isFollowed]);
  const handleFollowClick = () => {
    const email = organizer.email;
    async function handleFollowOrganizer() {
      if (isEmpty(user)) {
        handleCheckAuthenticated();
      } else {
        if (isFollowed) {
          await unfollowOrg(user.id, email);
          setShowFollowed(false);
        }
        // Otherwise, follow the organizer.
        else {
          await followOrg(user.id, email);
          setShowFollowed(true);
        }
      }
    }
    handleFollowOrganizer();
  };
  useEffect(() => {
    async function fetchOrganizerInfo() {
      const res = await fetchOrganizerByEventId(eventId);
      setOrganizer(res);
    }
    fetchOrganizerInfo();
  }, [event]);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  console.log({ user });
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
        introduce:
          activeSection === "review" ? null : introduce.current.offsetTop,
        info: activeSection === "review" ? null : info.current.offsetTop,
        organization:
          activeSection === "review" ? null : organization.current.offsetTop,
      };
      if (
        yPosition >= sectionPosition.introduce - 30 &&
        yPosition < sectionPosition.info - 30 &&
        activeSection !== "review"
      ) {
        setActiveSection("introduce");
      } else if (
        yPosition >= sectionPosition.info - 30 &&
        yPosition < sectionPosition.organization - 30 &&
        activeSection !== "review"
      ) {
        setActiveSection("info");
      } else if (
        yPosition >= sectionPosition.organization - 30 &&
        activeSection !== "review"
      ) {
        setActiveSection("organization");
      }
    }
  }, [introduce, info, organization, yPosition, activeSection, status]);
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
                    onClick={() => {
                      setActiveSection("introduce");
                      scrollToSection(introduce);
                    }}
                    active={activeSection === "introduce" ? true : false}
                  >
                    {t("introduce")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setActiveSection("info");
                      scrollToSection(info);
                    }}
                    active={activeSection === "info" ? true : false}
                  >
                    {t("ticket-info")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setActiveSection("organization");
                      scrollToSection(organization);
                    }}
                    active={activeSection === "organization" ? true : false}
                  >
                    {t("organizer")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveSection("review")}
                    active={activeSection === "review" ? true : false}
                  >
                    {t("review")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Affix>
          </div>
          <div className="event-detail-wrapper" ref={container}>
            {activeSection === "review" ? (
              isCompleted ? (
                <Review />
              ) : (
                <EventIncompleted />
              )
            ) : (
              <div className="event-detail-wrapper-left">
                <div className="event-detail-content">
                  <div ref={introduce} className="introduce">
                    {t("introduce")}
                  </div>
                  <ReadMoreLess className="event-detail-long-content">
                    {event?.description}
                  </ReadMoreLess>
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
                    <div className="flex gap-x-4 items-start">
                      <h1>{organizer?.name}</h1>
                      <button
                        className={followButtonTheme[showFollowed].theme}
                        onClick={handleFollowClick}
                      >
                        {followButtonTheme[showFollowed].title}
                      </button>
                    </div>
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
            )}
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
// EventDetail.propTypes = {
//   organizer: PropTypes.object.isRequired,
// };
// EventDetail.defaultProps = {
//   organizer: {
//     logo: "https://static.tkbcdn.com/Upload/organizerlogo/2022/07/26/6ABB7F.jpg",
//     name: "AMAZING SHOW",
//     description:
//       "Amazing Show là đơn vị tổ chức sự kiện, biểu diễn âm nhạc hàng tuần tại Đà Lạt. Follow Amazing show: - Youtube: https://bit.ly/3pw3XPT - Tiktok: https://bit.ly/32rlQXv - Website: amazingshow.vn - Địa Chỉ: Số 14 Đống Đa, Phường 3, Đà Lạt",
//   },
// };
export default EventDetail;
