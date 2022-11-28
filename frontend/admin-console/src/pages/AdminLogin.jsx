import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../api/services/accountServices";
import authServices from "../api/services/authServices";
import organizationServices from "../api/services/organizationServices";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import { Input, InputPassword } from "../components/customField";
import ThreeDotsLoading from "../components/ThreeLoading";
import {
  setRole,
  setToken,
  setUserProfile,
} from "../redux/slices/accountSlice";
import { ROLE } from "../utils/constants";
import { isNotEmpty } from "../utils/utils";
import { YupValidations } from "../utils/validate";
const { findUser } = accountServices;
const { loginByEmail } = authServices;
const { getOrganizerByEmail } = organizationServices;
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      email: YupValidations.email,
      password: YupValidations.password,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      const response = await loginByEmail({
        email,
        password,
      });
      const userProfileResponse = await getOrganizerByEmail(email);
      setLoading(false);
      showNotification(response);

      if (
        ((response.status === 200 || userProfileResponse.status === 200) &&
          response.data.roles[0] === ROLE.Organizer) ||
        response.data.roles[0] === ROLE.Admin
      ) {
        dispatch(setRole(response.data.roles[0]));
        if (response.data.roles[0] === ROLE.Admin) {
          dispatch(
            setUserProfile({
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
            })
          );
        } else {
          dispatch(setUserProfile(userProfileResponse.data));
        }
        dispatch(setToken(response.data.token));
      }
    },
  });
  const showNotification = (response) => {
    switch (response.status) {
      case 200:
      case 201:
        if (
          response.data.roles[0] === ROLE.Organizer ||
          response.data.roles[0] === ROLE.Admin
        ) {
          setTimeout(() => {
            navigate("/");
          }, 3000);
          return AlertPopup({
            title: t("popup.login.success"),
            text: t("popup.login.success"),
          });
        } else {
          return AlertErrorPopup({
            title: t("popup.login.unauthorized"),
          });
        }
      default:
        return AlertErrorPopup({
          title: t("popup.login.error"),
          text: t("popup.login.error"),
        });
    }
  };
  const { handleSubmit } = formikLogin;
  return (
    <div className="flex items-center justify-center w-full h-screen bg">
      <FormikProvider value={formikLogin}>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <Row className="leading-8">
            <h1 className="auth-title mb-2">{t("pages.login")}</h1>
          </Row>
          <Row
            align="middle"
            style={{
              height: "auto",
              display: "flex",
              alignContent: "center",
            }}
            gutter={[0, 8]}
          >
            <Col flex={4}>
              <Field component={Input} name="email" label="Email" />
            </Col>
          </Row>
          <Row
            align="middle"
            style={{
              height: "auto",
              display: "flex",
              alignContent: "center",
            }}
            gutter={[0, 8]}
          >
            <Col flex={4}>
              <Field
                component={InputPassword}
                name="password"
                label={t("user.password")}
              />
            </Col>
          </Row>
          <Col span={24}>
            <button className={"primary-button"} type="submit">
              {loading ? <ThreeDotsLoading /> : t("pages.login")}
            </button>
          </Col>
          <div className="flex justify-center items-center mt-3">
            <a onClick={() => navigate("/forgot-password")}>
              {t("user.forgot-password")}?
            </a>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default Login;
