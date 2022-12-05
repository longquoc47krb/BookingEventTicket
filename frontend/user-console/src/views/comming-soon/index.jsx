import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/header";
import FooterComponent from "../../components/FooterComponent";
import HelmetHeader from "../../components/helmet";
import HomeDrawer from "../../components/home-drawer";
import ComingSoonImage from "../../assets/Dreaming.svg";
function CommingSoon() {
  const { t } = useTranslation();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <>
      <HelmetHeader title={t("pages.comming-soon")} content="Event Dashboard" />
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center my-4">
        <h1 className="font-bold text-5xl text-[#1f3e82] my-4">
          {t("coming-soon")}
        </h1>
        <img src={ComingSoonImage} className="w-[40vw]" alt="commingsoon" />
      </div>
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
