import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hideBadWords } from "../../../utils/badwords";
import FeedbackComment from "../feedback-item";
import { displayFeedbackTime } from "../../../utils/utils";

function FeedbackList({ feedbacks }) {
  console.log({ feedbacks });
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  // if filter change, set current page equal 0 ( page 1)
  useEffect(() => {
    setCurrentPage(0);
  }, []);
  const firstIndex = currentPage * 6;
  const lastIndex = (currentPage + 1) * 6;
  return (
    <div className="feedback-list-container">
      {feedbacks.data.length > 0 ? (
        feedbacks.data.map((item, index) => (
          <FeedbackComment
            avatar={item.avatar}
            name={item.name}
            message={hideBadWords(item.message)}
            rate={item.rate}
            time={displayFeedbackTime(item.createdAt)}
          />
        ))
      ) : (
        <p className="text-center font-semibold text-xl m-4">
          {t("empty-feedbacks")}
        </p>
      )}
      <div className="flex justify-between">
        {!feedbacks ? null : feedbacks.length > 0 ? (
          <div className="my-4">
            <Pagination
              current={currentPage + 1}
              onChange={onChange}
              total={feedbacks.length}
              pageSize={10}
              defaultCurrent={1}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FeedbackList;
