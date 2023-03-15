/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  tokenSelector,
  userInfoSelector,
} from "../../redux/slices/accountSlice";
import Feedback from "../feedback-box";
import FeedbackList from "../feedback-list";
import RatingStats from "../rating-stats";
import Unauthenticated from "../unauthenticated";
import reviewServices, {
  useFetchReviewList,
} from "../../api/services/reviewServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setIsFeedback,
  isFeedbackSelector,
} from "../../redux/slices/generalSlice";
import FeedbackComment from "../feedback-item";
import { useTranslation } from "react-i18next";
import {
  AlertError,
  AlertErrorPopup,
  AlertPopup,
  AlertQuestion,
} from "../common/alert";
import { hideBadWords } from "../../utils/badwords";
const { checkExistReview, deleteReview, submitReview, editReview } =
  reviewServices;
function Review() {
  const token = useSelector(tokenSelector);
  const isFeedback = useSelector(isFeedbackSelector);
  const [star, setStar] = useState(5);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { data: allReviews, status } = useFetchReviewList(eventId);
  const { t } = useTranslation();

  var reviews =
    status === "success" && allReviews?.status !== 404 ? allReviews.data : [];
  useEffect(() => {
    const checkExistFeedback = async () => {
      const response = await checkExistReview(user.id, eventId);
      const isFeedBackTemp = response.status === 400 ? true : false;
      dispatch(setIsFeedback(isFeedBackTemp));
    };
    checkExistFeedback();
  }, [allReviews]);

  // count stars
  const oneStar = reviews.reduce(
    (acc, obj) => (obj.rate === 1 ? acc + 1 : acc),
    0
  );
  const twoStar = reviews.reduce(
    (acc, obj) => (obj.rate === 2 ? acc + 1 : acc),
    0
  );
  const threeStar = reviews.reduce(
    (acc, obj) => (obj.rate === 3 ? acc + 1 : acc),
    0
  );
  const fourStar = reviews.reduce(
    (acc, obj) => (obj.rate === 4 ? acc + 1 : acc),
    0
  );
  const fiveStar = reviews.reduce(
    (acc, obj) => (obj.rate === 5 ? acc + 1 : acc),
    0
  );
  const ratings = [oneStar, twoStar, threeStar, fourStar, fiveStar] || [
    0, 0, 0, 0, 0,
  ];
  const feedbackInfo = user && reviews.filter((e) => e.email === user.email);
  console.log({ feedbackInfo });
  const reviewsWithoutYours =
    user && reviews.filter((e) => e.email !== user.email);
  useEffect(() => {
    if (isEdit) {
      setStar(feedbackInfo[0]?.rate);
      setMessage(hideBadWords(feedbackInfo[0]?.message || ""));
    }
  }, [isEdit]);
  // delete review
  const handleDelete = () => {
    AlertQuestion({
      title: t("popup.review.delete"),
      callback: async (result) => {
        if (result.isConfirmed) {
          const response = await deleteReview(user.id, eventId);
          if (response.status === 200) {
            AlertPopup({
              title: t("popup.review.delete-success"),
              timer: 3000,
            });
          } else {
            AlertErrorPopup({
              title: t("popup.review.delete-failed"),
              timer: 3000,
            });
          }
        }
      },
    });
  };
  // submit feedback
  const handleSubmit = async () => {
    const response = await submitReview(user.id, {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      idEvent: eventId,
      message,
      rate: star,
    });
    if (response.status === 200) {
      AlertPopup({
        title: t("popup.review.submit-success"),
      });
    } else {
      AlertError({ title: t("popup.review.submit-failed") });
    }
    setMessage("");
    setStar(5);
  };

  // edit feedback
  const handleUpdate = async () => {
    const response = await editReview(user.id, {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      idEvent: eventId,
      message,
      rate: star,
    });

    if (response.status === 200) {
      AlertPopup({
        title: t("popup.review.update-success"),
      });
    } else {
      AlertError({ title: t("popup.review.update-failed") });
    }
    setMessage("");
    setStar(5);
    setIsEdit(false);
  };
  return (
    <div className="w-full h-full review-container mr-6">
      <RatingStats ratingCounts={ratings} />
      <div className="mx-4">
        {token ? (
          isFeedback && feedbackInfo ? (
            <div>
              <p className="text-[#1f3e82] font-bold text-2xl py-2">
                {t("your-feedback")}
              </p>
              {!isEdit ? (
                <>
                  <FeedbackComment
                    avatar={user.avatar}
                    name={user.name}
                    message={hideBadWords(feedbackInfo[0]?.message || "")}
                    rate={feedbackInfo[0]?.rate}
                    isCurrentUser={isFeedback}
                    setIsEditing={setIsEdit}
                    onDelete={handleDelete}
                    time={moment(feedbackInfo[0]?.createdAt).fromNow()}
                  />
                  <hr className="mb-4" />
                </>
              ) : (
                <Feedback
                  message={message}
                  star={star}
                  setStar={setStar}
                  setMessage={setMessage}
                  isEditting={isEdit}
                  onCancel={setIsEdit}
                  onUpdate={handleUpdate}
                  user={user}
                />
              )}
            </div>
          ) : (
            <>
              <p className="text-[#1f3e82] font-bold text-2xl py-2">
                {t("your-feedback")}
              </p>
              <Feedback
                isEditting={isEdit}
                star={star}
                setStar={setStar}
                message={message}
                setMessage={setMessage}
                onCancel={setIsEdit}
                onSubmit={handleSubmit}
                user={user}
              />
            </>
          )
        ) : (
          <Unauthenticated />
        )}
        {reviews && (
          <FeedbackList
            feedbacks={reviewsWithoutYours || reviews}
            isFeedbackByCurrentUser={isFeedback}
          />
        )}
      </div>
    </div>
  );
}

export default Review;
