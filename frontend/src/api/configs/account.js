export const AccountAPI = {
  findAccountByEmailOrPhone: (params) => ({
    url: "/account/findAccount",
    method: "GET",
    params: {
      value: params,
    },
  }),
  findAllAccounts: {
    url: "/account/findAll",
    method: "GET",
  },
  updateAccount: (id, data) => ({
    url: `/account/update/${id}`,
    method: "PUT",
    data,
  }),
  uploadAvatar: (id, data) => ({
    url: `/account/users/avatar/${id}`,
    method: "POST",
    data,
    headers: { "content-type": "multipart/form-data" },
  }),
};
