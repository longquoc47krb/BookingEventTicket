import httpRequest from "../../services/httpRequest";
import { reduceTicketQuantity } from "../configs/ticket";

const reduceTicketQuantityAsync = async (eventId, ticketId) => {
  try {
    const response = await httpRequest(reduceTicketQuantity(eventId, ticketId));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const ticketServices = { reduceTicketQuantityAsync };
export default ticketServices;
