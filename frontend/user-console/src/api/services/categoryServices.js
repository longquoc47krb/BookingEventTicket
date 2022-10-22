import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { CategoryAPI } from "../configs/category";

const fetchAllCategories = async () => {
  const response = await httpRequest(CategoryAPI.fetchAllCategories);
  return response.data;
};
export const useFetchCategories = (staleTime = 60000) => {
  return useQuery(["categories"], fetchAllCategories, {
    staleTime,
  });
};
const categoryServices = {
  fetchAllCategories,
};
export default categoryServices;
