import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { ReviewAPI } from "../configs/review";

const getReviewListPaging = async (eventId, pageNumber, pageSize) => {
  try {
    const response = await httpRequest(
      ReviewAPI.getReviewListPaging(eventId, pageNumber, pageSize)
    );
    return response;
  } catch (err) {
    console.log({ err });
    return err.response.data;
  }
};
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

export const useFetchReviewListPagin = ({ id, pageNumber, pageSize }) => {
  return useQuery(
    ["getReviewListPaging", { id, pageNumber, pageSize }],
    () => getReviewListPaging(id, pageNumber, pageSize),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 60,
      refetchInterval: 10000,
    }
  );
};
export const useFetchReviewList = (id) => {
  return useQuery(["getReviewList", id], () => getReviewList(id), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 60,
    refetchInterval: 5000,
  });
};

const reviewServices = {
  getReviewListPaging,
  getReviewList,
  submitReview,
  checkExistReview,
  editReview,
  deleteReview,
};
export default reviewServices;
