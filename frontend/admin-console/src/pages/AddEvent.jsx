/* eslint-disable quotes */
import { t } from "i18next";
import React from "react";
import { Header } from "../components";
import UploadImage from "../components/Upload";

function AddEvent(props) {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("event.create")} title={t("sider.event")} />
      <div>
        <span className="text-primary text-xl font-semibold">
          {t("event.background")}
        </span>
        <UploadImage />
      </div>
    </div>
  );
}

export default AddEvent;
