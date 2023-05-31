import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { ROLE, DefaultAvatar } from "../../utils/constants";
import { AccountAPI } from "../configs/account";

const updateAvatar = async (id, data) => {
  try {
    const response = await httpRequest(AccountAPI.uploadAvatar(id, data));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const findAllOrganizers = async () => {
  try {
    const accountResponse = await httpRequest(AccountAPI.findAllAccounts);
    console.log({ accountResponse });
    if (accountResponse.status === 200) {
      const organization = accountResponse.data.filter(
        (account) =>
          account.role === ROLE.Organizer && account.avatar !== DefaultAvatar
      );
      return organization;
    }
  } catch (err) {
    return [];
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
export const useFindAllOrganizers = () => {
  return useQuery(["findAllOrganizers"], findAllOrganizers, {
    staleTime: 0,
  });
};
const accountServices = {
  updateAvatar,
  updateAccount,
  findUser,
  findUserById,
};
export default accountServices;
