/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import * as Yup from "yup";
import Countdown from "react-countdown";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { YupValidations } from "../../utils/validate";
import { Col, Row } from "antd";
import { Input } from "../../components/common/input/customField";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
// import OtpInput from "../../components/common/otp";
import OtpInput from "react-otp-input";
import authServices from "../../api/services/authServices";
import { FALSE } from "node-sass";
const { forgotPassword, verifyOTP } = authServices;
function ForgotPassword() {
  const { t } = useTranslation();
  const [forgotPasswordParam, setForgotPasswordParam] = useSearchParams();
  console.log({ forgotPasswordParam });
  const navigate = useNavigate();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [email, setEmail] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: YupValidations.email,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { email } = values;
      setEmail(email);
      const response = await forgotPassword({ email });
      console.log({ response });
      if (response.status === 404) {
        AlertErrorPopup({
          title: t("status.forgot.404"),
        });
      }
      if (response.status === 200) {
        setShowOTPInput(true);
        AlertPopup({
          title: t("popup.email.title"),
          text: t("popup.email.content"),
          timer: 3000,
        });
      }
    },
  });
  const formikOTP = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: YupValidations.otp,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { otp } = values;
      console.log({ email });
      const response = await verifyOTP({ email, otpCode: otp });
      console.log({ response });
      if (response.status === 200) {
        navigate("/forgot-password?newPassword=true");
      } else {
        AlertErrorPopup({
          title: t("status.verify.404"),
        });
      }
    },
  });
  const { handleSubmit } = formik;
  const { handleSubmit: handleSubmitOTP } = formikOTP;

  // Random component
  const Completionist = () => <span>You are good to go!</span>;
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  console.log("otp:", formikOTP.values.otp);
  return (
    <>
      <HelmetHeader title={t("pages.forgot-password")} content="Login" />
      <div className="auth-container">
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[10vw] z-10"
          onClick={() => navigate("/")}
        />
        <LanguageSwitch className="absolute top-5 right-5 z-10" />
        <div className="auth-content">
          <FormikProvider value={showOTPInput ? formikOTP : formik}>
            <Form
              className="auth-form"
              onSubmit={showOTPInput ? handleSubmitOTP : handleSubmit}
            >
              <Row className="leading-8">
                <h1 className="auth-title mb-2">{t("user.forgot-password")}</h1>
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
                {!showOTPInput ? (
                  <Col flex={4} className="relative">
                    <AiOutlineQuestionCircle
                      className="absolute top-[7px] left-[3.5rem]"
                      data-toggle="tooltip"
                      data-placement="right"
                      title={t("user.forgot-password-tip")}
                    />
                    <Field component={Input} name="email" label={"Email"} />
                  </Col>
                ) : (
                  <Col flex={4} className="relative">
                    <OtpInput
                      value={formikOTP.values.otp}
                      onChange={(value) =>
                        formikOTP.setFieldValue("otp", value)
                      }
                      numInputs={6}
                      isInputNum
                      name="otp"
                      shouldAutoFocus
                      onBlur={formikOTP.handleBlur}
                      separator={<span>&nbsp;</span>}
                      containerStyle="otp-modal__input-container"
                      inputStyle="otp-modal__input"
                    />
                    <p className="error-message">
                      <ErrorMessage name="otp" />
                    </p>
                  </Col>
                )}
              </Row>
              <Col span={24}>
                <button className={"primary-button"} type="submit">
                  {t("submit")}
                </button>
              </Col>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
