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
      staleTime: 100000,
      // onSuccess: (events) => {
      //   events.forEach((event) => {
      //     queryClient.setQueryData(["event", event.name], event);
      //   });
      // },
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
export const useFetchEventById = (id) => {
  return useQuery(["event", id], () => getEventById(id), {
    staleTime: 100000,
  });
};

const eventServices = {
  fetchAllEvents,
  fetchEventsForPagination,
  getEventByName,
  getEventById,
  createEvent,
};
export default eventServices;
