export const OrderAPI = {
  findOrderByEventId: (eventId, userId) => ({
    url: "/organization/manage/customerOrder",
    method: "GET",
    params: {
      eventId,
      userId,
    },
  }),
};
