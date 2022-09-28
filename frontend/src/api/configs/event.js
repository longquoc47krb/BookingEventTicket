export const EventAPI = {
  getAllEvents: {
    url: "/event/findAll",
    method: "GET",
  },
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
};
