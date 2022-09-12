import React from "react";
import Carousel from "../../components/common/carousel";
import UncontrolledExample from "../../components/common/carousel/demo";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
function Home() {
  return (
    <>
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
