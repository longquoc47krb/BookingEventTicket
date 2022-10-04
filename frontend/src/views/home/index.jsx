/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Spinner } from "reactstrap";
import { useFetchEvents } from "../../api/services/eventServices";
import Carousel from "../../components/common/carousel";
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
