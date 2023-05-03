export const AdminAPI = {
  findAllAccounts: {
    url: "/account/findAll",
    method: "GET",
  },
  findAllCustomers: {
    url: "/customer/findAll",
    method: "GET",
  },
  getAdminProfile: (email) => ({
    url: `/admin/profile`,
    method: "GET",
    params: {
      email,
    },
  }),
};
