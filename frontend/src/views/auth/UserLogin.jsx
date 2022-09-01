import React from "react";
import { Col, Row, Divider } from "antd";
import { FastField, FormikProvider, useFormik, Form } from "formik";
import { validateLoginForm } from "../../helpers/validate";
import {
  Input,
  InputPassword,
} from "../../components/common/input/customField";
import { GoogleLogin } from "react-google-login";
const UserLogin = () => {
  const initialValues = {
    phone: "",
  };
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {},
  });
  const responseGoogle = (response) => {
    console.log(response);
  };
  const { handleSubmit } = formikLogin;
  return (
    <div className='login-container'>
      <div className='login-content'>
        <FormikProvider value={formikLogin}>
          <Form className='login-form' onSubmit={handleSubmit}>
            <Row gutter={16} className='leading-8'>
              <h1 className='login-title mb-2 pl-[5px]'>Đăng nhập</h1>
              <Col span={24}>
                <FastField
                  component={Input}
                  label='Số Điện Thoại'
                  name='phone'
                />
              </Col>
            </Row>
            <button>Đăng nhập</button>
            <Divider style={{ color: "white", border: "gray" }}>
              hoặc đăng nhập bằng Google
            </Divider>
            <GoogleLogin
              className='login-google'
              clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
              buttonText='Log in with Google'
              style={{ fontWeight: 700, textAlign: "center" }}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default UserLogin;
