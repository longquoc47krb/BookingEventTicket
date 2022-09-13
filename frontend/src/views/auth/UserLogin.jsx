import { Col, Divider, Row } from "antd";
import { FastField, Form, FormikProvider, useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../components/common/button";
import { Input } from "../../components/common/input/customField";
import GoogleLogin from "../../components/google-button";
import { YupValidator } from "../../helpers/validate";
const UserLogin = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [confirmResult, setConfirmResult] = useState("");
  // const [verficationCode, setVerificationCode] = useState("");
  // const [userId, setUserId] = useState("");
  // const [isSend, setIsSend] = useState(false);
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
  const initialValues = {
    phone: "",
    otp: "",
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      phone: YupValidator.phone,
    }),
    onSubmit: async (values) => {},
  });
  const { values, handleSubmit } = formikLogin;
  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Login page" />
      </Helmet>
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
              <Row gutter={16} className="leading-8">
                <h1 className="login-title mb-2 pl-[5px]">Đăng nhập</h1>
                <Col span={24}>
                  <FastField
                    component={Input}
                    label="Số Điện Thoại"
                    name="phone"
                  />
                </Col>
              </Row>
              <Button>Gửi mã OTP</Button>
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
