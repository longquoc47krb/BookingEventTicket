import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Col, Form, Row, Typography } from "antd";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/common/input/customField";
import UploadAvatar from "../../components/common/upload-avatar";
import HelmetHeader from "../../components/helmet";
import LanguageSwitch from "../../components/language-switch";
import {
  setEmail,
  userAvatarSelector,
  userInfoSelector,
} from "../../redux/slices/accountSlice";
import { pathNameSelector } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
import { isEmpty, isNotEmpty } from "../../utils/utils";
import { YupValidations } from "../../utils/validate";
function UserProfile() {
  const user = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const previousPathname = useSelector(pathNameSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const avatar = useSelector(userAvatarSelector);

  console.log({ avatar });
  useEffect(() => {
    if (isNotEmpty(user)) {
      dispatch(setEmail(user.email));
    }
  }, []);
  const initialValues = {
    avatar: user?.avatar,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      email: YupValidations.email,
      phone: YupValidations.phone,
    }),
    onSubmit: (values) => {
      const { name, email, phone } = values;
    },
  });
  const { values } = formik;
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
              >
                <Row gutter={[48, 40]} className="leading-8">
                  <Col span={24}>
                    <div className="w-full flex justify-center my-2">
                      <UploadAvatar avatar={values.avatar} />
                    </div>

                    <Field
                      name="name"
                      component={Input}
                      label={t("user.name")}
                    />
                    <Field component={Input} label="Email" name="email" />
                    <Field
                      component={Input}
                      label={t("user.phone")}
                      name="phone"
                      disabled={isEmpty(values.phone) ? false : true}
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 40]}>
                  <Col span={24}>
                    <button
                      className="w-full py-2 bg-[#256d85] text-white"
                      // onClick={() =>}
                    >
                      {t("submit")}
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
// UserProfile.propTypes = {
//   user: PropTypes.shape({
//     avatar: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     phone: PropTypes.string,
//   }),
// };
export default UserProfile;
// const mapStateToProps = (state) => ({
//   user: {
//     avatar: state.account.userInfo.avatar ?? "",
//     name: state.account.userInfo.name ?? "Chưa đặt tên",
//     email: state.account.userInfo.gmail ?? "",
//     phone: state.account.userInfo.phone ?? "",
//   },
// });
// export default connect(mapStateToProps)((props) => (
//   <UserAuthContextProvider>
//     {({ user }) => <UserProfile {...props} user={user} />}
//   </UserAuthContextProvider>
// ));
