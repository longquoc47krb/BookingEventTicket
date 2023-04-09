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
  getTicketStatisticsForDate: (
    organinzationEmail,
    period,
    startDate,
    endDate
  ) => ({
    url: `/organization/${organinzationEmail}/ticket-statistics`,
    method: "GET",
    params: {
      period,
      startDate,
      endDate,
    },
  }),
  getDailyTicketStatistics: (organinzationEmail) => ({
    url: `/organization/${organinzationEmail}/ticket-statistics/last-seven-days`,
    method: "GET",
  }),
  getLastFourWeeksTicketStatistics: (organinzationEmail) => ({
    url: `/organization/${organinzationEmail}/ticket-statistics/last-four-weeks`,
    method: "GET",
  }),
  getMonthlyTicketStatistics: (organinzationEmail) => ({
    url: `/organization/${organinzationEmail}/ticket-statistics/monthly`,
    method: "GET",
  }),
};
