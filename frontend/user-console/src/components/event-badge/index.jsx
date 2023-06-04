import React from "react";
import { useTranslation } from "react-i18next";
import { EventStatus } from "../../utils/constants";
import { countRemainingDays } from "../../utils/utils";

function EventBadge({ status, date }) {
  const { t } = useTranslation();
  const splitter = status.split(".");
  const handleEventStatus = (status) => {
    switch (status) {
      case EventStatus.AVAILABLE:
        return t("event.remaining-days", {
          remainingDays: countRemainingDays(date),
        });
      case EventStatus.COMPLETED:
        return t("event.feedback-avalable");
      case EventStatus.SOLDOUT:
        return t("event.sold-out");
      default:
        return t("event.feedback-avalable");
    }
  };
  return (
    <div className="event-badge" id={splitter[1]}>
      {handleEventStatus(status)}
    </div>
  );
}

export default EventBadge;
