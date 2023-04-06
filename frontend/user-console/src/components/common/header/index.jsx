/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { motion } from "framer-motion";
import { Dropdown, Empty, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { RiBookmark3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import accountServices from "../../../api/services/accountServices";
import { useFetchEvents } from "../../../api/services/eventServices";
import placeholderImg from "../../../assets/fallback-avatar.png";
import AppConfig from "../../../configs/AppConfig";
import { useUserActionContext } from "../../../context/UserActionContext";
import {
  setUserProfile,
  userInfoSelector,
} from "../../../redux/slices/accountSlice";
import { setPathName } from "../../../redux/slices/routeSlice";
import { isNotEmpty } from "../../../utils/utils";
import LanguageSwitch from "../../language-switch";
import UserProfile from "../../profile-popup";
import Badge from "../badge";
import SearchBox from "../searchbox";
import WishListItem from "../wishlist-item";
const { findUser } = accountServices;
function Header(props) {
  const { showSearchBox } = props;
  const { ROUTES } = AppConfig;
  const { wishlist, clearWishlist } = useUserActionContext();
  const { data: allEvents, status: allEventsStatus } = useFetchEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const isMobile = useMedia("(max-width: 767px)");
  const [open, setOpen] = useState(false);
  const [yPosition, setY] = useState(window.scrollY);
  useEffect(() => {
    const handleYPosition = (e) => {
      setY(window.scrollY);
    };
    window.addEventListener("scroll", handleYPosition);
  }, [yPosition]);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const fetchUserInfor = async () => {
      if (user) {
        const response = await findUser(user.email);
        return (
          response.status === 200 && dispatch(setUserProfile(response.data))
        );
      }
    };
    fetchUserInfor();
  }, []);
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
    <div
      className={
        yPosition > 72.188 && location.pathname === "/"
          ? "header-glassmorphism absolute"
          : "header-container"
      }
    >
      <div className="md:w-[60%] w-full flex md:gap-x-4 items-center">
        <motion.img
          whileTap={{
            scale: 0.8,
          }}
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
