import httpRequest from "../../services/httpRequest";
import { AuthAPI } from "../configs/auth";

const loginByEmail = async (body) => {
  const response = await httpRequest(AuthAPI.loginByEmail(body));
  return response;
};
const authServices = {
  loginByEmail,
};
export default authServices;
