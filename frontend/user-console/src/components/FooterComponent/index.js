import { Affix } from "antd";
import React from "react";
import { useMedia } from "react-use";
import Footer from "../common/footer";
import FooterMobile from "../footer-mobile";

function FooterComponent(props) {
  const { toggleDrawer, setToggleDrawer } = props;
  const isMobile = useMedia("(max-width: 767px)");
  return (
    <>
      {isMobile ? (
        <Affix offsetBottom={0}>
          <FooterMobile
            toggleDrawer={toggleDrawer}
            setToggleDrawer={setToggleDrawer}
          />
        </Affix>
      ) : (
        <Footer />
      )}
    </>
  );
}

export default FooterComponent;
