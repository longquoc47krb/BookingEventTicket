import { GoogleLogin } from "@react-oauth/google";
import { Col, Divider, Row } from "antd";
import { FastField, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Input,
  InputPassword,
} from "../../components/common/input/customField";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import theme from "../../shared/theme";
import { YupValidations } from "../../utils/validate";
const UserLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    onSubmit: async (values) => {},
  });
  const { values, handleSubmit, setFieldError, handleBlur } = formikLogin;

  return (
    <>
      <HelmetHeader title={t("pages.login")} content="Login" />
      <div className="login-container">
        <div className="login-background-slide"></div>
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[200px]"
          onClick={() => navigate("/")}
        />
        <LanguageSwitch className="absolute top-5 right-5" />
        <div className="login-content">
          <FormikProvider value={formikLogin}>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Row className="leading-8">
                <h1 className="login-title mb-2 pl-[5px]">
                  {t("pages.login")}
                </h1>
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
                  <FastField component={Input} name="email" label="Email" />
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
                  <FastField
                    component={InputPassword}
                    name="password"
                    label="Password"
                  />
                </Col>
              </Row>
              <Col span={24}>
                <button
                  className={`w-full py-2 bg-[${theme.main}] text-white`}
                  type="submit"
                >
                  {t("pages.login")}
                </button>
              </Col>
              <Divider style={{ color: "black", border: "gray" }}>
                {t("user.login-by-google")}
              </Divider>
              <div className="flex justify-center">
                <GoogleLogin
                  shape="circle"
                  size="large"
                  width="100%"
                  onSuccess={(credentialResponse) => {
                    // var decoded = jwt_decode(credentialResponse.credential);
                    // decoded["role"] = Role.User;
                    // dispatch(getAccountByEmailOrPhone(decoded.email));
                    // const isDuplicated = includes(queriedUser, decoded.email);
                    // if (!isDuplicated) {
                    //   dispatch(
                    //     createAccount({
                    //       avatar: decoded.picture,
                    //       gmail: decoded.email,
                    //       name: decoded.name,
                    //     })
                    //   );
                    //   navigate("/");
                    // } else {
                    //   alert("email bị trùng");
                    // }
                  }}
                  onError={() => {
                    alert("Login Failed");
                  }}
                />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
