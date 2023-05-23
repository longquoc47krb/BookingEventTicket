import * as Yup from "yup";
import "yup-phone";
import constants from "./constants";
const { PATTERNS } = constants;
export const YupValidations = {
  email: Yup.string()
    .required("validate.email.required")
    .email("validate.email.invalid"),
  name: Yup.string()
    .required("validate.name.required")
    .max(64, "validate.name.max")
    .matches(PATTERNS.NAME_PATTERN, "validate.name.number-not-allowed"),
  phone: Yup.string().phone("VN", true, "validate.phone.error"),
  password: Yup.string()
    .required("validate.password.required")
    .matches(PATTERNS.PASSWORD_PATTERN, "validate.password.min")
    .max(20, "validate.password.max")
    .matches(PATTERNS.PASSWORD_LETTER, "validate.password.letter")
    .matches(PATTERNS.PASSWORD_NUMBER, "validate.password.number"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "validate.confirmPassword.invalid")
    .required("validate.password.required")
    .matches(PATTERNS.PASSWORD_PATTERN, "validate.password.min")
    .max(20, "validate.password.max")
    .matches(PATTERNS.PASSWORD_LETTER, "validate.password.letter")
    .matches(PATTERNS.PASSWORD_NUMBER, "validate.password.number"),
  otp: Yup.string()
    .required("validate.otp.required")
    .min(6, "validate.otp.min"),
};
