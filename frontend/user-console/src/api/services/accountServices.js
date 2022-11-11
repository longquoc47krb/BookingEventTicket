import { useQuery } from "@tanstack/react-query";
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
const updateAccount = async (id, data) => {
  try {
    const response = await httpRequest(AccountAPI.updateAccount(id, data));
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
const findUserById = async (params) => {
  try {
    const response = await httpRequest(AccountAPI.findAccountById(params));
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const useFetchUserInfo = (params) => {
  return useQuery(["userInfo", params], () => findUser(params), {
    staleTime: 30000,
  });
};
export const useFetchUserInfoById = (params) => {
  return useQuery(["userInfoByID", params], () => findUserById(params), {
    staleTime: 30000,
  });
};
const accountServices = {
  updateAvatar,
  updateAccount,
  findUser,
  findUserById,
};
export default accountServices;
