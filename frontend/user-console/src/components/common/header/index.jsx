/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Dropdown, Empty, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import Badge from "../badge";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { GrMore } from "react-icons/gr";
import { RiBookmark3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import placeholderImg from "../../../assets/fallback-avatar.png";
import AppConfig from "../../../configs/AppConfig";
import { useUserActionContext } from "../../../context/UserActionContext";
import { useUserAuth } from "../../../context/UserAuthContext";
import {
  logOutAccount,
  setUserProfile,
  userInfoSelector,
} from "../../../redux/slices/accountSlice";
import { setPathName } from "../../../redux/slices/routeSlice";
import theme from "../../../shared/theme";
import { isNotEmpty } from "../../../utils/utils";
import LanguageSwitch from "../../language-switch";
import SearchBox from "../searchbox";
import WishListItem from "../wishlist-item";
import { useFetchEvents } from "../../../api/services/eventServices";
import accountServices from "../../../api/services/accountServices";
import UserProfile from "../../profile-popup";
const { USER_PROFILE_MENU } = AppConfig;
const { findUser } = accountServices;
function Header(props) {
  const { showSearchBox } = props;
  const { ROUTES } = AppConfig;
  const { wishlist, clearWishlist } = useUserActionContext();
  const { data: allEvents, status: allEventsStatus } = useFetchEvents();
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const isMobile = useMedia("(max-width: 767px)");
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  function onLogout() {
    dispatch(logOutAccount());
    localStorage.removeItem("userWishlist");
    logOut();
  }
  useEffect(() => {
    const fetchUserInfor = async () => {
      const response = await findUser(user.email);
      return response.status === 200 && dispatch(setUserProfile(response.data));
    };
    fetchUserInfor();
  }, []);
  const menu = (
    <MenuList
      style={{
        background: "white",
        width: "auto",
      }}
      className="shadow-lg"
    >
      {USER_PROFILE_MENU.map((item, index) => (
        <div key={index}>
          <MenuItem
            key={index}
            className="mb-2"
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
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
  const wishListMenu = (
    <div className="shadow-md">
      <MenuList style={{ background: "white" }}>
        <h1 className="font-bold text-xl px-3 flex justify-center ">
          {t("user.wishlist")}
        </h1>
        <hr style={{ width: "100%" }} />
        <div className="wishlist-container">
          {isNotEmpty(wishlist) ? (
            wishlist.map((id, index) => (
              <div key={index}>
                <MenuItem
                  key={index}
                  className="mb-2"
                  onClick={() => {
                    dispatch(setPathName(window.location.pathname));
                    navigate(`/event/${id}`);
                  }}
                >
                  <WishListItem id={id} />
                </MenuItem>
                <Divider style={{ width: "100%" }} />
              </div>
            ))
          ) : (
            <MenuItem>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                  width: 480,
                  display: "flex",
                  justifyContent: "center",
                }}
                description={<span>{t("search.empty")}</span>}
              ></Empty>
            </MenuItem>
          )}
        </div>
        {isNotEmpty(wishlist) ? (
          <>
            <MenuItem>
              <div
                className="flex items-center gap-x-2 justify-center w-full"
                onClick={() => {
                  clearWishlist();
                }}
              >
                {t("remove-all")}
                <BiX fontSize={30} className="cursor-pointer" />
              </div>
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </div>
  );
  return (
    <div className="header-container">
      <div className="md:w-[60%] w-full flex md:gap-x-4 items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="brand-logo"
          onClick={() => navigate("/")}
        />
        {showSearchBox ? (
          <SearchBox
            placeholder={t("event.placeholder-searchbox")}
            data={allEventsStatus === "success" ? allEvents : []}
            isExpand={true}
          />
        ) : null}
      </div>
      {isMobile ? null : (
        <div className="header-auth">
          {!user ? (
            <>
              <a className="px-3" onClick={() => navigate(ROUTES.LOGIN)}>
                {t("user.authentication")}
              </a>
              <LanguageSwitch />
            </>
          ) : isMobile ? (
            <div>
              <div>
                <Popover
                  content={<UserProfile setOpen={setOpen} />}
                  title="Title"
                  trigger="click"
                  open={open}
                  placement="bottomRight"
                  onOpenChange={handleOpenChange}
                >
                  <Avatar
                    googleId={user.sub}
                    src={user.avatar ?? placeholderImg}
                    size="35"
                    round={true}
                    name={user.name}
                    className="header-avatar"
                  />
                </Popover>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <Dropdown overlay={wishListMenu} trigger={["click"]}>
                <div className="relative">
                  <Badge count={wishlist.length} />
                  <RiBookmark3Fill className="text-2xl cursor-pointer" />
                </div>
              </Dropdown>
              <div className="relative">
                <Popover
                  content={<UserProfile setOpen={setOpen} />}
                  trigger="click"
                  open={open}
                  placement="bottomRight"
                  onOpenChange={handleOpenChange}
                >
                  <div className="cursor-pointer flex gap-x-2 items-center">
                    <Avatar
                      googleId={user.sub}
                      src={user.avatar ?? placeholderImg}
                      round={true}
                      size={40}
                      name={user.name}
                      className="object-cover w-10 h-10 rounded-full ml-2.5 mr-3"
                    />
                    <span>{user.name}</span>
                  </div>
                </Popover>
              </div>
              <LanguageSwitch />
            </div>
          )}
        </div>
      )}
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
