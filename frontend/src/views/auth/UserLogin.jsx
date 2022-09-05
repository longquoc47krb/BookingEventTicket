import { Col, Divider, Row } from "antd";
import { FastField, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/common/input/customField";
import GoogleLogin from "../../components/google-button";
import { validateLoginForm } from "../../helpers/validate";
const UserLogin = () => {
  const initialValues = {
    phone: "",
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {},
  });
  const { handleSubmit } = formikLogin;
  return (
    <>
      <div className="login-container">
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
              <button type="submit">Đăng nhập</button>
              <Divider style={{ color: "black", border: "gray" }}>
                hoặc đăng nhập bằng Google
              </Divider>
              <GoogleLogin />
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
