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
import SearchBox from "../searchbox";
import Location from "../../location";
import { setPathName } from "../../../redux/slices/routeSlice";
import { useMedia } from "react-use";
import { isNotEmpty } from "../../../utils/utils";
import LanguageSwitch from "../../language-switch";
import { useTranslation } from "react-i18next";
const { USER_PROFILE_MENU } = AppConfig;
function Header(props) {
  const { currentUser, showSearchBox } = props;
  const { ROUTES } = AppConfig;
  const [current, setCurrent] = useState(currentUser);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useUserAuth();
  const isMobile = useMedia("(max-width: 767px)");
  console.log("mobile:", isMobile);
  function onLogout() {
    dispatch(logOutAccount());
    logOut();
    navigate("/");
    localStorage.clear();
  }
  useEffect(() => {
    if (isNotEmpty(user)) {
      setCurrent(user);
    }
  }, [user]);
  const menu = (
    <MenuList style={{ background: "white" }}>
      {USER_PROFILE_MENU.map((item, index) => (
        <div key={index}>
          <MenuItem
            key={index}
            className="mb-2"
            onClick={
              item.key === "logout"
                ? onLogout
                : () => {
                    dispatch(setPathName(window.location.pathname));
                    navigate(item?.link);
                  }
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{t(item.label)}</ListItemText>
          </MenuItem>

          <Divider style={{ width: "100%" }} />
        </div>
      ))}
    </MenuList>
  );
  return (
    <div className="header-container">
      <div className="w-[60%] flex gap-x-4 items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="brand-logo"
          onClick={() => navigate("/")}
        />
        {isMobile ? null : showSearchBox ? (
          <div className="flex items-center gap-x-2 w-full">
            <SearchBox placeholder={t("event.placeholder-searchbox")} />{" "}
            <Location />
          </div>
        ) : null}
      </div>
      <div className="header-auth">
        {!current ? (
          <>
            <a className="px-3" onClick={() => navigate(ROUTES.LOGIN)}>
              Đăng nhập
            </a>
            <LanguageSwitch />
          </>
        ) : isMobile ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              googleId={current.sub}
              src={current.avatar ?? placeholderImg}
              size="35"
              round={true}
              name={current.name}
              className="header-avatar"
            />
          </Dropdown>
        ) : (
          <div className="flex items-center gap-x-2">
            <RiBookmark3Fill className="text-2xl" />

            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                googleId={current.sub}
                src={current.avatar ?? placeholderImg}
                round={true}
                size={40}
                name={current.name}
                className="object-cover w-10 h-10 rounded-full ml-2.5 mr-3"
              />
            </Dropdown>
            <LanguageSwitch />
          </div>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  currentUser: PropTypes.object,
  showSearchBox: PropTypes.bool,
};
Header.defaultProps = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) ?? null,
  showSearchBox: true,
};
export default Header;
