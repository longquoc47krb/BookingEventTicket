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
  editReview: (userId, data) => ({
    url: `/customer/review/${userId}`,
    method: "PUT",
    data,
  }),
  deleteReview: (userId, eventId) => ({
    url: `/customer/review/${userId}`,
    params: { eventId },
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
