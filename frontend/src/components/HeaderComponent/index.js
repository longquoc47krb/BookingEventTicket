import { Affix } from "antd";
import React from "react";
import { useMedia } from "react-use";
import Header from "../common/header";

function HeaderComponent() {
  const isMobile = useMedia("(max-width: 767px)");
  return (
    <>
      {isMobile ? (
        <Affix offsetTop={0}>
          <Header />
        </Affix>
      ) : (
        <Header />
      )}
    </>
  );
}

export default HeaderComponent;
