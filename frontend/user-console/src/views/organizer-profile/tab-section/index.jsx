import React from "react";
import { useTranslation } from "react-i18next";

const TabSection = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tab">
        <button
          className={
            activeTab === "all-events" ? "tablinks active" : "tablinks"
          }
          onClick={() => openTab("all-events")}
        >
          {t("org.all-events")}
        </button>
      </div>
      <div className="tab">
        <button
          className={
            activeTab === "featured-events" ? "tablinks active" : "tablinks"
          }
          onClick={() => openTab("featured-events")}
        >
          {t("org.featured-events")}
        </button>
      </div>
      <div className="tab">
        <button
          className={
            activeTab === "completed-events" ? "tablinks active" : "tablinks"
          }
          onClick={() => openTab("completed-events")}
        >
          {t("org.completed-events")}
        </button>
      </div>
    </div>
  );
};

export default TabSection;
