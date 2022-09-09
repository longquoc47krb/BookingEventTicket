import * as Yup from "yup";
const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const validateLoginForm = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
export { validateLoginForm };
