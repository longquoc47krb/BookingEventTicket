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
const fetchBestSellerEvents = async () => {
  const response = await httpRequest(EventAPI.getBestSellerEvents);
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
const fetchEventsByProvince = async (params) => {
  const response = await httpRequest(EventAPI.findEventsByProvince(params));
  return response;
};
const fetchEventByFilter = async (params) => {
  const response = await httpRequest(EventAPI.getEventByFilter(params));
  return response.data;
};
const fetchOrganizerByEventId = async (eventId) => {
  try {
    const response = await httpRequest(
      EventAPI.findOrganizerByEventId(eventId)
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
// React Query

export const useFetchEvents = (staleTime = 30000) => {
  return useQuery(["events"], fetchAllEvents, {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchIntervalInBackground: 1000 * 10,
  });
};
export const useFetchOrganizerByEventId = (id) => {
  return useQuery(
    ["findOrganizerByEventId", id],
    () => fetchOrganizerByEventId(id),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchIntervalInBackground: 1000 * 10,
    }
  );
};
export const useCheckEventsStatus = () => {
  return useQuery(["checkEventStatus"], setEventStatus, {
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 1000 * 10,
  });
};
export const useFetchFeaturedEvents = (staleTime = 30000) => {
  return useQuery(["featuredEvents"], fetchFeaturedEvents, {
    staleTime: 0,
    cacheTime: 1000 * 60 * 60,
    refetchInterval: 30000,
  });
};
export const useFetchBestSellerEvents = (staleTime = 30000) => {
  return useQuery(["fetchBestSellerEvents"], fetchBestSellerEvents, {
    staleTime: 0,
    cacheTime: 1000 * 60 * 60,
    refetchInterval: 30000,
  });
};
export const useFetchEventsForPagination = (params) => {
  return useQuery(
    ["eventsPaginated", params],
    () => fetchEventsForPagination(params),
    {
      staleTime: 30000,
    }
  );
};
export const useEventDetails = (id) => {
  return useQuery(["getEventDetail", id], () => getEventById(id), {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
  });
};
export const useFetchEventsByFilter = (params) => {
  return useQuery(
    ["getEventsByFilter", params],
    () => fetchEventByFilter(params),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 60,
    }
  );
};
export const useFetchEventsByProvince = (params) => {
  return useQuery(
    ["getEventsByProvince", params],
    () => fetchEventsByProvince(params),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 60,
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
  fetchOrganizerByEventId,
  createEvent,
};
export default eventServices;
