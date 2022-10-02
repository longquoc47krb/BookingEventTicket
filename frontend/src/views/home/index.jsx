/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../components/common/carousel";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import HelmetHeader from "../../components/helmet";
import { useFetchEvents } from "../../hooks/eventHooks";
import { eventsSelector, getEvents } from "../../redux/slices/eventSlice";
function Home() {
  const { data: eventQuery } = useFetchEvents();
  console.log({ eventQuery });
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  return (
    <>
      <HelmetHeader title="Trang chủ" content="Home page" />
      <Header />
      <div className="home-container">
        <SiderBar className="sider" />
        <div className="home-content">
          <Carousel data={events} />

          <div className="home-popular">
            <h1 className="text-center home-popular-text typo">
              Sự kiện nổi bật
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
