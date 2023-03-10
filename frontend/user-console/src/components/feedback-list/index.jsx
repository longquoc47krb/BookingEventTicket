import React from "react";
import { useTranslation } from "react-i18next";
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
            message={item.message}
            rate={item.rate}
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
