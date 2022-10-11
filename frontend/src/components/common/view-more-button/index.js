import React from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
function ViewMoreButton() {
  const { t } = useTranslation();
  return (
    <Divider>
      <button className="buy-now px-4 py-3 rounded-3xl text-xl">
        {t("event.view-more")}
      </button>
    </Divider>
  );
}

export default ViewMoreButton;
