export const EventAPI = {
  getAllEvents: {
    url: "/event/findAll",
    method: "GET",
  },
  getEventByName: (name) => ({
    url: `/event/findname/${name}`,
    method: "GET",
  }),
  eventById: {
    url: "/event",
    method: "GET",
    params: "{id}",
  },
};
