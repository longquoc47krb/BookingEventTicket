/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import MenuList from "@mui/material/MenuList";
import { Dropdown } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { RiBookmark3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import {
  logOutAccount,
  userInfoSelector,
} from "../../../redux/slices/accountSlice";
import Avatar from "../avatar";
const { USER_PROFILE_MENU } = AppConfig;
function Header(props) {
  const { currentUser } = props;
  const { ROUTES } = AppConfig;
  const [current, setCurrent] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  function onLogout() {
    dispatch(logOutAccount());
    navigate("/");
    localStorage.clear();
  }
  useEffect(() => {
    setCurrent(userInfo);
  }, [userInfo]);
  console.log({ current });
  const menu = (
    <MenuList style={{ background: "white" }}>
      {USER_PROFILE_MENU.map((item, index) => (
        <div key={index}>
          <MenuItem
            key={index}
            className="mb-2"
            onClick={
              item.key === "logout" ? onLogout : () => navigate(item?.link)
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>

          <Divider style={{ width: "100%" }} />
        </div>
      ))}
    </MenuList>
  );
  return (
    <div className="header-container">
      <img
        src="/logo.png"
        alt="logo"
        className="brand-logo"
        onClick={() => navigate("/")}
      />
      <div className="header-auth">
        {!current ? (
          <>
            <a className=" px-3" onClick={() => navigate(ROUTES.LOGIN)}>
              Đăng nhập
            </a>
          </>
        ) : (
          <>
            <Badge
              badgeContent={100}
              color="error"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiBookmark3Fill className="text-2xl" />
            </Badge>

            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                className="w-8 h-8 ml-2.5 mr-3 cursor-pointer"
                avatar={current.picture}
              />
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  currentUser: PropTypes.object,
};
Header.defaultProps = {
  // currentUser: JSON.parse(localStorage.getItem("userInfo")) ?? null,
};
export default Header;
