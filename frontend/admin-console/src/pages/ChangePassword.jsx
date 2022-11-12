import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authServices from "../api/services/authServices";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import Avatar from "../components/common/avatar";
import { InputPassword } from "../components/customField";
import ThreeDotsLoading from "../components/ThreeLoading";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { pathNameSelector } from "../redux/slices/routeSlice";
import { YupValidations } from "../utils/validate";
const { changePassword } = authServices;
function ChangePassword() {
  const user = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const previousPathname = useSelector(pathNameSelector);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const initialValues = {
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      password: YupValidations.password,
      confirmPassword: YupValidations.confirmPassword,
    }),
    onSubmit: async (values) => {
      const { id, email, currentPassword, password } = values;
      setLoading(true);
      const updatePassword = await changePassword(id, {
        currentPassword,
        email,
        newPassword: password,
      });
      showNotification(updatePassword.status === 200);
    },
  });
  const showNotification = (code) => {
    if (code) {
      setLoading(false);

      return AlertPopup({
        title: t("popup.changePassword.success"),
      });
    }
    setLoading(false);
    return AlertErrorPopup({
      title: t("popup.changePassword.error"),
    });
  };
  const { values, handleSubmit } = formik;
  return (
    <>
      <div className="flex items-center justify-center bg-white">
        <FormikProvider value={formik}>
          <Form
            style={{
              width: "100%",
              minHeight: "calc(100vh - 60px)",
              height: "100%",
              paddingLeft: 50,
              paddingRight: 50,
            }}
            onSubmit={handleSubmit}
          >
            <Row gutter={[48, 40]} className="leading-8">
              <Col span={24}>
                <div className="w-full flex justify-center my-2">
                  <Avatar
                    avatar={values.avatar}
                    style={{ width: "120px", height: "120px" }}
                  />
                </div>

                <Field
                  name="currentPassword"
                  component={InputPassword}
                  label={t("user.currentPassword")}
                />
                <Field
                  component={InputPassword}
                  label={t("user.newPassword")}
                  name="password"
                />
                <Field
                  component={InputPassword}
                  label={t("user.confirmPassword")}
                  name="confirmPassword"
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]}>
              <Col span={24}>
                <button className="primary-button" type="submit">
                  {loading ? <ThreeDotsLoading /> : t("submit")}
                </button>
              </Col>
            </Row>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
}
export default ChangePassword;
