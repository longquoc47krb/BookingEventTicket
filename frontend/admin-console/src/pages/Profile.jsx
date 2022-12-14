/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../api/services/accountServices";
import organizationServices from "../api/services/organizationServices";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import UploadAvatar from "../components/common/upload-avatar";
import { Input, Select } from "../components/customField";
import ThreeDotsLoading from "../components/ThreeLoading";
import {
  roleSelector,
  setEmail,
  setUserProfile,
  userAvatarSelector,
  userInfoSelector,
} from "../redux/slices/accountSlice";
import { pathNameSelector } from "../redux/slices/routeSlice";
import { ROLE } from "../utils/constants";
import { provinces } from "../utils/provinces";
import { isEmpty, isNotEmpty } from "../utils/utils";
import { YupValidations } from "../utils/validate";
import Editor from "./Editor";
const { updateAccount } = accountServices;
const { updateBioAndAddress, findOrganizerById } = organizationServices;
function UserProfile() {
  const user = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const previousPathname = useSelector(pathNameSelector);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const avatar = useSelector(userAvatarSelector);
  const role = useSelector(roleSelector);
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
    biography: user?.biography ?? "",
    province: user?.province ?? "",
    venue: user?.venue ?? "",
    address: user?.address ?? "",
  };
  const organizationSchema = {
    name: YupValidations.name,
    email: YupValidations.email,
    phone: YupValidations.phone,
    biography: YupValidations.description,
    province: YupValidations.province_profile,
    venue: YupValidations.venue_profile,
    address: YupValidations.address_profile,
  };
  const adminSchema = {
    name: YupValidations.name,
    email: YupValidations.email,
    phone: YupValidations.phone,
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(
      role === "ROLE_ADMIN" ? adminSchema : organizationSchema
    ),
    onSubmit: async (values) => {
      const { id, name, phone, email, biography, address, province, venue } =
        values;
      setLoading(true);

      const updateBioAndAddressRes = await updateBioAndAddress(id, {
        address,
        biography,
        province,
        venue,
      });
      const updateAccountResponse = await updateAccount(id, { name, phone });
      const userInfo = await findOrganizerById(id);
      if (userInfo.status === 200) {
        dispatch(setUserProfile(userInfo.data));
      }
      setLoading(false);
      showNotification(
        updateBioAndAddressRes.status === 200 ||
          updateAccountResponse.status === 200
      );
    },
  });
  const showNotification = (code) => {
    if (code) {
      AlertPopup({
        title: t("popup.update-account.account.200"),
      });
    } else {
      AlertErrorPopup({
        title: t("popup.update-account.account.400"),
      });
    }
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
                    {role === ROLE.Organizer ? (
                      <UploadAvatar avatar={values.avatar} />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        alt="logo"
                        className="h-auto w-[200px] object-cover "
                      />
                    )}
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
                  {role !== "ROLE_ADMIN" && (
                    <div>
                      <Row gutter={[8, 40]} style={{ lineHeight: "2rem" }}>
                        <Col span={12}>
                          <Field
                            name="province"
                            component={Select}
                            label={t("event.province")}
                            options={Object.values(provinces).map((field) => ({
                              value: field.name,
                              name: field.name,
                            }))}
                          />
                        </Col>
                        <Col span={12}>
                          <Field
                            name="venue"
                            component={Input}
                            label={t("event.venue")}
                          />
                        </Col>
                      </Row>
                      <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
                        <Col span={24}>
                          <Field
                            name="address"
                            component={Input}
                            label={t("event.venue_address")}
                          />
                        </Col>
                      </Row>
                      <Editor name="biography" label={t("user.biography")} />
                    </div>
                  )}
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
