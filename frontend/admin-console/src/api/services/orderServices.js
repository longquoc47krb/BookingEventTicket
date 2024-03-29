import httpRequest from "../../services/httpRequest";
import { OrderAPI } from "../configs/order";
import { useQuery } from "@tanstack/react-query";
export const findOrdersByEventId = async (eventId, userId) => {
  try {
    const response = await httpRequest(
      OrderAPI.findOrderByEventId(eventId, userId)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const findOrderWithUniqueAccount = async (eventId, userId) => {
  try {
    const response = await httpRequest(
      OrderAPI.findOrderWithUniqueAccount(eventId, userId)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getDailyTicketStatistics = async (email) => {
  try {
    const response = await httpRequest(
      OrderAPI.getDailyTicketStatistics(email)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getLastFourWeeksTicketStatistics = async (email) => {
  try {
    const response = await httpRequest(
      OrderAPI.getLastFourWeeksTicketStatistics(email)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getMonthlyTicketStatistics = async (email) => {
  try {
    const response = await httpRequest(
      OrderAPI.getMonthlyTicketStatistics(email)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getDailyOrderStatistics = async (email) => {
  try {
    const response = await httpRequest(OrderAPI.getDailyOrderStatistics(email));
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getLastFourWeeksOrderStatistics = async (email) => {
  try {
    const response = await httpRequest(
      OrderAPI.getLastFourWeeksOrderStatistics(email)
    );
    return response.data;
  } catch (error) {
    return error.response.data.data;
  }
};
export const getMonthlyOrderStatistics = async (email) => {
  try {
    const response = await httpRequest(
      OrderAPI.getMonthlyOrderStatistics(email)
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
