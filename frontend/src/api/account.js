export const AccountAPI = {
  findAccountByEmailOrPhone: (params) => ({
    url: "/account/findAccount",
    method: "GET",
    params,
  }),
  findAllAccounts: {
    url: "/account/findAll",
    method: "GET",
  },
  createAccount: (data) => ({
    url: "/account/register",
    method: "POST",
    data,
  }),
  updateAccount: (id, data) => ({
    url: `/account/update/${id}`,
    method: "PUT",
    data,
  }),
  uploadAvatar: (id, data) => ({
    url: `/account/users/avatar/${id}`,
    method: "POST",
    data,
  }),
};
