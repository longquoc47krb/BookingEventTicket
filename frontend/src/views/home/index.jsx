import React from "react";
import Carousel from "../../components/common/carousel";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import { Helmet } from "react-helmet";
function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Home page" />
      </Helmet>
      <Header />
      <div className="home-container">
        <SiderBar />
        <div className="home-content">
          <Carousel />
        </div>
      </div>
    </>
  );
}

export default Home;
