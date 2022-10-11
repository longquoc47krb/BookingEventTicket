/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFetchEvents,
  useFetchHighlightEvents,
} from "../../api/services/eventServices";
import { useLocationName } from "../../api/services/otherSevices";
import Carousel from "../../components/common/carousel";
import EventHomeItem from "../../components/common/event-home-item";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import SiderBar from "../../components/common/sider";
import ViewMoreButton from "../../components/common/view-more-button";
import EmptyData from "../../components/empty";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import { setPathName } from "../../redux/slices/routeSlice";
import constants from "../../utils/constants";
const { provinceMapping } = constants;
function Home() {
  const { data: events, isFetching, status } = useFetchEvents();
  const {
    data: highlightEvents,
    isFetching: highlightFetching,
    status: highlightStatus,
  } = useFetchHighlightEvents();
  const { data: location, status: locationStatus } = useLocationName();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(setPathName(window.location.pathname));
  if (
    status === "loading" ||
    highlightStatus === "loading" ||
    locationStatus === "loading"
  ) {
    return <Loading />;
  } else if (
    status === "error" ||
    highlightStatus === "error" ||
    locationStatus === "error"
  ) {
    navigate("/not-found");
    return null;
  } else {
    console.log({ events, highlightEvents });
    return (
      <>
        <HelmetHeader title={t("pages.home")} content="Home page" />
        <Header />
        <div className="home-container">
          <div className="h-auto">
            <SiderBar className="sider" />
          </div>
          <div className="home-content">
            <Carousel data={highlightEvents?.data} />
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
            <div className="home-popular">
              <SectionTitle>{t("event.trending")}</SectionTitle>
              <div className="home-popular-content">
                {highlightEvents.data.map((event) => (
                  <EventHomeItem event={event} />
                ))}
              </div>
              <ViewMoreButton />
            </div>
            <div className="home-event-near-you">
              <SectionTitle>{t("event.near-you")}</SectionTitle>
              <div className="home-event-near-you-content">
                {highlightEvents.data.filter(
                  (event) =>
                    event.province ===
                    provinceMapping.get(location ? location?.region : "")
                ).length !== 0 ? (
                  highlightEvents.data
                    .filter(
                      (event) =>
                        event.province ===
                        provinceMapping.get(location ? location?.region : "")
                    )
                    .map((event) => <EventHomeItem event={event} />)
                ) : (
                  <EmptyData />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
