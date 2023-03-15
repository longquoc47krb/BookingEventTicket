import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { ReviewAPI } from "../configs/review";

const getReviewList = async (eventId) => {
  try {
    const response = await httpRequest(ReviewAPI.getReviewList(eventId));
    return response;
  } catch (err) {
    console.log({ err });
    return err.response.data;
  }
};
const submitReview = async (userId, body) => {
  try {
    const response = await httpRequest(ReviewAPI.submitReview(userId, body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const editReview = async (userId, body) => {
  try {
    const response = await httpRequest(ReviewAPI.editReview(userId, body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const deleteReview = async (userId, eventId) => {
  try {
    const response = await httpRequest(ReviewAPI.deleteReview(userId, eventId));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const checkExistReview = async (userId, eventId) => {
  try {
    const response = await httpRequest(
      ReviewAPI.checkExistReview(userId, eventId)
    );
    return response.status;
  } catch (err) {
    return err.response.data;
  }
};
// React Query

export const useFetchReviewList = (id) => {
  return useQuery(["getReviewList", id], () => getReviewList(id), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 60,
    refetchInterval: 5000,
  });
};

const reviewServices = {
  getReviewList,
  submitReview,
  checkExistReview,
  editReview,
  deleteReview,
};
export default reviewServices;
