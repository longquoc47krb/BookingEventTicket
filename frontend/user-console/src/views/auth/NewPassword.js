import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import { InputPassword } from "../../components/common/input/customField";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import ThreeDotsLoading from "../../components/loading/three-dots";
import { YupValidations } from "../../utils/validate";
import authServices from "../../api/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { emailSelector, setEmail } from "../../redux/slices/accountSlice";
import { useTranslation } from "react-i18next";
const { newPassword } = authServices;
function NewPassword() {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(emailSelector);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: YupValidations.password,
      confirmPassword: YupValidations.confirmPassword,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      const { password } = values;
      const response = await newPassword({ email, password });

      if (response.status === 200) {
        setLoading(false);
        AlertPopup({
          title: t("popup.changePassword.success"),
        });
        dispatch(setEmail(null));
        navigate("/login");
      } else {
        setLoading(false);
        dispatch(setEmail(null));
        AlertErrorPopup({
          title: t("popup.changePassword.error"),
        });
      }
    },
  });
  const { handleSubmit } = formik;
  return (
    <>
      <HelmetHeader title={t("pages.new-password")} content="New password" />
      <div className="auth-container">
        <img
          src={process.env.PUBLIC_URL + "logo-color.png"}
          alt="logo"
          className="brand-logo absolute top-5 left-5 w-[10vw] z-10"
          onClick={() => navigate("/")}
        />
        <LanguageSwitch className="absolute top-5 right-5 z-10" />
        <div className="auth-content">
          <FormikProvider value={formik}>
            <Form className="auth-form" onSubmit={handleSubmit}>
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
                <button className={"primary-button"} type="submit">
                  {loading ? <ThreeDotsLoading /> : t("submit")}
                </button>
              </Col>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
