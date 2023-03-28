import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { CustomerAPI } from "../configs/customer";

const fetchWishlist = async (userId) => {
  try {
    const response = await httpRequest(CustomerAPI.getWishlist(userId));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const addWishlistItem = async (id, userId) => {
  try {
    const response = await httpRequest(CustomerAPI.addWishlist(id, userId));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const removeWishlistItem = async (id, userId) => {
  try {
    const response = await httpRequest(CustomerAPI.removeWishlist(id, userId));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const clearAllWishlist = async (userId) => {
  try {
    const response = await httpRequest(CustomerAPI.clearWishlist(userId));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const findFollowedOrganizerList = async (userId) => {
  try {
    const response = await httpRequest(
      CustomerAPI.findFollowedOrganizerList(userId)
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const followOrg = async (userId, organizerEmail) => {
  try {
    const response = await httpRequest(
      CustomerAPI.followOrg(userId, organizerEmail)
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const unfollowOrg = async (userId, organizerEmail) => {
  try {
    const response = await httpRequest(
      CustomerAPI.unfollowOrg(userId, organizerEmail)
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const useFetchWishlist = (userId) => {
  return useQuery(["wishlist", userId], () => fetchWishlist(userId), {
    staleTime: 30000,
    cacheTime: 1000 * 60 * 60 * 24,
  });
};
const customerServices = {
  fetchWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearAllWishlist,
  findFollowedOrganizerList,
  followOrg,
  unfollowOrg,
};

export default customerServices;
