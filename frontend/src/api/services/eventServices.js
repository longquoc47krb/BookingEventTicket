import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { EventAPI } from "../configs/event";

const fetchAllEvents = async () => {
  const response = await httpRequest(EventAPI.getAllEvents);
  return response;
};
const getEventByName = async (name) => {
  const response = await httpRequest(EventAPI.getEventByName(name));
  return response;
};
const getEventById = async (id) => {
  const response = await httpRequest(EventAPI.getEventById(id));
  return response;
};
const createEvent = async (body) => {
  const response = await httpRequest(EventAPI.createEvent(body));
  return response;
};
const fetchEventsForPagination = async (params) => {
  const response = await httpRequest(
    EventAPI.getAllEventsWithPagination(params)
  );
  return response;
};
// React Query

export const useFetchEvents = () => {
  return useQuery(
    // định danh
    ["events"],
    fetchAllEvents,
    {
      retry: 10,
    }
  );
};
export const useFetchEventsForPagination = (params) => {
  return useQuery(
    ["eventsPaginated", params],
    () => fetchEventsForPagination(params),
    {
      staleTime: 60000,
    }
  );
};
export const useEventDetails = (eventName, options = {}) => {
  return useQuery(
    ["getEventDetail", eventName],
    () => getEventByName(eventName),
    {
      ...options,
      enabled: !!eventName,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

const eventServices = {
  fetchAllEvents,
  fetchEventsForPagination,
  getEventByName,
  getEventById,
  createEvent,
};
export default eventServices;
