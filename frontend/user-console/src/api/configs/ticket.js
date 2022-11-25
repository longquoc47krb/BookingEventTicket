export const reduceTicketQuantity = (eventId, ticketId) => ({
  url: `/ticket/${eventId}/${ticketId}`,
  method: "GET",
});
