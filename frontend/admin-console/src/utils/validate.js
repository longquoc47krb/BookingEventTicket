import * as Yup from "yup";
import "yup-phone";
import constants from "./constants";
const { PATTERNS } = constants;
const today = new Date();
today.setHours(0, 0, 0, 0);

// custom method to check if array contains any duplicate email address
Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.tes("unique", message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});
console.log({ Yup });
export const YupValidations = {
  email: Yup.string()
    .required("validate.email.required")
    .email("validate.email.invalid"),
  name: Yup.string()
    .required("validate.name.required")
    .max(200, "validate.name.max"),
  province: Yup.string().required("validate.province.required"),
  province_profile: Yup.string(),
  venue: Yup.string()
    .required("validate.venue.required")
    .max(128, "validate.venue.max"),
  venue_profile: Yup.string().max(128, "validate.venue.max"),
  address: Yup.string()
    .required("validate.address.required")
    .max(255, "validate.address.max"),
  address_profile: Yup.string().max(255, "validate.address.max"),
  description: Yup.string()
    .required("validate.description.required")
    .min(9, "validate.description.required")
    .max(5000, "validate.description.max"),
  phone: Yup.string().phone("VN", true, "validate.phone.error"),
  password: Yup.string()
    .required("validate.password.required")
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: "validate.password.notMatch",
    })
    .max(32, "validate.password.max"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "validate.confirmPassword.invalid")
    .required("validate.password.required")
    .matches(PATTERNS.PASSWORD_PATTERN, {
      message: "validate.password.notMatch",
    })
    .max(32, "validate.password.max"),
  otp: Yup.string()
    .required("validate.otp.required")
    .min(6, "validate.otp.min"),
  categories: Yup.array()
    .min(1, "validate.categories.required")
    .max(2, "validate.categories.max"),
  startingDate: Yup.date()
    .required("validate.startingDate.required")
    .min(today, "validate.startingDate.min")
    .max(Yup.ref("endingDate"), "validate.startingDate.max"),
  endingDate: Yup.date()
    .required("validate.endingDate.required")
    .when(
      "startingDate",
      (startingDate, yupSchema) =>
        startingDate && yupSchema.min(startingDate, "validate.endingDate.min")
    ),
  startingTime: Yup.date()
    .required("validate.startingTime.required")
    .min(today, "validate.startingTime.min")
    .max(Yup.ref("endingTime"), "validate.startingTime.max"),
  endingTime: Yup.date()
    .required("validate.endingTime.required")
    .when(
      "startingTime",
      (startingTime, yupSchema) =>
        startingTime && yupSchema.min(startingTime, "validate.endingTime.min")
    ),
  ticketList: Yup.array()
    .of(
      Yup.object().shape({
        currency: Yup.string().required("validate.ticket.currency.required"),
        price: Yup.number()
          .typeError("validate.ticket.price.number")
          .required("validate.ticket.price.required")
          .min(0.1, "validate.ticket.price.min"),
        ticketName: Yup.string().required("validate.ticket.name.required"),
        quantity: Yup.number()
          .typeError("validate.ticket.quantity.number")
          .required("validate.ticket.quantity.required")
          .min(30, "validate.ticket.quantity.min"),
      })
    )
    .test("unique", "validate.ticket.unique", function (list) {
      var mapper = (a) => a.ticketName;
      return list.length === new Set(list.map(mapper)).size;
    }),
  // .unique("validate.ticket.unique", (a) => a.ticketName),
};
