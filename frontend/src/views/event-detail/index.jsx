import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "../../components/calendar";
import { GoLocation, GoClock } from "react-icons/go";
import { AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import { Affix } from "antd";
import { useRef } from "react";
import { paragraph } from "../../services/constants";
import Nav from "react-bootstrap/Nav";
import { useEffect } from "react";
import ReadMore from "../../components/common/read-more";
import { withRouter } from "../../hoc/withRouter";
import httpRequest from "../../services/httpRequest";
function EventDetail(props) {
  console.log({ props });
  const { event } = props;
  const introduce = useRef(null);
  const info = useRef(null);
  const organization = useRef(null);
  const [yPosition, setYPosition] = useState(window.scrollY);
  const [activeSection, setActiveSection] = useState(null);
  const [eventData, setEventData] = useState(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 25,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    async function fetchEvent() {
      const response = await httpRequest({
        url: "/events",
        method: "GET",
        params: {
          id: 1,
        },
      });
      setEventData(response);
    }
    fetchEvent();
  }, []);
  console.log({ eventData });
  useEffect(() => {
    const handleYPosition = (e) => {
      setYPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleYPosition);
  }, [yPosition]);
  console.log({ yPosition });
  useEffect(() => {
    const sectionPosition = {
      introduce: introduce.current.offsetTop,
      info: info.current.offsetTop,
      organization: organization.current.offsetTop,
    };
    console.log("intro", sectionPosition.introduce);
    console.log("info", sectionPosition.info);
    console.log("organization", sectionPosition.organization);
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
    console.log({ activeSection });
  }, [introduce, info, organization, yPosition, activeSection]);
  return (
    <>
      <Header />
      <div className="event-detail-container">
        <img src={event.image} alt="" />
        <div className="event-detail-overview">
          <div className="event-detail-info">
            <Calendar className="event-detail-calendar" />
            <h1 className="event-detail-title">{event.title}</h1>
            <h1 className="event-detail-date">
              <GoClock className="text-gray-500" />
              {event.date}
            </h1>
            <div>
              <h1 className="event-detail-address">
                <GoLocation className="text-gray-500" />
                {event.address}
              </h1>
              <p className="event-detail-address-note">
                {event.address_detail}
              </p>
            </div>
          </div>
          <div className="event-detail-button">
            <button className="buy-now">Mua vé ngay</button>
            <button className="interests">
              <AiOutlineHeart />
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
              <ReadMore>{paragraph}</ReadMore>
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
                <img src={event.organization_logo} alt="logo" />
                <h1>{event.organization}</h1>
                <p>{event.organization_description}</p>
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
                  {event.title}
                </div>
                <div className="px-[1rem] mt-2 grid grid-rows-2 gap-y-4">
                  <h1 className="flex text-base items-center font-semibold gap-x-2">
                    <GoClock className="text-gray-500" />
                    {event.date}
                  </h1>
                  <div>
                    <h1 className="flex text-base items-center font-semibold gap-x-2">
                      <GoLocation className="text-gray-500" />
                      {event.address}
                    </h1>
                    <p className="event-detail-address-note">
                      {event.address_detail}
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
EventDetail.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    address: PropTypes.string,
    address_detail: PropTypes.string,
    organization: PropTypes.string,
    organization_logo: PropTypes.string,
    organization_description: PropTypes.string,
  }),
};
EventDetail.defaultProps = {
  event: {
    image:
      "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2022/09/06/93A027.jpg",
    title: "Những Thành Phố Mơ Màng – Autumn 2022",
    date: "Chủ nhật, 11 Tháng 9 2022 (06:00 PM - 10:00 PM)",
    address: "Công viên Yên Sở",
    address_detail: "Gamuda Central, Hoàng Mai, Hà Nội",
    organization: "NTPMM ENTERTAINMENT",
    organization_logo:
      "https://static.tkbcdn.com/Upload/organizerlogo/2022/07/26/6ABB7F.jpg",
    organization_description:
      "Những Thành Phố Mơ Màng là thành phố của tuổi trẻ, nơi những giấc mơ sẽ được chúng tớ cùng các cậu tạo nên trên nền nhạc những bài hát Indie và Underground.",
  },
};
export default withRouter(EventDetail);
