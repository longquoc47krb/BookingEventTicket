import { useQuery } from "@tanstack/react-query";
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
const getOrderListByUserId = async (userId) => {
  try {
    const response = await httpRequest(OrderAPI.getOrderListByUserId(userId));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const useGetOrderListByUserId = (id) => {
  return useQuery(
    ["getOrderListByUserId", id],
    () => getOrderListByUserId(id),
    {
      staleTime: 0,
    }
  );
};
const orderServices = { createOrder };
export default orderServices;
