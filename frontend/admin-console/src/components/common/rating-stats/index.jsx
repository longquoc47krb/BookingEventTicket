import { Rating } from "@mui/material";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsInfoCircleFill } from "react-icons/bs";
import { isNotEmpty } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { setStarOfThisEvent } from "../../../redux/slices/eventSlice";
const RatingStats = ({ reviewList }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Show tooltip after 2 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    // Close tooltip after 7 seconds (2 seconds visibility + 5 seconds delay)
    const closeTimer = setTimeout(() => {
      setVisible(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);
  const ratingArray = isNotEmpty(reviewList)
    ? [
        reviewList.data.reduce(
          (acc, obj) => (obj.rate === 1 ? acc + 1 : acc),
          0
        ),
        reviewList.data.reduce(
          (acc, obj) => (obj.rate === 2 ? acc + 1 : acc),
          0
        ),
        reviewList.data.reduce(
          (acc, obj) => (obj.rate === 3 ? acc + 1 : acc),
          0
        ),
        reviewList.data.reduce(
          (acc, obj) => (obj.rate === 4 ? acc + 1 : acc),
          0
        ),
        reviewList.data.reduce(
          (acc, obj) => (obj.rate === 5 ? acc + 1 : acc),
          0
        ),
      ]
    : [];

  const totalRatings = ratingArray.reduce((total, count) => total + count, 0);
  const { t } = useTranslation();
  const percentageRatings = ratingArray.map((count) =>
    Math.round((count / totalRatings) * 100)
  );
  const stars = {
    1: "★",
    2: "★★",
    3: "★★★",
    4: "★★★★",
    5: "★★★★★",
  };
  const ratingBars = percentageRatings.map((percentage, index) => (
    <div className="grid items-center mb-2 rating-bar-container" key={index}>
      <div>{stars[index + 1]}</div>
      <div className="w-[96%]">
        <div className="rating-bar">
          <div
            className="rating-bar-inner"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="w-1/2 text-gray-500 text-right inline-block">
        <span>{percentage || 0}%</span>
      </div>
    </div>
  ));
  let totalCount = 0;
  let sum = 0;

  for (let i = 0; i < ratingArray.length; i++) {
    totalCount += ratingArray[i];
    sum += ratingArray[i] * (i + 1);
  }

  const averageRating = totalCount !== 0 ? (sum / totalCount).toFixed(1) : 0;
  useEffect(() => {
    dispatch(setStarOfThisEvent(averageRating));
  }, [averageRating]);

  return (
    <div className="rating-stats">
      <div className="flex items-center gap-x-4">
        <h1 className="font-bold text-2xl mb-2">{t("rating-review")}</h1>
      </div>
      <div className="flex sm:gap-x-16 gap-x-4">
        <div>
          <p className="text-6xl font-bold my-4">{averageRating}</p>
          <Rating
            name="size-small"
            value={averageRating}
            precision={0.5}
            readOnly
            size="small"
          />
          <p>
            {" "}
            {totalRatings} {t("ratings")}
          </p>
        </div>
        <div className="mt-4 w-full">{ratingBars}</div>
      </div>
    </div>
  );
};

export default React.memo(RatingStats);
