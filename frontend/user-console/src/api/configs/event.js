export const EventAPI = {
  getAllEvents: {
    url: "/event/findAll",
    method: "GET",
  },
  getAllEventsWithPagination: (currentPage) => ({
    url: "/event/eventPage",
    method: "GET",
    params: {
      currentPage,
      pageSize: 6,
    },
  }),
  checkEventStatus: {
    url: "/event/checkEventStatus",
    method: "GET",
  },
  getBestSellerEvents: {
    url: "/event/findBestSellerEvent",
    method: "GET",
  },
  getFeaturedEvents: {
    url: "/event/findEventAfterToday",
    method: "GET",
  },
  getEventByName: (name) => ({
    url: `/event/findName`,
    method: "GET",
    params: {
      name,
    },
  }),
  getEventByFilter: ({ province, categoryId, status, date }) => ({
    url: `/event/filter`,
    method: "GET",
    params: {
      province,
      categoryId,
      status,
      date,
    },
  }),
  findEventsByProvince: (province) => ({
    url: "/event/findEventsByProvince",
    method: "GET",
    params: {
      province,
    },
  }),
  getEventById: (id) => ({
    url: `/event/find/${id}`,
    method: "GET",
  }),
  createEvent: (data) => ({
    url: "/event/createEvent",
    method: "POST",
    data,
  }),
  findOrganizerByEventId: (eventId) => ({
    url: `/event/${eventId}`,
    method: "GET",
  }),
};
