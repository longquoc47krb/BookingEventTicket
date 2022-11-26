/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Col, Row, Typography } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../../api/services/accountServices";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import { Input } from "../../components/common/input/customField";
import UploadAvatar from "../../components/common/upload-avatar";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import ThreeDotsLoading from "../../components/loading/three-dots";
import {
  setEmail,
  userAvatarSelector,
  userInfoSelector,
} from "../../redux/slices/accountSlice";
import { pathNameSelector } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
import { isEmpty, isNotEmpty } from "../../utils/utils";
import { YupValidations } from "../../utils/validate";
const { updateAvatar, updateAccount } = accountServices;
function UserProfile() {
  const user = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const previousPathname = useSelector(pathNameSelector);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const avatar = useSelector(userAvatarSelector);

  useEffect(() => {
    if (isNotEmpty(user)) {
      dispatch(setEmail(user.email));
    }
  }, []);
  const initialValues = {
    id: user?.id,
    avatar: user?.avatar,
    name: user?.name,
    email: user?.email,
    phone: user?.phone ?? null,
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      email: YupValidations.email,
      phone: YupValidations.phone,
    }),
    onSubmit: async (values) => {
      const { id, name, phone } = values;
      setLoading(true);
      if (avatar) {
        var updateAvatarResponse = await updateAvatar(id, avatar);
      }
      var updateAccountResponse = await updateAccount(id, { name, phone });

      setLoading(false);
      showNotification(
        updateAvatarResponse.status === 200 ||
          updateAccountResponse.status === 200
      );
    },
  });
  const showNotification = (code) => {
    if (code) {
      return AlertPopup({
        title: t("popup.update-account.account.200"),
      });
    }
    return AlertErrorPopup({
      title: t("popup.update-account.account.400"),
    });
  };
  const { values, handleSubmit } = formik;
  return (
    <>
      <HelmetHeader title={t("user.profile")} content="User Profile" />
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
              {t("user.profile")}
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
                <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
                  <Col span={24}>
                    <div className="w-full flex justify-center my-2">
                      <UploadAvatar avatar={values.avatar} />
                    </div>

                    <Field
                      name="name"
                      component={Input}
                      label={t("user.name")}
                    />
                    <Field
                      component={Input}
                      label="Email"
                      name="email"
                      disabled={isEmpty(initialValues.email) ? false : true}
                    />
                    <Field
                      component={Input}
                      label={t("user.phone")}
                      name="phone"
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 40]} style={{ marginTop: "1rem" }}>
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
export default UserProfile;
