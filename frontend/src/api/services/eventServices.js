import { useQuery, useQueryClient } from "@tanstack/react-query";
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
const getAllEventsWithPagination = async (params) => {
  const response = await httpRequest(
    EventAPI.getAllEventsWithPagination(params)
  );
  return response;
};
// React Query

export const useStudents = (options, page) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["eventsWithPagination", page],
    () => getAllEventsWithPagination(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(["searchStudents"]);
      },
    }
  );
};
const eventServices = {
  fetchAllEvents,
  getEventByName,
  getEventById,
  createEvent,
};
export default eventServices;
