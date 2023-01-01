import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getMyIP = async () => {
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
export const convertToUSD = async (amount) => {
  try {
    const response = await axios.get(
      "https://api.apilayer.com/exchangerates_data/convert",
      {
        params: { amount: amount, from: "VND", to: "USD" },
        headers: {
          apikey: "wXiILyIuSslr360NjCK9zdR6fmDD2ryC",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};
