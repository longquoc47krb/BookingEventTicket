import axiosClient from "./axiosClient";
const httpRequest = async ({ url, method, data, params, ...rest }) => {
  try {
    const response = await axiosClient.request({
      url,
      method,
      data,
      params,
      withCredentials: true,
      ...rest,
    });
    return response;
  } catch (AxiosError) {
    if (AxiosError) {
      // console.log("HTTP_ERROR_OBJECT", JSON.stringify(errorResponse), url);
    }
    throw AxiosError;
  }
};

export default httpRequest;
