export const AccountAPI = {
  findAccountByEmailOrPhone: (params) => ({
    url: "/account/findAccount",
    method: "GET",
    params: {
      value: params,
    },
  }),
  findAccountById: (params) => ({
    url: `/account/${params}`,
    method: "GET",
  }),
  findAllAccounts: {
    url: "/account/findAll",
    method: "GET",
  },
  updateAccount: (id, data) => ({
    url: `/account/infor/${id}`,
    method: "POST",
    data,
  }),
  uploadAvatar: (id, data) => ({
    url: `/account/avatar/${id}`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};
