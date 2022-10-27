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
  uploadAvatar: (email, data) => ({
    url: `/account/update/avatar/${email}`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};
