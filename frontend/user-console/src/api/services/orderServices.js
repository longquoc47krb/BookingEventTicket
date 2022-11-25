import httpRequest from "../../services/httpRequest";
import { OrderAPI } from "../configs/order";

const createOrder = async (userId, body) => {
  try {
    const response = await httpRequest(OrderAPI.createOrder(userId, body));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const orderServices = { createOrder };
export default orderServices;
