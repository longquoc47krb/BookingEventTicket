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
const customerServices = {
  fetchWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearAllWishlist,
};

export default customerServices;
