/* eslint-disable react-hooks/exhaustive-deps */
import { Affix } from "antd";
import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { useFetchEvents } from "../../api/services/eventServices";
import Carousel from "../../components/common/carousel";
import EventHomeItem from "../../components/common/event-home-item";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import HelmetHeader from "../../components/helmet";

function Home() {
  const { data: events, isFetching, status } = useFetchEvents();
  console.log({ events, status });
  return (
    <>
      <HelmetHeader title="Trang chủ" content="Home page" />
      <Header />
      <div className="home-container">
        <SiderBar className="sider" />

        <div className="home-content">
          {isFetching && status === "loading" ? (
            <div className="w-full h-[60%] mt-4 flex justify-center items-center">
              <Spinner className="w-[50px] h-[50px]" />
            </div>
          ) : (
            <Carousel data={events?.data} name="testing" />
          )}
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 w-[80%]" />
          <div className="home-popular">
            <h1 className="text-center home-popular-text typo">
              Sự kiện nổi bật
            </h1>
            <div className="home-popular-content">
              {events?.data.map((event, index) => (
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

export default Home;
