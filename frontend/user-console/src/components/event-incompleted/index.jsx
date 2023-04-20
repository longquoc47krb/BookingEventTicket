import React from "react";
import { useTranslation } from "react-i18next";

function EventIncompleted() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full review-container mr-6 p-6">
      <p className="text-2xl font-bold text-center">
        {t("popup.review.event-incompleted")}
      </p>
    </div>
  );
}

export default EventIncompleted;
