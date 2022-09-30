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
import Avatar from "react-avatar";
import { RiBookmark3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import placeholderImg from "../../../assets/fallback-avatar.png";
import {
  logOutAccount,
  userInfoSelector,
} from "../../../redux/slices/accountSlice";
import { useUserAuth } from "../../../context/UserAuthContext";
import Search from "../searchbox";
const { USER_PROFILE_MENU } = AppConfig;
function Header(props) {
  const { currentUser } = props;
  const { ROUTES } = AppConfig;
  const [current, setCurrent] = useState(currentUser);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  function onLogout() {
    dispatch(logOutAccount());
    logOut();
    navigate("/");
    localStorage.clear();
  }
  useEffect(() => {
    setCurrent(userInfo);
  }, [userInfo]);
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
                googleId={current.sub}
                src={current.avatar ?? placeholderImg}
                size="35"
                round={true}
                name={current.name}
                className="object-cover w-6 h-6 rounded-full ml-2.5 mr-3"
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
  currentUser: JSON.parse(localStorage.getItem("currentUser")) ?? null,
};
export default Header;
