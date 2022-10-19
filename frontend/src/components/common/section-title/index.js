import { Divider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../shared/theme";

function SectionTitle({ children, className }) {
  const { t } = useTranslation();
  return (
    <Divider style={{ color: "black", border: "gray" }}>
      <h1
        className={`flex justify-center text-[${theme.main}] font-bold event-container-title`}
      >
        {children}
      </h1>
    </Divider>
  );
}

export default SectionTitle;
