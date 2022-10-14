/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  useEventsByProvince,
  useFetchFeaturedEvents,
} from "../../api/services/eventServices";
import { useLocationName } from "../../api/services/generalServices";
import Carousel from "../../components/common/carousel";
import AppDrawer from "../../components/common/drawer";
import EventHomeItem from "../../components/common/event-home-item";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import SiderBar from "../../components/common/sider";
import ViewMoreButton from "../../components/common/view-more-button";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import { useUserFetchDataContext } from "../../context/UserFetchDateContext";
import { setPathName } from "../../redux/slices/routeSlice";
function Home() {
  const { featuredEvents, eventsByProvince, loadingStatus, errorStatus } =
    useUserFetchDataContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 767px)");
  dispatch(setPathName(window.location.pathname));
  if (loadingStatus) {
    return <Loading />;
  } else if (errorStatus) {
    navigate("/not-found");
    return null;
  } else {
    return (
      <>
        <HelmetHeader title={t("pages.home")} content="Home page" />
        <HeaderComponent />

        <div className="home-container">
          <AppDrawer />
          <div className="h-auto">
            <SiderBar className="sider" />
          </div>
          <div className="home-content">
            {isMobile ? (
              <Carousel data={featuredEvents} />
            ) : (
              <Carousel data={featuredEvents} loop={false} />
            )}
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
            <div className="home-popular">
              <SectionTitle>{t("event.trending")}</SectionTitle>
              <div className="home-popular-content">
                {featuredEvents
                  .slice(0, 16)
                  .filter((e) => e.remainingTicket !== 0)
                  .map((event) => (
                    <EventHomeItem event={event} />
                  ))}
              </div>
              <ViewMoreButton />
            </div>
            <div className="home-event-near-you">
              <SectionTitle>{t("event.near-you")}</SectionTitle>
              <div className="home-event-near-you-content">
                {eventsByProvince.map((event) => (
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
}

export default Home;
