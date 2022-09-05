/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { AppConfig } from "../../../configs/AppConfig";
function Header(props) {
  const { isAuthenticated, logo } = props;
  const { ROUTES } = AppConfig;
  return (
    <div className="header-container">
      <img className="w-[30px] h-auto" src={logo} />
      <div className="header-auth">
        {!isAuthenticated ? (
          <>
            <Link to={ROUTES.LOGIN}>
              <a className="border-r-2 border-white px-3">Đăng nhập</a>
            </Link>
            <a className="px-3">Đăng ký</a>
          </>
        ) : (
          <Avatar
            src="https://i.pravatar.cc/40"
            size="large"
            className="header-auth-avatar"
          />
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
};
Header.defaultProps = {
  isAuthenticated: false,
  logo: process.env.PUBLIC_URL + "ticketLogo.png",
};
export default Header;
