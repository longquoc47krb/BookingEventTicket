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
  getHighlightEvents: {
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
  getEventByProvince: (province) => ({
    url: `/event/findEventByProvince`,
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
};
