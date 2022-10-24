import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { EventAPI } from "../configs/event";

const fetchAllEvents = async () => {
  const response = await httpRequest(EventAPI.getAllEvents);
  return response.data;
};
const setEventStatus = async () => {
  const response = await httpRequest(EventAPI.checkEventStatus);
  return response.data;
};
const fetchFeaturedEvents = async () => {
  const response = await httpRequest(EventAPI.getFeaturedEvents);
  return response.data;
};
const getEventByName = async (name) => {
  const response = await httpRequest(EventAPI.getEventByName(name));
  return response.data;
};
const getEventById = async (id) => {
  const response = await httpRequest(EventAPI.getEventById(id));
  return response.data;
};
const createEvent = async (body) => {
  const response = await httpRequest(EventAPI.createEvent(body));
  return response.data;
};
const fetchEventsForPagination = async (params) => {
  const response = await httpRequest(
    EventAPI.getAllEventsWithPagination(params)
  );
  return response;
};
const fetchEventByFilter = async (params) => {
  const response = await httpRequest(EventAPI.getEventByFilter(params));
  return response.data;
};
// React Query

export const useFetchEvents = (staleTime = 0) => {
  return useQuery(["events"], fetchAllEvents, {
    staleTime,
  });
};
export const useCheckEventsStatus = () => {
  return useQuery(["checkEventStatus"], setEventStatus, {
    staleTime: 0,
    cacheTime: 1000 * 60 * 60 * 24,
  });
};
export const useFetchFeaturedEvents = (staleTime = 0) => {
  return useQuery(["featuredEvents"], fetchFeaturedEvents, {
    staleTime,
  });
};
export const useFetchEventsForPagination = (params) => {
  return useQuery(
    ["eventsPaginated", params],
    () => fetchEventsForPagination(params),
    {
      staleTime: 0,
    }
  );
};
export const useEventDetails = (id) => {
  return useQuery(["getEventDetail", id], () => getEventById(id), {
    staleTime: 0,
  });
};
export const useFetchEventsByFilter = (params) => {
  return useQuery(
    ["getEventsByFilter", params],
    () => fetchEventByFilter(params),
    {
      staleTime: 0,
    }
  );
};

const eventServices = {
  fetchAllEvents,
  fetchEventsForPagination,
  getEventByName,
  getEventById,
  fetchEventByFilter,
  setEventStatus,
  fetchFeaturedEvents,
  createEvent,
};
export default eventServices;
