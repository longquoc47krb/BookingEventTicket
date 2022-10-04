/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { AiFillHeart, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { GoClock, GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Calendar from "../../components/calendar";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import ReadMore from "../../components/common/read-more";
import HelmetHeader from "../../components/helmet";
import {
  eventNameSelector,
  selectEventByName,
} from "../../redux/slices/eventSlice";
import { paragraph } from "../../utils/constants";
import { AppUtils } from "../../utils/AppUtils";
import {
  addToWishList,
  removeFromWishList,
  // removeFromWishList,
} from "../../redux/slices/wishlistSlice";
import { useEventDetails } from "../../api/services/eventServices";
import Loading from "../../components/loading";

// import { TextEditor } from "../../components/common/editor";
const { titleCase } = AppUtils;
function EventDetail() {
  const { eventId } = useParams();
  const [isFav, setIsFav] = useState(false);
  const { data: eventTemp, status, isFetching } = useEventDetails(eventId);
  const dispatch = useDispatch();
  // handle date
  let event = eventTemp?.data;
  console.log({ event });
  const dateFormat = (moment.defaultFormat = "DD/MM/YYYY");
  moment.locale("vi");
  const eventStartingTime = moment(event?.startingTime, dateFormat).format(
    "LLLL"
  );
  // scroll to section
  const introduce = useRef(null);
  const info = useRef(null);
  const organization = useRef(null);
  const [yPosition, setYPosition] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState(null);
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
  useEffect(() => {
    if (status !== "loading") {
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
  console.log({ event, status, isFetching });
  if (status === "loading") {
    return <Loading />;
  } else {
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
                calendar={event?.startingTime}
              />
              <h1 className="event-detail-title">{event?.name}</h1>
              <h1 className="event-detail-date">
                <GoClock className="text-gray-500" />
                {titleCase(eventStartingTime)}
              </h1>
              <div>
                <h1 className="event-detail-address">
                  <GoLocation className="text-gray-500" />
                  {event?.address}
                </h1>
                <p className="event-detail-address-note">
                  {event?.address_detail}
                </p>
              </div>
            </div>
            <div className="event-detail-button">
              <button className="buy-now">Mua vé ngay</button>
              <button
                className="interests"
                onClick={() => {
                  setIsFav(!isFav);
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
                <ReadMore>{event?.description}</ReadMore>
                {/* <TextEditor /> */}
              </div>
              <div className="event-detail-content">
                <div ref={info} className="info">
                  Thông tin vé
                </div>
                <ReadMore>{paragraph}</ReadMore>
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
                  <div className="px-[1rem] mt-2 grid grid-rows-2 gap-y-4">
                    <h1 className="flex text-base items-center font-semibold gap-x-2">
                      <GoClock className="text-gray-500" />
                      {titleCase(eventStartingTime)}
                    </h1>
                    <div>
                      <h1 className="flex text-base items-center font-semibold gap-x-2">
                        <GoLocation className="text-gray-500" />
                        {event?.address}
                      </h1>
                      <p className="event-detail-address-note">
                        {event?.address_detail}
                      </p>
                    </div>
                  </div>
                  <button className="buy-now w-full px-[1.5rem] block mx-auto py-[1rem] text-xl">
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
