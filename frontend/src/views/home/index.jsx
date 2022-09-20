import React from "react";
import Carousel from "../../components/common/carousel";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SiderBar from "../../components/common/sider";
import Typography from "../../components/common/typography";
import HelmetHeader from "../../components/helmet";
function Home() {
  return (
    <>
      <HelmetHeader title="Trang chủ" content="Home page" />
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
