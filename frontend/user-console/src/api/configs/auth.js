export const AuthAPI = {
  registerAccount: (data) => ({
    url: "/auth/register",
    method: "POST",
    data,
  }),
  loginByEmail: (data) => ({
    url: "/auth/login",
    method: "POST",
    data,
  }),
  loginByPhone: (data) => ({
    url: "/account/loginByPhone",
    method: "POST",
    data,
  }),
  forgotPassword: (data) => ({
    url: "/auth/forget",
    method: "POST",
    data,
  }),
  verifyOTP: (data) => ({
    url: "/auth/verifyOTP",
    method: "POST",
    data,
  }),
};
