/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import MenuList from "@mui/material/MenuList";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Dropdown } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import {
  logOutGoogle,
  userInfoSelector,
} from "../../../redux/slices/googleSlice";
const { USER_PROFILE_MENU } = AppConfig;
function Header(props) {
  const { currentUser } = props;
  const { ROUTES } = AppConfig;
  const [current, setCurrent] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  function onLogout() {
    dispatch(logOutGoogle());
    navigate("/");
    localStorage.clear();
  }
  useEffect(() => {
    setCurrent(userInfo);
  }, [userInfo]);
  console.log({ current });
  var wishList = [1, 3, 4, 5, 4];
  const menu = (
    <MenuList style={{ background: "white" }}>
      {USER_PROFILE_MENU.map((item, index) => (
        <>
          <MenuItem
            className="mb-2"
            onClick={
              item.key === "logout" ? onLogout : () => navigate(item?.link)
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>

          <Divider style={{ width: "100%" }} />
        </>
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
            {/* 
            <a className="px-3" onClick={() => navigate(ROUTES.EVENT.Detail)}>
              Đăng ký
            </a> */}
          </>
        ) : (
          <>
            <Badge badgeContent={wishList.length} color="error">
              <BookmarkIcon fontSize="medium" />
            </Badge>

            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                googleId={current.sub}
                src={current.picture}
                size="35"
                round={true}
                name={current.family_name}
                className="object-cover w-6 h-6 rounded-full ml-2.5 -mr-2.5 mr-3"
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
  currentUser: JSON.parse(localStorage.getItem("userInfo")) ?? null,
};
export default Header;
