import { t } from "i18next";
import * as Yup from "yup";
import constants from "./constants";
const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const { PATTERNS } = constants;
export const YupValidations = {
  email: Yup.string()
    .required(t("validate.email.required"))
    .email(t("validate.email.invalid")),
  name: Yup.string()
    .required(t("validate.name.required"))
    .max(64, t("validate.name.max")),
  phone: Yup.string().matches(phoneRegExp, t("validate.invalid")),
  password: Yup.string()
    .required(t("validate.password.required"))
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: t("validate.password.invalid"),
    })
    .max(20, t("validate.password.max"))
    .matches(PATTERNS.PASSWORD_UPPER, {
      message: t("validate.password.upper"),
    })
    .matches(PATTERNS.PASSWORD_NUMBER, {
      message: "validate.password.number",
    }),
};
