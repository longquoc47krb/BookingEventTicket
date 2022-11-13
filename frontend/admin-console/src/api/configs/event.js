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
  getEventByFilter: ({ province, categoryId, status }) => ({
    url: `/event/filter`,
    method: "GET",
    params: {
      province,
      categoryId,
      status,
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
  createEvent: (userId, data) => ({
    url: `/event/${userId}`,
    method: "POST",
    data,
  }),
  uploadEventBackground: (eventId, userId, data) => ({
    url: `/event/avatar/${eventId}/${userId}`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};
