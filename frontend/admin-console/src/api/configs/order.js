export const OrderAPI = {
  findOrderByEventId: (eventId, userId) => ({
    url: "/organization/order",
    method: "GET",
    params: {
      eventId,
      userId,
    },
  }),
};
