import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getGeoLocation = async (value) => {
  // const response = await axios.get("http://ip-api.com/json/27.79.94.0");
  const response = await axios.get("https://ip-api.com/json/?fields=61439");
  return response.data;
};
// React Query

export const useLocationName = (value, staleTime = 60000) => {
  return useQuery(["location", value], () => getGeoLocation(value), {
    staleTime,
  });
};
