import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/header";
import FooterComponent from "../../components/FooterComponent";
import HelmetHeader from "../../components/helmet";
import HomeDrawer from "../../components/home-drawer";

function CommingSoon() {
  const { t } = useTranslation();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <>
      <HelmetHeader title={t("pages.comming-soon")} content="Event Dashboard" />
      <Header />
      <div className="w-full min-h-screen"></div>
      <HomeDrawer
        toggleDrawer={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      />
      <FooterComponent
        toggleDrawer={toggleDrawer}
        setToggleDrawer={setToggleDrawer}
      />
    </>
  );
}

export default CommingSoon;
