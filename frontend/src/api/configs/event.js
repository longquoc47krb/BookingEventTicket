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
  getEventByName: (name) => ({
    url: `/event/findName`,
    method: "GET",
    params: {
      name,
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
};
