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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/common/header";
import { Typography } from "antd";
import { Helmet } from "react-helmet";
function UserProfile(props) {
  const { user } = props;
  return (
    <>
      <Helmet>
        <title>Thông tin người dùng</title>
        <meta name="description" content="Profile page" />
      </Helmet>
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
                  name={user.name}
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
  }),
};
const mapStateToProps = (state) => ({
  user: {
    avatar: state.google.userInfo.picture,
    fullName: state.google.userInfo.name,
    email: state.google.userInfo.email,
  },
});
export default connect(mapStateToProps)(UserProfile);
