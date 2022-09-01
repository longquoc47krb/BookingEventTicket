import * as Yup from "yup";
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const validateLoginForm = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
export { validateLoginForm };
