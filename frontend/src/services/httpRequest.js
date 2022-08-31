import axiosClient from "./axiosClient";
import { AxiosError } from "axios";
const httpRequest = async ({ url, method, data, params, ...rest }) => {
  try {
    const response = await axiosClient.request({
      url,
      method,
      data,
      params,
      ...rest,
    });
    return response;
  } catch (error) {
    const errorResponse = AxiosError.response;
    if (errorResponse) {
      console.log("HTTP_ERROR_OBJECT", JSON.stringify(errorResponse), url);
    }
    throw errorResponse;
  }
};

export default httpRequest;
