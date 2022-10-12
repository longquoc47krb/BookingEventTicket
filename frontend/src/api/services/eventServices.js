import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { EventAPI } from "../configs/event";

const fetchAllEvents = async () => {
  const response = await httpRequest(EventAPI.getAllEvents);
  return response.data;
};
const fetchCompletedEvents = async () => {
  const response = await httpRequest(EventAPI.getCompletedEvents);
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
const fetchEventsByProvince = async (params) => {
  const response = await httpRequest(EventAPI.getEventByProvince(params));
  return response.data;
};
// React Query

export const useFetchEvents = (staleTime = 60000) => {
  return useQuery(["events"], fetchAllEvents, {
    staleTime,
  });
};
export const useCompletedEvents = (staleTime = 60000) => {
  return useQuery(["completedEvents"], fetchCompletedEvents, {
    staleTime,
  });
};
export const useFetchFeaturedEvents = (staleTime = 60000) => {
  return useQuery(["featuredEvents"], fetchFeaturedEvents, {
    staleTime,
  });
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
export const useEventDetails = (id) => {
  return useQuery(["getEventDetail", id], () => getEventById(id), {
    staleTime: 60000,
  });
};
export const useEventsByProvince = (province) => {
  return useQuery(
    ["getEventsByProvince", province],
    () => fetchEventsByProvince(province),
    {
      staleTime: 60000,
    }
  );
};

const eventServices = {
  fetchAllEvents,
  fetchEventsForPagination,
  getEventByName,
  getEventById,
  fetchEventsByProvince,
  fetchCompletedEvents,
  fetchFeaturedEvents,
  createEvent,
};
export default eventServices;
