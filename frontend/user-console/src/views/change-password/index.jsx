import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Col, Row, Typography } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authServices from "../../api/services/authServices";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import Avatar from "../../components/common/avatar";
import { InputPassword } from "../../components/common/input/customField";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import ThreeDotsLoading from "../../components/loading/three-dots";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { pathNameSelector } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
import { YupValidations } from "../../utils/validate";
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
    newPassword: "",
    confirmPassword: "",
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      newPassword: YupValidations.password,
      confirmPassword: YupValidations.confirmPassword,
    }),
    onSubmit: async (values) => {
      const { id, email, currentPassword, newPassword } = values;
      setLoading(true);
      const updatePassword = await changePassword(id, {
        currentPassword,
        email,
        newPassword,
      });
      showNotification(updatePassword.status === 200);
    },
  });
  const showNotification = (code) => {
    if (code) {
      setLoading(false);

      return AlertPopup({
        title: t("popup.update-account.account.200"),
      });
    }
    setLoading(false);
    return AlertErrorPopup({
      title: t("popup.update-account.account.400"),
    });
  };
  const { values, handleSubmit } = formik;
  return (
    <>
      <HelmetHeader title={t("user.changePassword")} content="User Profile" />
      <div className="user-profile-container">
        <LanguageSwitch className="absolute top-5 right-5" />
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper elevation={2} className="profile">
            <BiX
              fontSize={30}
              className="absolute top-3 left-3 cursor-pointer"
              onClick={() => navigate(previousPathname)}
            />
            <Typography
              className="font-bold text-3xl"
              style={{ color: theme.main }}
            >
              {t("user.changePassword")}
            </Typography>
            <FormikProvider value={formik}>
              <Form
                style={{
                  width: "100%",
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
                      name="newPassword"
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
          </Paper>
        </Box>
      </div>
    </>
  );
}
// ChangePassword.propTypes = {
//   user: PropTypes.shape({
//     avatar: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     phone: PropTypes.string,
//   }),
// };
export default ChangePassword;
