/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../api/services/accountServices";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import UploadAvatar from "../components/common/upload-avatar";
import { Input } from "../components/customField";
import ThreeDotsLoading from "../components/ThreeLoading";
import {
  setEmail,
  setUserProfile,
  userAvatarSelector,
  userInfoSelector,
} from "../redux/slices/accountSlice";
import { pathNameSelector } from "../redux/slices/routeSlice";
import { isEmpty, isNotEmpty } from "../utils/utils";
import { YupValidations } from "../utils/validate";
const { updateAvatar, updateAccount, findUserById } = accountServices;
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
      let updateAvatarResponse;
      if (avatar) {
        updateAvatarResponse = await updateAvatar(id, avatar);
      }
      const updateAccountResponse = await updateAccount(id, { name, phone });
      const userInfo = await findUserById(id);
      if (userInfo.status === 200) {
        dispatch(setUserProfile(userInfo.data));
      }
      showNotification(
        updateAvatarResponse.status === 200 ||
          updateAccountResponse.status === 200
      );
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
      <div>
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
              <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
                <Col span={24}>
                  <div className="w-full flex justify-center my-2">
                    <UploadAvatar avatar={values.avatar} />
                  </div>

                  <Field name="name" component={Input} label={t("user.name")} />
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
        </div>
      </div>
    </>
  );
}
export default UserProfile;
