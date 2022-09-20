export const EventAPI = {
  getAllEvents: {
    url: "/event/showall",
    method: "GET",
  },
  eventById: {
    url: "/event",
    method: "GET",
    params: "{id}",
  },
};
