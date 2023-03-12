import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hideBadWords } from "../../utils/badwords";
import { displayFeedbackTime } from "../../utils/utils";
import FeedbackComment from "../feedback-item";
function FeedbackList({ feedbacks, isFeedbackByCurrentUser }) {
  const { t } = useTranslation();
  return (
    <div className="feedback-list-container">
      {feedbacks.length > 0 ? (
        feedbacks.map((item, index) => (
          <FeedbackComment
            avatar={item.avatar}
            name={item.name}
            message={hideBadWords(item.message)}
            rate={item.rate}
            time={displayFeedbackTime(item.createdAt)}
          />
        ))
      ) : isFeedbackByCurrentUser ? (
        ""
      ) : (
        <p className="text-center font-semibold text-xl m-4">
          {t("empty-feedbacks")}
        </p>
      )}
    </div>
  );
}

export default FeedbackList;
