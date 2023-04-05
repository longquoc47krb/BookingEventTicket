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
import { useEffect, useState } from "react";
import {
  setIsFeedback,
  isFeedbackSelector,
  updateRating,
  ratingSelector,
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
const { checkExistReview, deleteReview, submitReview, editReview } =
  reviewServices;
function Review() {
  const token = useSelector(tokenSelector);
  const isFeedback = useSelector(isFeedbackSelector);
  const ratingInfo = useSelector(ratingSelector);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);
  const { eventId } = useParams();
  const [state, updateState] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      currentPage: 0,
      reviews: [],
      feedbackInfo: [],
      allReviews: [],
      reviewsWithoutYours: [],
    }
  );
  const {
    data: reviewsPaging,
    status,
    isLoading,
  } = useFetchReviewListPagin({
    id: eventId,
    pageNumber: state.currentPage,
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
      updateState({
        reviews: reviewsPaging.data,
        allReviews: allReviews.data,
      });
    } else {
      updateState({
        reviews: [],
        allReviews: [],
      });
    }
  }, [status, allReviewsStatus]);
  useEffect(() => {
    const checkExistFeedback = async () => {
      const response = await checkExistReview(user.id, eventId);
      const isFeedBackTemp = response.status === 400 ? true : false;
      dispatch(setIsFeedback(isFeedBackTemp));
    };
    checkExistFeedback();
  }, [reviewsPaging, status]);

  // count stars

  const reviewsWithoutYours =
    user && isLoading === false && reviewsPaging?.data.length > 0
      ? reviewsPaging?.data.filter((e) => e.email !== user.email)
      : [];
  const feedbackInfo =
    user && isLoading === false && reviewsPaging?.data.length > 0
      ? reviewsPaging?.data.filter((e) => e.email === user.email)
      : [];
  useEffect(() => {
    if (isEdit) {
      dispatch(
        updateRating({
          star: state.feedbackInfo[0]?.rate,
          message: hideBadWords(state.feedbackInfo[0]?.message || ""),
        })
      );
    }
  }, [isEdit, state]);
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
  return (
    <div className="w-full h-full review-container mr-6">
      <RatingStats reviewList={allReviews} />
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
                  message={ratingInfo.message}
                  star={ratingInfo.star}
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
                star={ratingInfo.star}
                message={ratingInfo.message}
                onCancel={setIsEdit}
                onSubmit={handleSubmit}
                user={user}
              />
            </>
          )
        ) : (
          <Unauthenticated />
        )}
        {!isLoading ? (
          state.reviews && (
            <FeedbackList
              feedbacks={reviewsWithoutYours || state.reviews}
              isFeedbackByCurrentUser={isFeedback}
            />
          )
        ) : (
          <p>Loading</p>
        )}
        {!isFeedback && state.reviews.length > 0 && (
          <Pagination
            className="my-4"
            current={state.currentPage + 1}
            onChange={(page) => {
              updateState({
                currentPage: page - 1,
              });
            }}
            total={state.allReviews.length}
            pageSize={10}
            defaultCurrent={1}
          />
        )}
      </div>
    </div>
  );
}

export default Review;
