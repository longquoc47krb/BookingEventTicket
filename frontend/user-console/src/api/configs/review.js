export const ReviewAPI = {
  getReviewList: (eventId) => ({
    url: `/review`,
    params: {
      eventId,
    },
    method: "GET",
  }),
  submitReview: (userId, data) => ({
    url: `/customer/review/${userId}`,
    method: "POST",
    data,
  }),
  deleteReview: (userId) => ({
    url: `/customer/review/${userId}`,
    method: "DELETE",
  }),
  checkExistReview: (userId, eventId) => ({
    url: `/customer/review/checkReview/${userId}`,
    params: {
      eventId,
    },
    method: "GET",
  }),
};
