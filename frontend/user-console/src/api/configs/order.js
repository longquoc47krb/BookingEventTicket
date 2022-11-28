export const OrderAPI = {
  createOrder: (userId, data) => ({
    url: `/customer/order/${userId}`,
    method: "POST",
    data,
  }),
  getOrderListByUserId: (userId) => ({
    url: `/customer/order`,
    method: "GET",
    params: {
      userId,
    },
  }),
};
