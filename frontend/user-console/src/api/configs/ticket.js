export const reduceTicketQuantity = (eventId, ticketId, data) => ({
    url: `/ticket/${eventId}/${ticketId}`,
    method: "POST",
    data,
  })