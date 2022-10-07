/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import React, { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../../api/services/eventServices";
import { useLocationName } from "../../api/services/otherSevices";
import Carousel from "../../components/common/carousel";
import EventHomeItem from "../../components/common/event-home-item";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import SiderBar from "../../components/common/sider";
import EmptyData from "../../components/empty";
import HelmetHeader from "../../components/helmet";
import Loading from "../../components/loading";
import { setPathName } from "../../redux/slices/routeSlice";
import constants from "../../utils/constants";
import { orderByDate } from "../../utils/utils";
const { provinceMapping } = constants;
function Home() {
  const { data: events, isFetching, status } = useFetchEvents(1000);
  const { data: location, status: locationStatus } = useLocationName();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const container = useRef();
  dispatch(setPathName(window.location.pathname));
  if (status === "loading" && locationStatus === "loading") {
    return <Loading />;
  } else if (status === "error" && locationStatus === "error") {
    navigate("/not-found");
    return null;
  } else {
    console.log(
      orderByDate(events.data, "startingDate").filter(
        (event) =>
          event.province ===
          provinceMapping.get(location ? location.region : "")
      )
    );
    return (
      <>
        <HelmetHeader title="Trang chủ" content="Home page" />
        <Header />
        <div className="home-container" ref={container}>
          <Affix offsetTop={0} target={() => container.current}>
            <SiderBar className="sider" />
          </Affix>
          <div className="home-content">
            {isFetching && status === "loading" ? (
              <div className="w-full h-[60%] mt-4 flex justify-center items-center">
                <Skeleton width={1000} height={400} />
              </div>
            ) : (
              <Carousel data={events?.data} />
            )}
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
            <div className="home-popular">
              <SectionTitle>Sự kiện nổi bật</SectionTitle>
              <div className="home-popular-content">
                {orderByDate(events.data, "startingDate").map((event) => (
                  <EventHomeItem event={event} />
                ))}
              </div>
            </div>
            <div className="home-event-near-you">
              <SectionTitle>
                Ở{" "}
                {provinceMapping.get(location ? location.region : "") ||
                  location.city}{" "}
                có gì ta?
              </SectionTitle>
              <div className="home-event-near-you-content">
                {orderByDate(events.data, "startingDate").filter(
                  (event) =>
                    event.province ===
                    provinceMapping.get(location ? location.region : "")
                ).length !== 0 ? (
                  orderByDate(events.data, "startingDate")
                    .filter(
                      (event) =>
                        event.province ===
                        provinceMapping.get(location ? location.region : "")
                    )
                    .map((event) => <EventHomeItem event={event} />)
                ) : (
                  <EmptyData />
                )}
                {}
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
