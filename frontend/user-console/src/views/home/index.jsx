/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  useFetchBestSellerEvents,
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
import HomeDrawer from "../../components/home-drawer";
import { setProvince, setStatus } from "../../redux/slices/filterSlice";
import { setPathName } from "../../redux/slices/routeSlice";
import constants, { EventStatus } from "../../utils/constants";
import { isNotEmpty } from "../../utils/utils";
const { provinceMapping, province } = constants;
function Home() {
  const { data: location, status: locationStatus } = useLocationName();
  const [openModal, setOpenModal] = useState(true);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { data: featuredEvents, status: featuredEventStatus } =
    useFetchFeaturedEvents();
  const { data: bestSellerEvents, status: bestSellerEventsStatus } =
    useFetchBestSellerEvents();
  const { data: eventsByProvince, status: eventsByProvinceStatus } =
    useFetchEventsByProvince(
      provinceMapping.get(location ? location.region : "")
    );
  const sucessStatus =
    featuredEventStatus === "success" || eventsByProvinceStatus === "success";
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
          {featuredEventStatus !== "success" ? (
            <Skeleton width={"100%"} height={"20vh"} />
          ) : isMobile ? (
            <Carousel data={featuredEvents} />
          ) : (
            <Carousel data={featuredEvents} loop={false} />
          )}
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
          <div className="home-popular">
            {bestSellerEventsStatus === "success" &&
              isNotEmpty(bestSellerEvents) &&
              bestSellerEvents.length >= 10 && (
                <div className="home-popular">
                  <SectionTitle>{t("event.best-seller")}</SectionTitle>
                  <div className="home-popular-content">
                    {!sucessStatus
                      ? [...Array(10)].map((i) => <EventHomeSkeletonItem />)
                      : bestSellerEvents
                          .slice(0, 10)
                          .map((event) => <EventHomeItem event={event} />)}
                  </div>
                </div>
              )}
          </div>
          <div className="home-popular">
            <SectionTitle>{t("event.trending")}</SectionTitle>
            <div className="home-popular-content">
              {featuredEventStatus !== "success"
                ? [...Array(16)].map((i) => <EventHomeSkeletonItem />)
                : featuredEvents
                    .filter((e) => e.status !== EventStatus.SOLDOUT)
                    .slice(0, 16)
                    .map((event) => <EventHomeItem event={event} />)}
            </div>
            <ViewMoreButton
              onClick={() => {
                dispatch(setStatus(EventStatus.AVAILABLE));
                navigate("/events");
              }}
            />
          </div>
          {eventsByProvinceStatus === "success" &&
            isNotEmpty(eventsByProvince.data) && (
              <div className="home-event-near-you">
                <SectionTitle>
                  {t("event.near-you", { val: t(location.region) })}
                </SectionTitle>
                <div className="home-event-near-you-content">
                  {!sucessStatus
                    ? [...Array(8)].map((i) => <EventHomeSkeletonItem />)
                    : eventsByProvince.data.map((event) => (
                        <EventHomeItem event={event} />
                      ))}
                </div>
                <ViewMoreButton
                  onClick={() => {
                    dispatch(setStatus(EventStatus.AVAILABLE));
                    dispatch(
                      setProvince(
                        location
                          ? location.region === province.SG ||
                            location.region === province.HN
                            ? provinceMapping.get(location.region)
                            : "others"
                          : ""
                      )
                    );
                    navigate("/events");
                  }}
                />
              </div>
            )}
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

export default Home;
