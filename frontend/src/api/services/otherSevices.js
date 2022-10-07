import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getGeoLocation = async (value) => {
  const response = await axios.get(
    value
      ? `http://ip-api.com/json/${value}`
      : "http://ip-api.com/json/?fields=61439"
  );
  return response.data;
};
// React Query

export const useLocationName = (value, staleTime = 60000) => {
  return useQuery(["location", value], () => getGeoLocation(value), {
    staleTime,
  });
};
