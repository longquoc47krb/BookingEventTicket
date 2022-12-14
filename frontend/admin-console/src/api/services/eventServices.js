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
const createEvent = async (id, body) => {
  const response = await httpRequest(EventAPI.createEvent(id, body));
  return response;
};
const uploadEventBackground = async (id, userId, body) => {
  try {
    const response = await httpRequest(
      EventAPI.uploadEventBackground(id, userId, body)
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
const fetchEventsForPagination = async (params) => {
  const response = await httpRequest(
    EventAPI.getAllEventsWithPagination(params)
  );
  return response;
};
const updateEvent = async (eventId, userId, body) => {
  try {
    const response = await httpRequest(
      EventAPI.updateEvent(eventId, userId, body)
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const deleteEvent = async (eventId, userId) => {
  try {
    const response = await httpRequest(EventAPI.deleteEvent(eventId, userId));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const fetchEventsByProvince = async (params) => {
  const response = await httpRequest(EventAPI.findEventsByProvince(params));
  return response;
};
const fetchEventByFilter = async (params) => {
  const response = await httpRequest(EventAPI.getEventByFilter(params));
  return response.data;
};
// React Query

export const useFetchEvents = (staleTime) => {
  return useQuery(["events"], fetchAllEvents, {
    staleTime: 0,
    cacheTime: 1000 * 60 * 30,
  });
};
export const useCheckEventsStatus = () => {
  return useQuery(["checkEventStatus"], setEventStatus, {
    staleTime: 30000,
    cacheTime: 1000 * 60 * 30,
  });
};
export const useFetchFeaturedEvents = (staleTime = 30000) => {
  return useQuery(["featuredEvents"], fetchFeaturedEvents, {
    staleTime,
    cacheTime: 1000 * 60 * 30,
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
    staleTime: 30000,
  });
};
export const useFetchEventsByFilter = (params) => {
  return useQuery(
    ["getEventsByFilter", params],
    () => fetchEventByFilter(params),
    {
      staleTime: 30000,
      cacheTime: 1000 * 60 * 60,
    }
  );
};
export const useFetchEventsByProvince = (params) => {
  return useQuery(
    ["getEventsByProvince", params],
    () => fetchEventsByProvince(params),
    {
      staleTime: 30000,
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
  createEvent,
  uploadEventBackground,
  updateEvent,
  deleteEvent,
};
export default eventServices;
