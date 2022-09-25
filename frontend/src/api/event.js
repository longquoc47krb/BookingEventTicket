export const EventAPI = {
  getAllEvents: {
    url: "/event/findAll",
    method: "GET",
  },
  getEventByName: (name) => ({
    url: "/event/findname/",
    method: "GET",
    params: name,
  }),
  eventById: {
    url: "/event",
    method: "GET",
    params: "{id}",
  },
};
