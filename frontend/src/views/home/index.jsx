import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../components/common/carousel";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import Typography from "../../components/common/typography";
import HelmetHeader from "../../components/helmet";
import { Skeleton } from "antd";
import { getEvents } from "../../redux/slices/eventSlice";
function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);

  console.log({ events });
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
            <Typography className="text-center">Sự kiện nổi bật</Typography>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
