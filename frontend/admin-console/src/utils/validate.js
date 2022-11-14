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
    .max(200, t("validate.name.max")),
  province: Yup.string().required(t("validate.province.required")),
  venue: Yup.string()
    .required(t("validate.venue.required"))
    .max(128, t("validate.venue.max")),
  address: Yup.string()
    .required(t("validate.address.required"))
    .max(255, t("validate.address.max")),
  description: Yup.string()
    .required(t("validate.description.required"))
    .max(2000, t("validate.description.max")),
  phone: Yup.string()
    .phone("VN", t("validate.phone.error"))
    .notRequired()
    .nullable(),
  password: Yup.string()
    .required(t("validate.password.required"))
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: t("validate.password.notMatch"),
    })
    .max(32, t("validate.password.max")),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], t("validate.confirmPassword.invalid"))
    .required(t("validate.password.required"))
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: t("validate.password.notMatch"),
    })
    .max(32, t("validate.password.max")),
  otp: Yup.string()
    .required(t("validate.otp.required"))
    .min(6, t("validate.otp.min")),
  categories: Yup.array()
    .min(1, t("validate.categories.required"))
    .max(2, t("validate.categories.max")),
  startingDate: Yup.date()
    .required("validate.startingDate.required")
    .min(moment(), "validate.startingDate.min")
    .max(Yup.ref("endingDate"), "validate.startingDate.max"),
  endingDate: Yup.date()
    .required("validate.endingDate.required")
    .when(
      "startingDate",
      (startingDate, yupSchema) =>
        startingDate && yupSchema.min(startingDate, "validate.endingDate.min")
    ),
  ticketList: Yup.array()
    .of(
      Yup.object().shape({
        currency: Yup.string().required(t("validate.ticket.currency.required")),
        price: Yup.number()
          .typeError("validate.ticket.price.number")
          .required(t("validate.ticket.price.required"))
          .min(0.1, t("validate.ticket.price.min")),
        ticketName: Yup.string().required(t("validate.ticket.name.required")),
        quantity: Yup.number()
          .typeError(t("validate.ticket.quantity.number"))
          .required(t("validate.ticket.quantity.required"))
          .min(30, t("validate.ticket.quantity.min")),
      })
    )
    .test("unique", t("validate.ticket.unique"), (lists) => {
      let seen = new Set();
      var hasDuplicates = lists.some(function (currentObject) {
        return seen.size === seen.add(currentObject.ticketName).size;
      });
      return !hasDuplicates;
    }),
};
