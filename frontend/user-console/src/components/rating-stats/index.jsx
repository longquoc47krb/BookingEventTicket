import { Rating } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const RatingStats = ({ ratingCounts }) => {
  const totalRatings = ratingCounts.reduce((total, count) => total + count, 0);
  const { t } = useTranslation();
  const percentageRatings = ratingCounts.map((count) =>
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
      <div className="w-1/12 text-gray-500 text-right">{percentage || 0}%</div>
    </div>
  ));
  let totalCount = 0;
  let sum = 0;

  for (let i = 0; i < ratingCounts.length; i++) {
    totalCount += ratingCounts[i];
    sum += ratingCounts[i] * (i + 1);
  }

  const averageRating = (sum / totalCount).toFixed(1).toString() || 0;
  return (
    <div className="rating-stats">
      <div className="font-bold text-2xl mb-2">{t("rating-review")}</div>
      <div className="flex gap-x-16">
        <div>
          <p className="text-6xl font-bold mt-4">{averageRating}</p>
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

export default RatingStats;
