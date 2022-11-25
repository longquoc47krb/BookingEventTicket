export const OrderAPI = {
  createOrder: (userId, data) => ({
    url: `/order/${userId}`,
    method: "POST",
    data,
  }),
};
