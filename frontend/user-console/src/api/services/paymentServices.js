import httpRequest from "../../services/httpRequest";
import { PaymentAPI } from "../configs/payment";

const payOrder = async (data) => {
  try {
    const response = await httpRequest(PaymentAPI.payOrder(data));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const paymentServices = { payOrder };
export default paymentServices;
