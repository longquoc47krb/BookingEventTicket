import React from "react";
import Carousel from "../../components/common/carousel";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import { Helmet } from "react-helmet";
import { userInfoSelector } from "../../redux/slices/googleSlice";
import Footer from "../../components/common/footer";
import Typography from "../../components/common/typography";
import Event from "../../components/event";
import PropTypes from "prop-types";
function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Home page" />
      </Helmet>
      <Header />
      <div className="home-container">
        <SiderBar className="sider" />
        <div className="home-content">
          <Carousel />
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
