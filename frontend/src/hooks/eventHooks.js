import { useQuery, useQueryClient } from "@tanstack/react-query";
import eventServices from "../api/services/eventServices";
const { fetchAllEvents, getEventById } = eventServices;
const useFetchEvents = () => {
  const queryClient = useQueryClient();
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
const useFetchEventById = (id) => {
  return useQuery(["event", id], () => getEventById(id), {
    staleTime: 100000,
  });
};
export { useFetchEvents, useFetchEventById };
