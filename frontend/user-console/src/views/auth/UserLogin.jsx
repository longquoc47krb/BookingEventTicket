/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Divider, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../../api/services/accountServices";
import authServices from "../../api/services/authServices";
import Authentication from "../../assets/Authentication.svg";
import Google from "../../assets/google.svg";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import { useSelector } from "react-redux";
import {
  Input,
  InputPassword,
} from "../../components/common/input/customField";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import ThreeDotsLoading from "../../components/loading/three-dots";
import { setToken, setUserProfile } from "../../redux/slices/accountSlice";
import { ROLE } from "../../utils/constants";
import { YupValidations } from "../../utils/validate";
import { pathNameSelector } from "../../redux/slices/routeSlice";
const { loginByEmail } = authServices;
const { findUser } = accountServices;
const UserLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPathname = useSelector(pathNameSelector);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };
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
      const userProfileResponse = await findUser(email);
      showNotification(response.status, userProfileResponse.data.role);
      setLoading(false);
      if (
        (response.status === 200 || userProfileResponse.status === 200) &&
        userProfileResponse.data.role === ROLE.Customer
      ) {
        dispatch(setToken(response.data.token));
        dispatch(setUserProfile(userProfileResponse.data));
      }
    },
  });
  const { handleSubmit } = formikLogin;
  const showNotification = (statusCode, role) => {
    switch (statusCode) {
      case 400:
        return AlertErrorPopup({
          title: t("status.login.400"),
          text: t("status.login.400"),
        });
      case 200:
      case 201:
        if (role === ROLE.Customer) {
          setTimeout(() => {
            navigate(previousPathname ? previousPathname : "/");
          }, 3000);
          return AlertPopup({
            title: t("status.login.200"),
            text: t("status.login.200"),
          });
        } else {
          return AlertErrorPopup({
            title: t("status.login.unauthorized"),
          });
        }

      default:
        return null;
    }
  };
  return (
    <>
      <HelmetHeader title={t("pages.login")} content="Login" />
      <div className="auth-container">
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[10vw] z-10"
          onClick={() => navigate("/")}
        />
        <LanguageSwitch className="absolute top-5 right-5 z-10" />
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
              <Divider style={{ color: "black", border: "gray" }}>
                {t("user.login-by-google")}
              </Divider>
              <div className="flex justify-center">
                <Col span={24}>
                  <button
                    className={"button"}
                    type="button"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_API_URL_BASE}/oauth2/authorization/google`,
                        "_blank"
                      )
                    }
                  >
                    <img src={Google} alt="Google" className="w-5 h-auto" />{" "}
                    {t("user.login-by-google")}
                  </button>
                </Col>
              </div>
              <div className="flex justify-center items-center mt-3">
                <a onClick={() => navigate("/forgot-password")}>
                  {t("user.forgot-password")}?
                </a>
              </div>
              <div className="flex justify-center gap-x-2 items-center mt-3">
                <span>{t("user.create-account")}</span>
                <a className="block" onClick={() => navigate("/register")}>
                  {t("user.signup")}
                </a>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
