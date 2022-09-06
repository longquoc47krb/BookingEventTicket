import React from "react";
import Carousel from "../../components/common/carousel";
import SiderBar from "../../components/common/sider";
function Home() {
  return (
    <div className="home-container">
      <SiderBar />
      <div className="home-content">
        <Carousel className="flex justify-center mt-5" />
      </div>
    </div>
  );
}

export default Home;
