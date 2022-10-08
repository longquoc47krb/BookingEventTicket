/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { AiFillHeart, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { GoClock, GoLocation } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEventDetails } from "../../api/services/eventServices";
import Calendar from "../../components/calendar";
import { AlertError, AlertSuccess } from "../../components/common/alert";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import ReadMoreLess from "../../components/read-more";
import { useUserAuth } from "../../context/UserAuthContext";
import { setPathName } from "../../redux/slices/routeSlice";
import { addToWishList } from "../../redux/slices/wishlistSlice";
import { paragraph } from "../../utils/constants";
import {
  displayDate,
  displayTime,
  isEmpty,
  isNotEmpty,
  titleCase,
} from "../../utils/utils";
function EventDetail() {
  const { eventId } = useParams();
  const [isFav, setIsFav] = useState(false);
  const [yPosition, setYPosition] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState(null);
  const { data: eventTemp, status } = useEventDetails(eventId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  console.log({ user });
  // handle date
  let event = eventTemp?.data;
  moment.locale("vi");
  const eventStartingDate = displayDate(event?.startingDate);
  const eventEndingDate = displayDate(event?.endingDate);
  const eventStartingTime = displayTime(event?.startingTime);
  const eventEndingTime = displayTime(event?.endingTime);
  // scroll to section
  const introduce = useRef(null);
  const info = useRef(null);
  const organization = useRef(null);
  useEffect(() => {
    if (isFav) {
      dispatch(addToWishList(event));
    }
  }, [isFav]);
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
      AlertError({
        title: "Bạn chưa đăng nhập",
        text: `Nhấn "OK" để đăng nhập ngay`,
        callback: (result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        },
      });
    } else {
      AlertSuccess({
        title: "Huuuuuurayyy",
        text: "Bạn đã đăng nhập",
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
    return (
      <>
        <HelmetHeader title={event?.name} />
        <Header />
        <div className="event-detail-container">
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
            <div className="event-detail-button">
              <button onClick={handleCheckAuthenticated} className="buy-now">
                Mua vé ngay
              </button>
              <button
                className="interests"
                onClick={() => {
                  handleCheckAuthenticated();
                  if (isNotEmpty(user)) {
                    setIsFav(!isFav);
                  }
                }}
              >
                {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
                Quan tâm
              </button>
            </div>
          </div>
          <div className="event-detail-tab">
            <Affix>
              <Nav variant="tabs" className="bg-white w-[100vw] px-[1.5rem]">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(introduce)}
                    active={activeSection === "introduce" ? true : false}
                  >
                    Giới thiệu
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(info)}
                    active={activeSection === "info" ? true : false}
                  >
                    Thông tin vé
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => scrollToSection(organization)}
                    active={activeSection === "organization" ? true : false}
                  >
                    Nhà tổ chức
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Affix>
          </div>
          <div className="event-detail-wrapper">
            <div className="event-detail-wrapper-left">
              <div className="event-detail-content">
                <div ref={introduce} className="introduce">
                  Giới thiệu
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
                  Thông tin vé
                </div>
                <ReadMoreLess className="event-detail-long-content">
                  {paragraph}
                </ReadMoreLess>
              </div>
              <div className="event-detail-content">
                <div ref={organization} className="organization">
                  Nhà tổ chức
                </div>
                <div className="event-detail-organization">
                  <img src={event?.organization_logo} alt="logo" />
                  <h1>{event?.organization}</h1>
                  <p>{event?.organization_description}</p>
                  <button className="event-detail-organization-contact">
                    <AiOutlineMail />
                    Liên hệ
                  </button>
                </div>
              </div>
            </div>
            <div className="event-detail-wrapper-right">
              <Affix offsetTop={60}>
                <div className="event-detail-booking">
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
                  <button
                    onClick={handleCheckAuthenticated}
                    className="buy-now w-full px-[1.5rem] block mx-auto py-[1rem] text-xl"
                  >
                    Mua vé ngay
                  </button>
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

export default EventDetail;
