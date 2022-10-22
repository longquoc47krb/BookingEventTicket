import httpRequest from "../../services/httpRequest";
import { AuthAPI } from "../configs/auth";

const loginByEmail = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.loginByEmail(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const registerAccount = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.registerAccount(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const authServices = {
  loginByEmail,
  registerAccount,
};
export default authServices;
