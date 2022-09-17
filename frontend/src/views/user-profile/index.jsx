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
            padding: "2rem",
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
                style={{ border: "2px solid gray", padding: "0.5rem" }}
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </IconButton>
          <h1 className="font-bold text-xl">{user.fullName}</h1>
          <h2 className="font-medium text-sm">@{user.username}</h2>
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
    username: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
UserProfile.defaultProps = {
  user: {
    avatar:
      "data:image/jpeg;base64,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",
    username: "longquoc47krb",
    fullName: "Nguyen Quoc Long",
  },
};
export default UserProfile;
