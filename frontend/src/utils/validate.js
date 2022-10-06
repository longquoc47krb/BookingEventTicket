import * as Yup from "yup";
const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const YupValidations = {
  email: Yup.string().required("Required").email("Invalid email address"),
  name: Yup.string().required("Required").max(64, "Max length 64"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
};
