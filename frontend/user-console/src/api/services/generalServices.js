import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getGeoLocation = async () => {
  try {
    const response = await axios.get(
      "https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation",
      {
        params: { apikey: "873dbe322aea47f89dcf729dcc8f60e8" },
        headers: {
          "X-RapidAPI-Key":
            "e0fc34f8b5msh684f83a00348d4fp1c8d01jsn2c61c634edff",
          "X-RapidAPI-Host":
            "find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// React Query

export const useLocationName = (staleTime = 60000) => {
  return useQuery(["location"], getGeoLocation, {
    staleTime,
  });
};
