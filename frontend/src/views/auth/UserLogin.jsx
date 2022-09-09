import { Col, Divider, Row } from "antd";
import jwt_decode from "jwt-decode";
import { FastField, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/common/input/customField";
import GoogleLogin from "../../components/google-button";
import { validateLoginForm } from "../../helpers/validate";
import { Authentication } from "../../configs/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmResult, setConfirmResult] = useState("");
  const [verficationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState("");
  const [isSend, setIsSend] = useState(false);
  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        // other options
      }
    );
  }, []);
  const navigate = useNavigate();
  const handleGoogleSignIn = async ({ credential }) => {
    const profileObj = jwt_decode(credential);
    localStorage.setItem("user", JSON.stringify(profileObj));
    const { name, sub: googleId, picture: imageUrl } = profileObj;
    const user = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    console.log({ user });
    navigate("/");
  };
  const requestOTP = () => {
    console.log("values", values.phone.length);
    if (values.phone.length === 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(Authentication, phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      Authentication
    );
  };
  const verifyOtp = (e) => {
    e.preventDefault();
    const code = `${values.otp}`;
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        alert("Sign In Successfully!");
        setOtp("");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  const initialValues = {
    phone: phone,
    otp: otp,
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      console.log(values.phone);
      generateRecaptcha();
      const phoneNumber = `+84 ${values.phone}`;
      let appVerifier = window.recaptchaVerifier;
      setPhone("");
      signInWithPhoneNumber(Authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const { values, handleSubmit } = formikLogin;
  return (
    <>
      <div className="login-container">
        <p
          className="website-logo website-logo-login absolute top-5 left-5"
          onClick={() => navigate("/")}
        ></p>
        <div className="login-content">
          <FormikProvider value={formikLogin}>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Row gutter={16} className="leading-8">
                <h1 className="login-title mb-2 pl-[5px]">Đăng nhập</h1>
                <Col span={24}>
                  <FastField
                    component={Input}
                    label="Số Điện Thoại"
                    name="phone"
                  />
                </Col>
                {expandForm === true ? (
                  <Col span={24}>
                    <FastField component={Input} label="OTP" name="otp" />
                  </Col>
                ) : null}
                {expandForm === false ? (
                  <Col span={24}>
                    <button type="submit">Gửi mã OTP</button>
                  </Col>
                ) : null}
              </Row>

              <Divider style={{ color: "black", border: "gray" }}>
                hoặc đăng nhập bằng Google
              </Divider>
              <div className="flex justify-center">
                <GoogleLogin onGoogleSignIn={handleGoogleSignIn} />
              </div>
              <div id="recaptcha-container"></div>
              <Link to="/forget-password">
                <span className="login-form-forget-password">
                  Quên mật khẩu?
                </span>
              </Link>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
