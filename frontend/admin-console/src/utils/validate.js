import { t } from "i18next";
import * as Yup from "yup";
import "yup-phone";
import moment from "moment";
import constants from "./constants";
import { first } from "lodash";
const { PATTERNS } = constants;
const today = new Date();
today.setHours(0, 0, 0, 0);

// custom method to check if array contains any duplicate email address
Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.test("unique", message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});
console.log({ Yup });
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
    .min(9, t("validate.description.required"))
    .max(5000, t("validate.description.max")),
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
    .required(t("validate.startingDate.required"))
    .min(today, t("validate.startingDate.min"))
    .max(Yup.ref("endingDate"), t("validate.startingDate.max")),
  endingDate: Yup.date()
    .required(t("validate.endingDate.required"))
    .when(
      "startingDate",
      (startingDate, yupSchema) =>
        startingDate &&
        yupSchema.min(startingDate, t("validate.endingDate.min"))
    ),
  startingTime: Yup.date()
    .required(t("validate.startingTime.required"))
    .min(today, t("validate.startingTime.min"))
    .max(Yup.ref("endingTime"), t("validate.startingTime.max")),
  endingTime: Yup.date()
    .required(t("validate.endingTime.required"))
    .when(
      "startingTime",
      (startingTime, yupSchema) =>
        startingTime &&
        yupSchema.min(startingTime, t("validate.endingTime.min"))
    ),
  ticketList: Yup.array()
    .of(
      Yup.object().shape({
        currency: Yup.string().required(t("validate.ticket.currency.required")),
        price: Yup.number()
          .typeError(t("validate.ticket.price.number"))
          .required(t("validate.ticket.price.required"))
          .min(0.1, t("validate.ticket.price.min")),
        ticketName: Yup.string().required(t("validate.ticket.name.required")),
        quantity: Yup.number()
          .typeError(t("validate.ticket.quantity.number"))
          .required(t("validate.ticket.quantity.required"))
          .min(30, t("validate.ticket.quantity.min")),
      })
    )
    .test("unique", "validate.ticket.unique", function (list) {
      var mapper = (a) => a.ticketName;
      return list.length === new Set(list.map(mapper)).size;
    }),
  // .unique("validate.ticket.unique", (a) => a.ticketName),
};
