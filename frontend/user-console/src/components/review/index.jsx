import React from "react";
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
import { useEffect } from "react";
import {
  setIsFeedback,
  isFeedbackSelector,
} from "../../redux/slices/generalSlice";
import FeedbackComment from "../feedback-item";
import { useTranslation } from "react-i18next";
const { checkExistReview } = reviewServices;
function Review() {
  const token = useSelector(tokenSelector);
  const isFeedback = useSelector(isFeedbackSelector);
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { data: allReviews, status } = useFetchReviewList(eventId);
  const { t } = useTranslation();
  const reviews =
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
  console.log({ feedbackInfo, reviewsWithoutYours, reviews });
  return (
    <div className="w-full h-full bg-white mr-2">
      <RatingStats ratingCounts={ratings} />
      <div className="mx-4">
        {token ? (
          isFeedback && feedbackInfo ? (
            <div>
              <p className="text-[#1f3e82] font-bold text-2xl py-2">
                {t("your-feedback")}
              </p>
              <FeedbackComment
                avatar={user.avatar}
                name={user.name}
                message={feedbackInfo[0]?.message}
                rate={feedbackInfo[0]?.rate}
                isCurrentUser={isFeedback}
              />
              <hr className="mb-4" />
            </div>
          ) : (
            <Feedback />
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
