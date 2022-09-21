export const EventAPI = {
  getAllEvents: {
    url: "/event/showall",
    method: "GET",
  },
  getEventByName: {
    url: "/event/findname/",
    method: "GET",
  },
  eventById: {
    url: "/event",
    method: "GET",
    params: "{id}",
  },
};
