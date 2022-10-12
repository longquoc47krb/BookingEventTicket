import React from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
function ViewMoreButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <Divider>
      <button
        className="buy-now px-4 py-2 rounded-3xl text-xl mx-3 my-3"
        onClick={onClick}
      >
        {t("event.view-more")}
      </button>
    </Divider>
  );
}

export default ViewMoreButton;
