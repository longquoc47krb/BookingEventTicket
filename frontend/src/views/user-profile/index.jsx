import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import React from "react";
import theme from "../../shared/theme";
import { AppConfig } from "../../configs/AppConfig";
import { FastField, Field, FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/common/header";
import { Col, Form, Row, Typography } from "antd";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { YupValidator } from "../../helpers/validate";
import { Input } from "../../components/common/input/customField";
import { useState } from "react";
import HelmetHeader from "../../components/helmet";
function UserProfile(props) {
  const { user } = props;
  const [isEditting, setIsEditing] = useState(false);
  const initialValues = {
    id: user?.id ?? "",
    avatar: user?.avatar,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      fullName: YupValidator.fullName,
      email: YupValidator.email,
    }),
    onSubmit: (values) => {},
  });
  const { setValues, setFieldValue, values, errors } = formik;
  return (
    <>
      <HelmetHeader title={user.fullName} content="User Profile" />
      <Header />
      <div className="user-profile-container">
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={2}
            style={{
              height: "90vh",
              width: "20vw",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <CameraAltRoundedIcon
                    fontSize="medium"
                    style={{
                      background: theme.main,
                      width: 25,
                      height: 25,
                      color: "white",
                      padding: 5,
                      borderRadius: 50,
                      cursor: "pointer",
                    }}
                  />
                }
              >
                <Avatar
                  src={user.avatar}
                  size="35"
                  round={true}
                  name={user.fullName}
                  style={{
                    width: "150px",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                  className="object-cover rounded-full ml-2.5 -mr-2.5"
                />
              </Badge>
            </IconButton>
            <h1 className="font-bold text-2xl">{user.fullName}</h1>
            <h2 className="font-medium text-gray-500 text-[14px]">
              {user.email}
            </h2>
            <Divider style={{ width: "100%", background: "black" }} />
          </Paper>
          <Paper
            elevation={2}
            style={{
              height: "90vh",
              width: "70vw",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginLeft: "1px",
            }}
          >
            <Typography
              className="font-bold text-3xl"
              style={{ color: theme.main }}
            >
              Thông tin người dùng
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
                    <Field
                      name="fullName"
                      component={Input}
                      label="Họ và tên"
                      disabled={isEditting ? false : true}
                    />
                    <Field
                      component={Input}
                      label="Email"
                      name="email"
                      disabled={isEditting ? false : true}
                    />
                    <Field
                      component={Input}
                      label="Số điện thoại"
                      name="phone"
                      disabled={isEditting ? false : true}
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 40]}>
                  <Col span={8}>
                    {isEditting ? (
                      <div className="flex items-center gap-x-2">
                        <button
                          className="w-24 py-[7px] bg-white text-[#256d85] border-[#256d85] border-[1px]"
                          onClick={() => setIsEditing(false)}
                        >
                          Huỷ
                        </button>
                        <button className="w-24 py-2 bg-[#256d85] text-white">
                          Cập nhật
                        </button>
                      </div>
                    ) : (
                      <button
                        className="w-24 py-2 bg-[#256d85] text-white"
                        onClick={() => setIsEditing(true)}
                      >
                        Chỉnh sửa
                      </button>
                    )}
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
UserProfile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};
const mapStateToProps = (state) => ({
  user: {
    avatar: state.google.userInfo.picture,
    fullName: state.google.userInfo.name,
    email: state.google.userInfo.email,
    phone: "",
  },
});
export default connect(mapStateToProps)(UserProfile);
