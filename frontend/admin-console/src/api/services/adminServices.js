import httpRequest from "../../services/httpRequest";
import { AdminAPI } from "../configs/admin";
import { useQuery } from "@tanstack/react-query";
const findAllAccounts = async () => {
  try {
    const response = await httpRequest(AdminAPI.findAllAccounts);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const getAdminProfile = async (email) => {
  try {
    const response = await httpRequest(AdminAPI.getAdminProfile(email));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const useGetAdminProfile = (email) => {
  return useQuery(["getAdminProfile", email], () => getAdminProfile(email), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 30,
  });
};
export const useFindAllAccount = (staleTime = 0) => {
  return useQuery(["findAllAccounts"], findAllAccounts, {
    staleTime,
    cacheTime: 1000 * 60 * 30,
  });
};
const findAllCustomers = async () => {
  try {
    const response = await httpRequest(AdminAPI.findAllCustomers);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const useFindAllCustomer = (staleTime = 0) => {
  return useQuery(["findAllCustomers"], findAllCustomers, {
    staleTime,
    cacheTime: 1000 * 60 * 30,
  });
};
