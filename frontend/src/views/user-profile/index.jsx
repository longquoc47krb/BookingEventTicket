import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Col, Form, Row, Typography } from "antd";
import { Field, FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import Header from "../../components/common/header";
import { Input } from "../../components/common/input/customField";
import UploadImage from "../../components/common/upload-image";
import HelmetHeader from "../../components/helmet";
import theme from "../../shared/theme";
import { YupValidations } from "../../utils/validate";
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
      fullName: YupValidations.name,
      email: YupValidations.email,
    }),
    onSubmit: (values) => {},
  });
  // const { setValues, setFieldValue, values, errors } = formik;
  return (
    <>
      <HelmetHeader
        title={user.fullName ?? "Thong tin nguoi dung"}
        content="User Profile"
      />
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
            <UploadImage avatar={user.avatar} />
            {/* <Avatar avatar={user.avatar} /> */}
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
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};
const mapStateToProps = (state) => ({
  user: {
    avatar: state.account.userInfo.avatar ?? null,
    fullName: state.account.userInfo.name ?? "Chưa đặt tên",
    email: state.account.userInfo.gmail ?? null,
    phone: state.account.userInfo.phone ?? null,
  },
});
export default connect(mapStateToProps)(UserProfile);
