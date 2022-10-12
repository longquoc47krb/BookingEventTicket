import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { EventAPI } from "../configs/event";

const fetchAllEvents = async () => {
  const response = await httpRequest(EventAPI.getAllEvents);
  return response;
};
const fetchHighlightEvents = async () => {
  const response = await httpRequest(EventAPI.getHighlightEvents);
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
export const useFetchFeaturedEvents = (staleTime = 60000) => {
  return useQuery(["highlightEvents"], fetchHighlightEvents, {
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
  createEvent,
};
export default eventServices;
