import React from "react";
import Empty from "../../assets/Empty.svg";
import { useTranslation } from "react-i18next";
function EmptyData({ text }) {
  const { t } = useTranslation();
  return (
    <div className="w-auto flex justify-center items-center flex-col mb-5">
      <img
        src={Empty}
        className="w-[20rem] h-[20rem]"
        alt="empty"
        href="https://storyset.com/web"
      />
      <span className="text-3xl font-semibold mb-2">
        {t("event.not-found")}
      </span>
      <span className="text-lg text-center">
        {t("event.not-found-description")}
      </span>
    </div>
  );
}
export default EmptyData;
