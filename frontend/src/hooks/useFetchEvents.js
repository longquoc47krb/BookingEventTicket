import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllEvents, getEventById } from "../api/eventApi";

const useFetchEvents = () => {
  const queryClient = useQueryClient();
  return useQuery(
    // định danh
    ["events"],
    fetchAllEvents,
    {
      staleTime: 60000,
      onSuccess: (events) => {
        events.forEach((event) => {
          queryClient.setQueryData(["event", event.name], event);
        });
      },
    }
  );
};
const useFetchEventById = (id) => {
  return useQuery(["event", id], () => getEventById(id), {
    staleTime: 60000,
  });
};
export { useFetchEvents, useFetchEventById };
