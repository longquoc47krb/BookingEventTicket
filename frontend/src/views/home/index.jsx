/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllEvents } from "../../api/eventApi";
import Carousel from "../../components/common/carousel";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import Typography from "../../components/common/typography";
import HelmetHeader from "../../components/helmet";
import { useFetchEvents } from "../../hooks/useFetchEvents";
function Home() {
  const { data: events } = useFetchEvents();
  console.log({ events });
  return (
    <>
      <HelmetHeader title="Trang chủ" content="Home page" />
      <Header />
      <div className="home-container">
        <SiderBar className="sider" />
        <div className="home-content">
          <Carousel data={events?.data} />

          <div className="home-popular">
            <Typography className="text-center">Sự kiện nổi bật</Typography>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
