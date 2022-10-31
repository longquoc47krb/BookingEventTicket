import httpRequest from "../../services/httpRequest";
import { AccountAPI } from "../configs/account";

const updateAvatar = async (id, data) => {
  try {
    const response = await httpRequest(AccountAPI.uploadAvatar(id, data));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const findUser = async (params) => {
  try {
    const response = await httpRequest(
      AccountAPI.findAccountByEmailOrPhone(params)
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const accountServices = {
  updateAvatar,
  findUser,
};
export default accountServices;
