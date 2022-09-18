import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import React from "react";
import theme from "../../shared/theme";
import { AppConfig } from "../../configs/AppConfig";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const { USER_PROFILE_MENU } = AppConfig;
function UserProfile(props) {
  const { user } = props;
  return (
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
            height: "auto",
            width: "auto",
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
                  width: "100px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
                className="object-cover rounded-full ml-2.5 -mr-2.5"
              />
            </Badge>
          </IconButton>
          <h1 className="font-bold text-xl">{user.fullName}</h1>
          <Divider style={{ width: "100%", background: "black" }} />
          <MenuList>
            {USER_PROFILE_MENU.map((item, index) => (
              <>
                <MenuItem className="mb-2">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
                <Divider style={{ width: "100%" }} />
              </>
            ))}
          </MenuList>
        </Paper>
      </Box>
    </div>
  );
}
UserProfile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
const mapStateToProps = (state) => ({
  user: {
    avatar: state.google.userInfo.picture,
    fullName: state.google.userInfo.name,
  },
});
export default connect(mapStateToProps)(UserProfile);
