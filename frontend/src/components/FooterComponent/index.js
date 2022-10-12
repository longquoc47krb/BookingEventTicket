import { Affix } from "antd";
import React from "react";
import { useMedia } from "react-use";
import Footer from "../common/footer";
import FooterMobile from "../footer-mobile";

function FooterComponent() {
  const isMobile = useMedia("(max-width: 767px)");
  return (
    <>
      {isMobile ? (
        <Affix offsetBottom={0}>
          <FooterMobile />
        </Affix>
      ) : (
        <Footer />
      )}
    </>
  );
}

export default FooterComponent;
