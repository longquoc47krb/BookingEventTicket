import { GoogleLogin } from "@react-oauth/google";
import { Col, Divider, Row, Select } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { FastField, Form, FormikProvider, useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/common/input/customField";
import { countryCode } from "../../components/country-code";
import HelmetHeader from "../../components/helmet";
import { authentication } from "../../configs/firebaseConfig";
import { YupValidator } from "../../helpers/validate";
import { setGoogleProfile } from "../../redux/slices/googleSlice";
const UserLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // login phone number
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "visible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          console.log(response, "-----------responss");
        },
        "expired-callback": (response) => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          console.log(response, "expired-callback-----");
        },
      },
      authentication
    );
  };

  const requestOTP = async (e) => {
    const code = document.querySelector(".country-Dropdown").value;
    console.log(code, "code");
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(
      authentication,
      `${code} ${values.phone}`,
      appVerifier
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        navigate("/loginotp", { state: { phoneNumber: values.phone } });
      })
      .catch((error) => {
        // window.location.reload();
        console.log(window.recaptchaVerifier, "----window.recaptchaVerifier");
        console.log(error, "error by firebase");
      });
  };

  const initialValues = {
    phone: "",
    otp: "",
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      phone: YupValidator.phone,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {},
  });
  const { values, handleSubmit } = formikLogin;
  return (
    <>
      <HelmetHeader title="Đăng nhập" content="Login" />
      <div className="login-container">
        <img
          src={process.env.PUBLIC_URL + "logo.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[300px]"
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
                <Col flex={1}>
                  <Select
                    showSearch
                    placeholder="Mã vùng"
                    optionFilterProp="children"
                    onChange={(value) => {
                      console.log(`selected ${value}`);
                    }}
                    onSearch={(value) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {countryCode.map((option, index) => (
                      <Select.Option
                        style={{ padding: "0.5rem", height: "100%" }}
                        value={option.dial_code}
                        key={index}
                      >
                        {option.dial_code}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col flex={4}>
                  <FastField component={Input} name="phone" width="100%" />
                </Col>
              </Row>
              <Col span={24}>
                <button className="w-full py-2 bg-[#256d85] text-white">
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
                    console.log(decoded);
                    dispatch(setGoogleProfile(decoded));
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
              <div id="recaptcha-container"></div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
