export const PaymentAPI = {
  payOrder: (data) => ({
    url: "/payment/payOrder",
    method: "POST",
    data,
  }),
};
