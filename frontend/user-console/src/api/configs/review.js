export const ReviewAPI = {
  getReviewList: (eventId) => ({
    url: `/review`,
    params: {
      eventId,
    },
    method: "GET",
  }),
  submitReview: (userId, data) => ({
    url: `/review/${userId}`,
    method: "POST",
    data,
  }),
  deleteReview: (userId) => ({
    url: `/review/${userId}`,
    method: "DELETE",
  }),
  checkExistReview: (userId, eventId) => ({
    url: `/review/checkReview/${userId}`,
    params: {
      eventId,
    },
    method: "GET",
  }),
};
