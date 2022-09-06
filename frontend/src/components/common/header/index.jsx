/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { AppConfig } from "../../../configs/AppConfig";
import { Dropdown, Menu } from "antd";
import { useLocation } from "react-use";
function Header(props) {
  const { currentUser, logo } = props;
  const { ROUTES } = AppConfig;
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(); //like here
  };
  const menu = (
    <Menu
      items={[
        {
          label: <p onClick={clearLocalStorage}>Đăng xuất</p>,
          key: "0",
        },
      ]}
    />
  );
  return (
    <div className="header-container">
      <p className="website-logo" onClick={() => navigate("/")}></p>
      <div className="header-auth">
        {!currentUser ? (
          <>
            <Link to={ROUTES.LOGIN}>
              <a className="border-r-2 border-white px-3">Đăng nhập</a>
            </Link>
            <a className="px-3">Đăng ký</a>
          </>
        ) : (
          <>
            <span className="text-white font-medium text-base">
              {currentUser.given_name}
            </span>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                googleId={currentUser.sub}
                src={currentUser.picture}
                size="35"
                round={true}
                className="header-auth-avatar"
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
  logo: PropTypes.string.isRequired,
};
Header.defaultProps = {
  currentUser: JSON.parse(localStorage.getItem("user")) ?? null,
  logo: process.env.PUBLIC_URL + "ticketLogo.png",
};
export default Header;
