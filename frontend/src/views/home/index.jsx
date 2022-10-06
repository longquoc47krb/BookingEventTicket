/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "reactstrap";
import { useFetchEvents } from "../../api/services/eventServices";
import Carousel from "../../components/common/carousel";
import EventHomeItem from "../../components/common/event-home-item";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import SiderBar from "../../components/common/sider";
import HelmetHeader from "../../components/helmet";
import { setPathName } from "../../redux/slices/locationSlice";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { orderByDate } from "../../utils/utils";
import { Affix } from "antd";
function Home() {
  const { data: events, isFetching, status } = useFetchEvents();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [container, setContainer] = useState(null);
  dispatch(setPathName(window.location.pathname));
  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    navigate("/not-found");
    return null;
  } else {
    console.log({ container });
    return (
      <>
        <HelmetHeader title="Trang chủ" content="Home page" />
        <Header />
        <div className="home-container" ref={setContainer}>
          <SiderBar className="sider" />

          <div className="home-content">
            {isFetching && status === "loading" ? (
              <div className="w-full h-[60%] mt-4 flex justify-center items-center">
                <Spinner className="w-[50px] h-[50px]" />
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
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
