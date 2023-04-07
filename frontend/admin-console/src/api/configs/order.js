export const OrderAPI = {
  findOrderByEventId: (eventId, userId) => ({
    url: "/organization/manage/customerOrder",
    method: "GET",
    params: {
      eventId,
      userId,
    },
  }),
  findOrderWithUniqueAccount: (eventId, userId) => ({
    url: `/organization/manage/customerList/${userId}`,
    method: "GET",
    params: {
      eventId,
    },
  }),
  getTicketStatisticsForDate: (organinzationEmail, period) => ({
    url: `/organization/${organinzationEmail}/ticket-statistics`,
    method: "GET",
    params: {
      period,
    },
  }),
};
