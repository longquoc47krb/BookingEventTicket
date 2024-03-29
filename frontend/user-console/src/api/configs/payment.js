export const PaymentAPI = {
  payOrder: (data) => ({
    url: "/payment/payOrder",
    method: "POST",
    data,
  }),
  checkOrderAvailability: (userId, data) => ({
    url: `/customer/availability/order/${userId}`,
    method: "POST",
    data,
  }),
  payOrderVNPay: (data) => ({
    url: "/payment/VNPayOrder",
    method: "POST",
    data,
  }),
};
