import { GoogleLogin } from "@react-oauth/google";
import { Col, Divider, Row } from "antd";
import { AxiosError } from "axios";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Authentication from "../../assets/Authentication.svg";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authServices from "../../api/services/authServices";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import {
  Input,
  InputPassword,
} from "../../components/common/input/customField";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import theme from "../../shared/theme";
import { YupValidations } from "../../utils/validate";
import constants, { ROLE } from "../../utils/constants";
import { isNotEmpty } from "../../utils/utils";
import ThreeDotsLoading from "../../components/loading/three-dots";
const { registerAccount } = authServices;
const UserRegister = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      email: YupValidations.email,
      name: YupValidations.name,
      password: YupValidations.password,
      confirmPassword: YupValidations.confirmPassword,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      const { email, password, name } = values;
      const response = await registerAccount({
        email,
        name,
        password,
        role: ROLE.Customer,
      });
      if (isNotEmpty(response)) {
        setLoading(false);
      }
      showNotification(response.status);
    },
  });
  const { handleSubmit } = formikLogin;
  const showNotification = (statusCode) => {
    switch (statusCode) {
      case 400:
        return AlertErrorPopup({
          title: t("status.register.400"),
          text: t("status.register.400"),
        });
      case 200:
        return AlertPopup({
          title: t("status.register.200"),
          text: t("status.register.200"),
        });
      default:
        return null;
    }
  };
  return (
    <>
      <HelmetHeader title={t("user.signup")} content="Login" />
      <div className="auth-container">
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[10vw] z-10"
          onClick={() => navigate("/")}
        />
        <LanguageSwitch className="absolute top-5 right-5" />
        <div className="auth-content">
          <img
            src={Authentication}
            alt="authentication"
            className="w-[50vw] h-auto wow floating"
            data-wow-duration="8460000s"
          />
          <FormikProvider value={formikLogin}>
            <Form className="auth-form" onSubmit={handleSubmit}>
              <Row className="leading-8">
                <h1 className="auth-title mb-2 ">{t("user.signup")}</h1>
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
                  <Field component={Input} name="name" label={t("user.name")} />
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
                    name="confirmPassword"
                    label={t("user.confirmPassword")}
                  />
                </Col>
              </Row>
              <Col span={24}>
                <button className={`primary-button`} type="submit">
                  {loading ? <ThreeDotsLoading /> : t("user.signup")}
                </button>
              </Col>
              <div className="flex justify-center gap-x-2 items-center mt-3">
                <span>{t("user.already-account")}</span>
                <a className="block" onClick={() => navigate("/login")}>
                  {t("pages.login")}
                </a>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
