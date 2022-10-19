/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
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
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import { setPathName } from "../../redux/slices/routeSlice";
function Home() {
  const { featuredEvents, eventsByProvince, loadingStatus, errorStatus } =
    useUserFetchDataContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 767px)");
  dispatch(setPathName(window.location.pathname));
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
          {loadingStatus ? (
            <Skeleton width={"100%"} height={"20vh"} />
          ) : errorStatus ? (
            navigate("/not-found")
          ) : isMobile ? (
            <Carousel data={featuredEvents} />
          ) : (
            <Carousel data={featuredEvents} loop={false} />
          )}
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
          <div className="home-popular">
            <SectionTitle>{t("event.trending")}</SectionTitle>
            <div className="home-popular-content">
              {loadingStatus
                ? [...Array(16)].map((i) => <EventHomeSkeletonItem />)
                : errorStatus
                ? navigate("/not-found")
                : featuredEvents
                    .filter((e) => e.remainingTicket !== 0)
                    .slice(0, 16)
                    .map((event) => <EventHomeItem event={event} />)}
            </div>
            <ViewMoreButton onClick={() => navigate("/events")} />
          </div>
          <div className="home-event-near-you">
            <SectionTitle>{t("event.near-you")}</SectionTitle>
            <div className="home-event-near-you-content">
              {loadingStatus
                ? [...Array(8)].map((i) => <EventHomeSkeletonItem />)
                : errorStatus
                ? navigate("/not-found")
                : eventsByProvince.map((event) => (
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
