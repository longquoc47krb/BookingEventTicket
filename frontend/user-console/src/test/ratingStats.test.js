import { render, screen } from "@testing-library/react";
import RatingStats from "../components/rating-stats";

describe("RatingStats", () => {
  const reviewList = {
    data: [
      { id: 1, rate: 3 },
      { id: 2, rate: 5 },
      { id: 3, rate: 2 },
      { id: 4, rate: 4 },
      { id: 5, rate: 5 },
    ],
  };

  it("should render the average rating and total ratings", () => {
    render(<RatingStats reviewList={reviewList} />);
    const averageRating = screen.getByText("3.8");
    const totalRatings = screen.getByText("5 ratings");
    expect(averageRating).toBeInTheDocument();
    expect(totalRatings).toBeInTheDocument();
  });

  it("should render the correct percentage for each rating value", () => {
    render(<RatingStats reviewList={reviewList} />);
    const oneStarPercentage = screen.getByText("20%");
    const twoStarPercentage = screen.getByText("20%");
    const threeStarPercentage = screen.getByText("20%");
    const fourStarPercentage = screen.getByText("20%");
    const fiveStarPercentage = screen.getByText("20%");
    expect(oneStarPercentage).toBeInTheDocument();
    expect(twoStarPercentage).toBeInTheDocument();
    expect(threeStarPercentage).toBeInTheDocument();
    expect(fourStarPercentage).toBeInTheDocument();
    expect(fiveStarPercentage).toBeInTheDocument();
  });
});
