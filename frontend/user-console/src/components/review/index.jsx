/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from "react";
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
  useFetchReviewListPagin,
} from "../../api/services/reviewServices";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  setIsFeedback,
  isFeedbackSelector,
  updateRating,
  ratingSelector,
  setIsCompleted,
} from "../../redux/slices/eventSlice";
import FeedbackComment from "../feedback-item";
import { useTranslation } from "react-i18next";
import {
  AlertError,
  AlertErrorPopup,
  AlertPopup,
  AlertQuestion,
} from "../common/alert";
import { hideBadWords } from "../../utils/badwords";
import { Pagination } from "antd";
import { isNotEmpty } from "../../utils/utils";
import { useMemo } from "react";
import { EventStatus } from "../../utils/constants";
const { checkExistReview, deleteReview, submitReview, editReview } =
  reviewServices;
function Review() {
  const token = useSelector(tokenSelector);
  const isFeedback = useSelector(isFeedbackSelector);
  const ratingInfo = useSelector(ratingSelector);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector(userInfoSelector);
  const [reviewList, setReviewList] = useState([]);
  const [fullReviews, setFullReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userFeedback, setUserFeedback] = useState([]);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const {
    data: reviewsPaging,
    status,
    isLoading,
  } = useFetchReviewListPagin({
    id: eventId,
    pageNumber: currentPage,
    pageSize: 10,
  });
  const { data: allReviews, status: allReviewsStatus } =
    useFetchReviewList(eventId);
  const { t } = useTranslation();
  useEffect(() => {
    if (
      status === "success" &&
      reviewsPaging?.status !== 404 &&
      allReviewsStatus === "success" &&
      allReviews?.status !== 404
    ) {
      setFullReviews(allReviews.data);
    } else {
      setFullReviews([]);
    }
  }, [status, allReviewsStatus]);
  useEffect(() => {
    if (token) {
      const checkExistFeedback = async () => {
        const response = await checkExistReview(user.id, eventId);
        const isFeedBackTemp = response.status === 400 ? true : false;
        dispatch(setIsFeedback(isFeedBackTemp));
      };
      checkExistFeedback();
    }
  }, [reviewsPaging, status]);

  // count stars
  useEffect(() => {
    if (user && isNotEmpty(reviewsPaging)) {
      const reviewListTemp =
        reviewsPaging.data.length > 0
          ? reviewsPaging?.data.filter((e) => e.email !== user.email)
          : [];
      const feedbackInfo =
        reviewsPaging.data.length > 0
          ? reviewsPaging?.data.filter((e) => e.email === user.email)
          : [];
      setReviewList(reviewListTemp);
      setUserFeedback(feedbackInfo);
    }
  }, [user, isLoading, reviewsPaging]);
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
      message: ratingInfo.message,
      rate: ratingInfo.star,
    });
    if (response.status === 200) {
      AlertPopup({
        title: t("popup.review.submit-success"),
      });
    } else {
      AlertError({ title: t("popup.review.submit-failed") });
    }
    dispatch(
      updateRating({
        star: 5,
        message: "",
      })
    );
  };

  // edit feedback
  const handleUpdate = async () => {
    const response = await editReview(user.id, {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      idEvent: eventId,
      message: ratingInfo.message,
      rate: ratingInfo.star,
    });

    if (response.status === 200) {
      AlertPopup({
        title: t("popup.review.update-success"),
      });
    } else {
      AlertError({ title: t("popup.review.update-failed") });
    }
    dispatch(
      updateRating({
        star: 5,
        message: "",
      })
    );
    setIsEdit(false);
  };
  console.log({
    token: !!token,
    isFeedback: !!isFeedback,
    userFeedback: !!userFeedback,
    isEdit: !!isEdit,
    allReviews,
    fullReviews,
    reviewList,
  });
  return (
    <div className="w-full h-full review-container mr-6">
      <RatingStats reviewList={allReviews} />
      <div className="mx-4">{!token && <Unauthenticated />}</div>
      <div className="mx-4">
        {token && isFeedback && userFeedback && !isEdit && (
          <>
            <p className="text-[#1f3e82] font-bold text-2xl py-2">
              {t("your-feedback")}
            </p>
            <FeedbackComment
              avatar={user.avatar}
              name={user.name}
              message={hideBadWords(userFeedback[0]?.message || "")}
              rate={userFeedback[0]?.rate}
              isCurrentUser={isFeedback}
              setIsEditing={setIsEdit}
              onDelete={handleDelete}
              time={moment(userFeedback[0]?.createdAt).fromNow()}
            />
            <hr className="mb-4" />
          </>
        )}
        {token && isFeedback && userFeedback && isEdit && (
          <Feedback
            message={ratingInfo.message}
            star={ratingInfo.rate}
            isEditting={isEdit}
            onCancel={setIsEdit}
            onUpdate={handleUpdate}
            user={user}
          />
        )}
        {token && !isFeedback && userFeedback && !isEdit && (
          <Feedback
            isEditting={isEdit}
            star={ratingInfo.star}
            message={ratingInfo.message}
            onCancel={setIsEdit}
            onSubmit={handleSubmit}
            user={user}
          />
        )}
      </div>
      <div className="mx-4">
        <FeedbackList
          feedbacks={token && !isLoading ? reviewList : fullReviews}
          isFeedbackByCurrentUser={isFeedback}
        />
      </div>
    </div>
  );
}

export default Review;
