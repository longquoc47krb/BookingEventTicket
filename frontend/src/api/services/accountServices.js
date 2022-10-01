import httpRequest from "../../services/httpRequest";
import { AccountAPI } from "../configs/account";

const loginByGmail = async (body) => {
  const response = await httpRequest(AccountAPI.loginByGmail(body));
  return response;
};
const loginByPhone = async (body) => {
  const response = await httpRequest(AccountAPI.loginByPhone(body));
  return response;
};
const accountServices = {
  loginByGmail,
  loginByPhone,
};
export default accountServices;
