import React from "react";

import { useTranslation } from "react-i18next";
import { Header } from "../components";
import CollapseComponent from "../components/Collapse";
const Tickets = () => {
  const { t } = useTranslation();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.ticket")} />
      <CollapseComponent text="ronaldo">siuu</CollapseComponent>
    </div>
  );
};

export default Tickets;
