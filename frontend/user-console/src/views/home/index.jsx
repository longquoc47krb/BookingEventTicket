/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  useFetchEventsByProvince,
  useFetchFeaturedEvents,
} from "../../api/services/eventServices";
import { useLocationName } from "../../api/services/generalServices";
import Carousel from "../../components/common/carousel";
import AppDrawer from "../../components/common/drawer";
import EventHomeItem from "../../components/common/event-home-item";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import SiderBar from "../../components/common/sider";
import ViewMoreButton from "../../components/common/view-more-button";
import EventHomeSkeletonItem from "../../components/event-home-skeleton";
import FooterComponent from "../../components/FooterComponent";
import HelmetHeader from "../../components/helmet";
import { setStatus } from "../../redux/slices/filterSlice";
import { setPathName } from "../../redux/slices/routeSlice";
import constants, { TicketStatus } from "../../utils/constants";
const { provinceMapping } = constants;
function Home() {
  const { data: location, status: locationStatus } = useLocationName();
  const { data: featuredEvents, status: featuredEventStatus } =
    useFetchFeaturedEvents();
  const { data: eventsByProvince, status: eventsByProvinceStatus } =
    useFetchEventsByProvince(
      provinceMapping.get(location ? location?.region : "")
    );
  const sucessStatus =
    featuredEventStatus === "success" && eventsByProvinceStatus === "success";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 767px)");
  dispatch(setPathName(window.location.pathname));
  console.log({
    sucessStatus,
    eventsByProvince,
    featuredEvents,
  });
  return (
    <>
      <HelmetHeader title={t("pages.home")} content="Home page" />
      <Affix offsetTop={0}>
        <Header />
      </Affix>

      <div className="home-container">
        <AppDrawer />
        <div className="h-auto">
          <SiderBar className="sider" />
        </div>
        <div className="home-content">
          {!sucessStatus ? (
            <Skeleton width={"100%"} height={"20vh"} />
          ) : isMobile ? (
            <Carousel data={featuredEvents} />
          ) : (
            <Carousel data={featuredEvents} loop={false} />
          )}
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
          <div className="home-popular">
            <SectionTitle>{t("event.trending")}</SectionTitle>
            <div className="home-popular-content">
              {!sucessStatus
                ? [...Array(16)].map((i) => <EventHomeSkeletonItem />)
                : featuredEvents
                    .filter((e) => e.remainingTicket !== 0)
                    .slice(0, 16)
                    .map((event) => <EventHomeItem event={event} />)}
            </div>
            <ViewMoreButton
              onClick={() => {
                dispatch(setStatus(TicketStatus.AVAILABLE));
                navigate("/events");
              }}
            />
          </div>
          <div className="home-event-near-you">
            <SectionTitle>{t("event.near-you")}</SectionTitle>
            <div className="home-event-near-you-content">
              {!sucessStatus
                ? [...Array(8)].map((i) => <EventHomeSkeletonItem />)
                : eventsByProvince.data.map((event) => (
                    <EventHomeItem event={event} />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default Home;
