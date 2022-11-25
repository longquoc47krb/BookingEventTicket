export const OrderAPI = {
  createOrder: (userId, data) => ({
    url: `/customer/order/${userId}`,
    method: "POST",
    data,
  }),
};
