import { t } from "i18next";
import * as Yup from "yup";
import "yup-phone";
import moment from "moment";
import constants from "./constants";
const { PATTERNS } = constants;
export const YupValidations = {
  email: Yup.string()
    .required(t("validate.email.required"))
    .email(t("validate.email.invalid")),
  name: Yup.string()
    .required(t("validate.name.required"))
    .max(64, t("validate.name.max")),
  phone: Yup.string()
    .phone("VN", t("validate.phone.error"))
    .notRequired()
    .nullable(),
  password: Yup.string()
    .required(t("validate.password"))
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: t("validate.password.notMatch"),
    })
    .max(20, t("validate.password.max"))
    .matches(PATTERNS.PASSWORD_LETTER, {
      message: t("validate.password.letter"),
    })
    .matches(PATTERNS.PASSWORD_NUMBER, {
      message: "validate.password.number",
    }),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], t("validate.confirmPassword.invalid"))
    .required(t("validate.password.required"))
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: t("validate.password.notMatch"),
    })
    .max(20, t("validate.password.max"))
    .matches(PATTERNS.PASSWORD_LETTER, {
      message: t("validate.password.letter"),
    })
    .matches(PATTERNS.PASSWORD_NUMBER, {
      message: t("validate.password.number"),
    }),
  otp: Yup.string()
    .required(t("validate.otp.required"))
    .min(6, t("validate.otp.min")),
  startingDate: Yup.date()
    .required("Required")
    .min(moment(), "Min date is today")
    .max(Yup.ref("endingDate"), "Max date is contract end"),
  endingDate: Yup.date()
    .required("Required")
    .when(
      "startingDate",
      (startingDate, yupSchema) =>
        startingDate &&
        yupSchema.min(startingDate, "Min date is contract start")
    ),
};
