import * as Yup from "yup";

const validateLoginForm = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
      "At least 1 number, at least 1 lowercase, at least 1 uppercase"
    ),
});
export { validateLoginForm };
