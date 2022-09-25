import { GoogleLogin } from "@react-oauth/google";
import { Col, Divider, Modal, Row } from "antd";
import { Form, FormikProvider, useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import HelmetHeader from "../../components/helmet";
import { useUserAuth } from "../../context/UserAuthContext";
import { Role } from "../../helpers/role";
import { YupValidator } from "../../helpers/validate";
import { setAccountProfile } from "../../redux/slices/accountSlice";
import PhoneInput from "react-phone-number-input";
import OTPInput, { ResendOTP } from "otp-input-react";
const UserLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // login phone number
  const [phone, setPhone] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const getOtp = async (e) => {
    console.log("phone getOtp", values.phone);
    setFieldError("phone", "");
    try {
      const response = await setUpRecaptha(values.phone);
      setResult(response);
      setFieldError("phone", response);
      setFlag(true);
      console.log("flag", flag);
    } catch (err) {
      setFieldError("phone", err.message);
    }
  };

  const verifyOtp = async (e) => {
    setFieldError("otp", "");
    if (values.otp === "" || values.otp === null) return;
    try {
      await result.confirm(values.otp);
      console.log({ result });
      navigate("/");
    } catch (err) {
      setFieldError("otp", err.message);
    }
  };
  const initialValues = {
    phone: "",
    otp: null,
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      phone: YupValidator.phone,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (values.phone && !values.otp) {
        getOtp();
      }
      if (values.otp) {
        verifyOtp();
      }
    },
  });
  const { values, handleSubmit, setFieldError, handleBlur } = formikLogin;
  console.log("formik values", values);
  return (
    <>
      <HelmetHeader title="Đăng nhập" content="Login" />
      <div className="login-container">
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[200px]"
          onClick={() => navigate("/")}
        />
        <div className="login-content">
          <FormikProvider value={formikLogin}>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Row className="leading-8">
                <h1 className="login-title mb-2 pl-[5px]">Đăng nhập</h1>
              </Row>
              <Row
                align="middle"
                style={{
                  height: "auto",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <Col flex={4}>
                  <h1 className="font-medium text-black text-lg mb-2">
                    Số điện thoại
                  </h1>
                  <PhoneInput
                    defaultCountry="VN"
                    value={values.phone}
                    key="phone"
                    onChange={(value) =>
                      formikLogin.setFieldValue("phone", value)
                    }
                    onBlur={handleBlur}
                    style={{
                      border: "2px solid darkgray",
                      padding: 8,
                      borderRadius: 5,
                      marginBottom: 16,
                    }}
                    placeholder="Enter Phone Number"
                  />
                  <div id="recaptcha-container"></div>
                </Col>
              </Row>
              <Col span={24}>
                <button
                  className="w-full py-2 bg-[#256d85] text-white"
                  type="submit"
                >
                  Gửi mã OTP
                </button>
              </Col>
              <Divider style={{ color: "black", border: "gray" }}>
                hoặc đăng nhập bằng Google
              </Divider>
              <div className="flex justify-center">
                <GoogleLogin
                  shape="circle"
                  size="large"
                  width="100%"
                  onSuccess={(credentialResponse) => {
                    console.log({ credentialResponse });
                    var decoded = jwt_decode(credentialResponse.credential);
                    decoded["role"] = Role.User;
                    console.log({ decoded });
                    dispatch(setAccountProfile(decoded));
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(decoded)
                    );
                    navigate("/");
                  }}
                  onError={() => {
                    alert("Login Failed");
                  }}
                />
              </div>
              <Modal
                open={flag}
                title="Xác nhận mã OTP"
                onOk={handleSubmit}
                closable={false}
                onCancel={() => setFlag(!flag)}
              >
                <Form onSubmit={handleSubmit}>
                  <Col span={12}>
                    <>
                      <OTPInput
                        inputClassName="otp-input"
                        value={values.otp}
                        onChange={(value) =>
                          formikLogin.setFieldValue("otp", value)
                        }
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        secure={false}
                      />
                      <ResendOTP
                        onResendClick={() => console.log("Resend clicked")}
                      />
                    </>
                  </Col>
                </Form>
              </Modal>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
