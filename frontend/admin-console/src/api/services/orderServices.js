import httpRequest from "../../services/httpRequest";
import { OrderAPI } from "../configs/order";
import { useQuery } from "@tanstack/react-query";
const findOrdersByEventId = async (eventId, userId) => {
  try {
    const response = await httpRequest(
      OrderAPI.findOrderByEventId(eventId, userId)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
const findOrderWithUniqueAccount = async (eventId, userId) => {
  try {
    const response = await httpRequest(
      OrderAPI.findOrderWithUniqueAccount(eventId, userId)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const useFetchOrdersByEventId = (eventId, userId) => {
  return useQuery(
    ["findOrdersByEventId", (eventId, userId)],
    () => findOrdersByEventId(eventId, userId),
    {
      staleTime: 0,
      refetchInterval: 5000,
    }
  );
};
export const useFetchOrdersWithUniqueAccount = (eventId, userId) => {
  return useQuery(
    ["findOrderWithUniqueAccount", (eventId, userId)],
    () => findOrderWithUniqueAccount(eventId, userId),
    {
      staleTime: 0,
      refetchInterval: 5000,
    }
  );
};
