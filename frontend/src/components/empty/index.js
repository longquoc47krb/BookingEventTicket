import React from "react";
import Empty from "../../assets/Empty.svg";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
function EmptyData({ text }) {
  const { t } = useTranslation();
  return (
    <div className="w-[50vw] flex justify-center items-center flex-col">
      <img src={Empty} className="w-[20rem] h-[20rem]" alt="empty" />
      <span className="text-2xl font-semibold mb-5">{t(text)}</span>
    </div>
  );
}
EmptyData.propTypes = {
  text: PropTypes.string,
};
EmptyData.defaultProps = {
  text: "event.not-found",
};
export default EmptyData;
